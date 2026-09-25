import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

function parseCSVLine(text) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

function cleanVal(v) {
  if (!v) return null;
  const trimmed = v.trim();
  const lower = trimmed.toLowerCase();
  if (
    lower === 'not found' ||
    lower === 'n/a' ||
    lower === 'none' ||
    lower === '-' ||
    lower === 'unknown' ||
    lower === 'null' ||
    lower === ''
  ) {
    return null;
  }
  return trimmed;
}

function standardizeType(rawType) {
  const t = cleanVal(rawType);
  if (!t) return 'Hostel';
  const lower = t.toLowerCase();
  if (lower.includes('boy') && lower.includes('girl')) return 'Co-ed';
  if (lower.includes('co-ed') || lower.includes('coed') || lower.includes('mixed')) return 'Co-ed';
  if (lower.includes('girl')) return 'Girls';
  if (lower.includes('boy')) return 'Boys';
  return t;
}

function parseRatingAndReviews(str) {
  if (!str) return { rating: null, reviewsCount: null, raw: null };
  const cleaned = cleanVal(str);
  if (!cleaned) return { rating: null, reviewsCount: null, raw: null };

  let rating = null;
  let reviewsCount = null;

  const ratingMatch = cleaned.match(/^([0-9]+(?:\.[0-9]+)?)/);
  if (ratingMatch) {
    rating = parseFloat(ratingMatch[1]);
  }

  const reviewMatch = cleaned.match(/([0-9,]+)\s*(?:reviews?|ratings?)/i);
  if (reviewMatch) {
    reviewsCount = parseInt(reviewMatch[1].replace(/,/g, ''), 10);
  }

  return { rating, reviewsCount, raw: cleaned };
}

function generateDeterministicUuid(name, area) {
  const hash = crypto.createHash('md5').update(`${name.toLowerCase()}__${(area || '').toLowerCase()}`).digest('hex');
  // Format as UUID v4-ish: 8-4-4-4-12
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
}

const leadsDir = path.join(process.cwd(), 'leads');
const files = fs.readdirSync(leadsDir).filter(f => f.endsWith('.txt'));

const rawList = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(leadsDir, file), 'utf8');
  const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);
  lines.slice(1).forEach(line => {
    const cols = parseCSVLine(line);
    const name = cleanVal(cols[0]);
    if (!name) return;

    const ratingInfo = parseRatingAndReviews(cols[10]);

    rawList.push({
      file,
      name,
      type: standardizeType(cols[1]),
      area_city: cleanVal(cols[2]),
      address: cleanVal(cols[3]),
      phone: cleanVal(cols[4]),
      whatsapp_viber: cleanVal(cols[5]),
      email: cleanVal(cols[6]),
      website: cleanVal(cols[7]),
      facebook_url: cleanVal(cols[8]),
      contact_person: cleanVal(cols[9]),
      rating: ratingInfo.rating,
      reviews_count: ratingInfo.reviewsCount,
      rating_raw: ratingInfo.raw,
      approximate_size: cleanVal(cols[11]),
      source_urls: cleanVal(cols[12])
    });
  });
});

// Deduplication map
const deduped = new Map();

rawList.forEach(item => {
  const nameNorm = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const areaNorm = (item.area_city || '').toLowerCase().split(',')[0].replace(/[^a-z0-9]/g, '');
  const key = `${nameNorm}__${areaNorm}`;

  if (!deduped.has(key)) {
    deduped.set(key, { ...item });
  } else {
    const existing = deduped.get(key);
    for (const prop of Object.keys(item)) {
      if (!existing[prop] && item[prop]) {
        existing[prop] = item[prop];
      }
    }
  }
});

const finalLeads = Array.from(deduped.values()).map(l => {
  const id = generateDeterministicUuid(l.name, l.area_city);
  let priority = 'medium';
  if ((l.rating && l.rating >= 4.5 && l.reviews_count && l.reviews_count >= 30) || (l.reviews_count && l.reviews_count >= 100)) {
    priority = 'high';
  } else if (!l.phone && !l.facebook_url && !l.whatsapp_viber) {
    priority = 'low';
  }

  return {
    id,
    name: l.name,
    type: l.type,
    area_city: l.area_city || 'Kathmandu',
    address: l.address,
    phone: l.phone,
    whatsapp_viber: l.whatsapp_viber,
    email: l.email,
    website: l.website,
    facebook_url: l.facebook_url,
    contact_person: l.contact_person,
    rating: l.rating,
    reviews_count: l.reviews_count,
    rating_raw: l.rating_raw,
    approximate_size: l.approximate_size,
    source_urls: l.source_urls,
    status: 'new',
    priority,
    notes: null,
    follow_up_date: null,
    last_contacted_at: null,
    created_at: new Date('2026-03-25T10:00:00Z').toISOString(),
    updated_at: new Date('2026-03-25T10:00:00Z').toISOString()
  };
});

console.log(`Processed ${finalLeads.length} unique HMS hostel leads.`);

// 1. Generate TypeScript seed file
const tsContent = `// Auto-generated seed data from leads directory (${finalLeads.length} hostel leads)
export interface HmsLeadRecord {
  id: string;
  name: string;
  type: string;
  area_city: string;
  address: string | null;
  phone: string | null;
  whatsapp_viber: string | null;
  email: string | null;
  website: string | null;
  facebook_url: string | null;
  contact_person: string | null;
  rating: number | null;
  reviews_count: number | null;
  rating_raw: string | null;
  approximate_size: string | null;
  source_urls: string | null;
  status: "new" | "contacted" | "interested" | "demo_scheduled" | "negotiating" | "converted" | "not_interested" | "archived";
  priority: "low" | "medium" | "high" | "urgent";
  notes: string | null;
  follow_up_date: string | null;
  last_contacted_at: string | null;
  created_at: string;
  updated_at: string;
}

export const hmsLeadsSeed: HmsLeadRecord[] = ${JSON.stringify(finalLeads, null, 2)};
`;

// Make sure target directories exist
if (!fs.existsSync(path.join(process.cwd(), 'src', 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'src', 'data'), { recursive: true });
}
if (!fs.existsSync(path.join(process.cwd(), 'supabase', 'migrations'))) {
  fs.mkdirSync(path.join(process.cwd(), 'supabase', 'migrations'), { recursive: true });
}

fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'hms-leads-seed.ts'), tsContent, 'utf8');
console.log('Wrote src/data/hms-leads-seed.ts');

// 2. Generate Supabase Migration SQL
function sqlStr(val) {
  if (val === null || val === undefined) return 'NULL';
  return `'${String(val).replace(/'/g, "''")}'`;
}

function sqlNum(val) {
  if (val === null || val === undefined) return 'NULL';
  return Number(val);
}

const sqlValues = finalLeads.map(l => {
  return `(
  ${sqlStr(l.id)}::uuid,
  ${sqlStr(l.name)},
  ${sqlStr(l.type)},
  ${sqlStr(l.area_city)},
  ${sqlStr(l.address)},
  ${sqlStr(l.phone)},
  ${sqlStr(l.whatsapp_viber)},
  ${sqlStr(l.email)},
  ${sqlStr(l.website)},
  ${sqlStr(l.facebook_url)},
  ${sqlStr(l.contact_person)},
  ${sqlNum(l.rating)},
  ${sqlNum(l.reviews_count)},
  ${sqlStr(l.rating_raw)},
  ${sqlStr(l.approximate_size)},
  ${sqlStr(l.source_urls)},
  ${sqlStr(l.status)},
  ${sqlStr(l.priority)}
)`;
}).join(',\n');

const migrationSql = `-- ==============================================================================
-- Migration: HMS (Hostel Management System) Lead Management Module & Seed Data
-- Creates table public.hms_leads, sets RLS policies, triggers, and seeds ${finalLeads.length} leads
-- ==============================================================================

-- 1. Create table
create table if not exists public.hms_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null default 'Hostel',
  area_city text not null,
  address text,
  phone text,
  whatsapp_viber text,
  email text,
  website text,
  facebook_url text,
  contact_person text,
  rating numeric(3, 2),
  reviews_count integer,
  rating_raw text,
  approximate_size text,
  source_urls text,
  status text not null default 'new',
  priority text not null default 'medium',
  notes text,
  follow_up_date timestamp with time zone,
  last_contacted_at timestamp with time zone,
  assigned_to text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint hms_leads_status_check check (
    status in ('new', 'contacted', 'interested', 'demo_scheduled', 'negotiating', 'converted', 'not_interested', 'archived')
  ),
  constraint hms_leads_priority_check check (
    priority in ('low', 'medium', 'high', 'urgent')
  ),
  constraint hms_leads_name_area_unique unique (name, area_city)
);

-- 2. Indexes for fast search and filtering
create index if not exists idx_hms_leads_status on public.hms_leads (status);
create index if not exists idx_hms_leads_priority on public.hms_leads (priority);
create index if not exists idx_hms_leads_type on public.hms_leads (type);
create index if not exists idx_hms_leads_area_city on public.hms_leads (area_city);
create index if not exists idx_hms_leads_created_at on public.hms_leads (created_at desc);

-- 3. Enable RLS
alter table public.hms_leads enable row level security;

-- 4. Automatic updated_at trigger
drop trigger if exists update_hms_leads_updated_at on public.hms_leads;
create trigger update_hms_leads_updated_at
  before update on public.hms_leads
  for each row execute function public.update_updated_at_column();

-- 5. RLS Policies
-- Admins can read all HMS leads
drop policy if exists "Admins can view hms leads" on public.hms_leads;
create policy "Admins can view hms leads"
  on public.hms_leads
  for select
  to authenticated
  using (public.is_admin());

-- Admins can insert HMS leads
drop policy if exists "Admins can insert hms leads" on public.hms_leads;
create policy "Admins can insert hms leads"
  on public.hms_leads
  for insert
  to authenticated
  with check (public.is_admin());

-- Admins can update HMS leads
drop policy if exists "Admins can update hms leads" on public.hms_leads;
create policy "Admins can update hms leads"
  on public.hms_leads
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Admins can delete HMS leads
drop policy if exists "Admins can delete hms leads" on public.hms_leads;
create policy "Admins can delete hms leads"
  on public.hms_leads
  for delete
  to authenticated
  using (public.is_admin());

-- 6. Seed ${finalLeads.length} hostel leads
insert into public.hms_leads (
  id,
  name,
  type,
  area_city,
  address,
  phone,
  whatsapp_viber,
  email,
  website,
  facebook_url,
  contact_person,
  rating,
  reviews_count,
  rating_raw,
  approximate_size,
  source_urls,
  status,
  priority
)
values
${sqlValues}
on conflict (name, area_city) do update
set
  type = excluded.type,
  address = coalesce(excluded.address, public.hms_leads.address),
  phone = coalesce(excluded.phone, public.hms_leads.phone),
  whatsapp_viber = coalesce(excluded.whatsapp_viber, public.hms_leads.whatsapp_viber),
  email = coalesce(excluded.email, public.hms_leads.email),
  website = coalesce(excluded.website, public.hms_leads.website),
  facebook_url = coalesce(excluded.facebook_url, public.hms_leads.facebook_url),
  contact_person = coalesce(excluded.contact_person, public.hms_leads.contact_person),
  rating = coalesce(excluded.rating, public.hms_leads.rating),
  reviews_count = coalesce(excluded.reviews_count, public.hms_leads.reviews_count),
  rating_raw = coalesce(excluded.rating_raw, public.hms_leads.rating_raw),
  approximate_size = coalesce(excluded.approximate_size, public.hms_leads.approximate_size),
  source_urls = coalesce(excluded.source_urls, public.hms_leads.source_urls),
  updated_at = now();
`;

// Make sure target directories exist
if (!fs.existsSync(path.join(process.cwd(), 'src', 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'src', 'data'), { recursive: true });
}

fs.writeFileSync(path.join(process.cwd(), 'supabase', 'migrations', '20260520120000_hms_lead_management.sql'), migrationSql, 'utf8');
console.log('Wrote supabase/migrations/20260520120000_hms_lead_management.sql');

fs.writeFileSync(path.join(process.cwd(), 'supabase', 'hms_leads_seed.sql'), migrationSql, 'utf8');
console.log('Wrote supabase/hms_leads_seed.sql');
