import type { HmsLeadRecord } from "@/data/hms-leads-seed";

/** WhatsApp outreach for HMS leads: message texts, links and the daily send queue rules. */

export type WhatsAppMessageKind = "pitch" | "opener" | "followup";

export const NEXAFORM_PHONE = "9868731607";
export const DEFAULT_DAILY_LIMIT = 30;
export const FOLLOW_UP_AFTER_DAYS = 3;

/** Written into a lead's notes when a message goes out; the follow-up marker also stops a second follow-up. */
export const PITCH_NOTE = "WhatsApp message sent";
export const FOLLOW_UP_NOTE = "WhatsApp follow-up sent";

type LeadNames = Pick<HmsLeadRecord, "name" | "contact_person">;

/** Greets the contact person by name; falls back to "<hostel> परिवार", then to a plain greeting. */
const greetingFor = (lead: LeadNames) => {
  const hostel = lead.name?.trim();
  const contact = lead.contact_person?.trim();
  if (contact) return `नमस्ते ${contact} जी 🙏`;
  if (hostel) return `नमस्ते ${hostel} परिवार 🙏`;
  return "नमस्ते 🙏";
};

const hostelRefFor = (lead: LeadNames) => lead.name?.trim() || "तपाईंको होस्टल";

/** Full Nepali pitch for the hostel website offer. */
export const buildWhatsAppPitch = (lead: LeadNames): string =>
  [
    greetingFor(lead),
    "",
    `म NexaForm Technologies बाट सम्पर्क गर्दैछु। ${hostelRefFor(lead)} को सुविधा, सफाइ र सेवाबारे जानेर हामी साँच्चै प्रभावित भयौं, जुन निकै प्रशंसनीय छ! 👏`,
    "",
    "तर एउटा कुरा खट्कियो: तपाईंको होस्टलको आफ्नै वेबसाइट छैन, त्यसैले अनलाइनमा तपाईंको उपस्थिति शून्य छ। आजकल विद्यार्थी र अभिभावकले होस्टल खोज्दा सबैभन्दा पहिले Google वा AI (ChatGPT, Gemini) मा खोज्छन्। वेबसाइट नभएमा उनीहरूले तपाईंलाई भेट्टाउँदैनन् र अर्को होस्टलमा जान्छन्।",
    "",
    "हामी होस्टलका लागि विशेष रूपमा बनाइएको वेबसाइट दिन्छौं:",
    "✅ Google र AI सर्चमा देखिने",
    "✅ खाली बेडको लाइभ जानकारी",
    "✅ अनलाइन बुकिङ र सोधपुछ फारम",
    "✅ कोठाका प्रकार र शुल्क",
    "✅ फोटो ग्यालरी",
    "✅ साप्ताहिक खानाको मेनु",
    "✅ सूचना र पपअप",
    "✅ विद्यार्थीका समीक्षा, नियम र FAQ",
    "✅ WhatsApp/कल बटन र Google Map",
    "✅ मोबाइलमा राम्रोसँग चल्ने",
    "✅ Admin Panel, जहाँबाट सबै कुरा आफैँ अपडेट गर्न सकिन्छ",
    "",
    "💰 मूल्य: *Rs. 10,000 मात्र* (एकपटक मात्र तिर्ने)",
    "",
    "🌐 डेमो हेर्नुहोस्: https://hostel.nexa-form.com",
    "🔐 Admin Panel: https://hostel.nexa-form.com/admin",
    "Email: hostelweb@nexa.com",
    "Password: 12345678",
    "",
    "अरू होस्टलभन्दा अलग देखिन र धेरै विद्यार्थीसम्म पुग्न आजै सम्पर्क गर्नुहोस्।",
    `📞 ${NEXAFORM_PHONE}`,
    "– NexaForm Technologies",
  ].join("\n");

/** Short first message: get a reply before sending the full pitch. */
export const buildWhatsAppOpener = (lead: LeadNames): string =>
  [
    greetingFor(lead),
    "",
    `म NexaForm Technologies बाट सम्पर्क गर्दैछु। के यो ${hostelRefFor(lead)} को सञ्चालकको नम्बर हो?`,
    "तपाईंको होस्टलका लागि एउटा छोटो प्रस्ताव पठाउन चाहन्थें। अनुमति भए पठाउँछु। 😊",
  ].join("\n");

/** Gentle reminder for leads that have not replied. */
export const buildWhatsAppFollowUp = (lead: LeadNames): string =>
  [
    greetingFor(lead),
    "",
    `केही दिनअघि हामीले ${hostelRefFor(lead)} को वेबसाइटबारे सन्देश पठाएका थियौं। के तपाईंले डेमो हेर्ने मौका पाउनुभयो?`,
    "",
    "🌐 डेमो: https://hostel.nexa-form.com",
    "",
    `कुनै प्रश्न भए सोध्नुहोस्, वा कल गर्न उपयुक्त समय बताउनुहोस्। 📞 ${NEXAFORM_PHONE}`,
    "– NexaForm Technologies",
  ].join("\n");

export const buildWhatsAppMessage = (lead: LeadNames, kind: WhatsAppMessageKind): string =>
  kind === "opener"
    ? buildWhatsAppOpener(lead)
    : kind === "followup"
    ? buildWhatsAppFollowUp(lead)
    : buildWhatsAppPitch(lead);

/** Every Nepali mobile number in a field that may hold several ("+977 980-…, +977 1-4475161, …"), as 977XXXXXXXXXX. */
export const parseMobileNumbers = (raw: string | null | undefined): string[] => {
  if (!raw) return [];
  const found: string[] = [];
  for (const part of raw.split(/[,;/|\n]+/)) {
    let digits = part.replace(/\D/g, "");
    if (digits.startsWith("977")) digits = digits.slice(3);
    if (digits.startsWith("0")) digits = digits.slice(1);
    // Mobiles are 10 digits starting 97/98/96; landlines (01-…) cannot have WhatsApp.
    if (/^9[678]\d{8}$/.test(digits) && !found.includes(`977${digits}`)) found.push(`977${digits}`);
  }
  return found;
};

/**
 * The lead's WhatsApp number with country code, or null. Takes the first mobile number,
 * preferring the WhatsApp/Viber field over the main phone; landline-only leads return null.
 */
export const getWhatsAppNumber = (lead: Pick<HmsLeadRecord, "whatsapp_viber" | "phone">): string | null =>
  parseMobileNumbers(lead.whatsapp_viber)[0] ?? parseMobileNumbers(lead.phone)[0] ?? null;

/**
 * Pre-filled WhatsApp link. Uses api.whatsapp.com/send rather than wa.me, because wa.me links
 * turn the emojis in the pre-filled text into replacement characters.
 */
export const buildWhatsAppLink = (lead: HmsLeadRecord, kind: WhatsAppMessageKind = "pitch"): string | null => {
  const number = getWhatsAppNumber(lead);
  if (!number) return null;
  const text = encodeURIComponent(buildWhatsAppMessage(lead, kind));
  return `https://api.whatsapp.com/send?phone=${number}&text=${text}`;
};

/* ------------------------------------------------------------ send queue */

/** Calendar day (YYYY-MM-DD) in Nepal time, so "today" resets at Nepal midnight. */
export const nepalDayKey = (date: Date): string =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

/** How many leads were messaged today (Nepal time). */
export const countSentToday = (leads: HmsLeadRecord[], now: Date = new Date()): number => {
  const today = nepalDayKey(now);
  return leads.filter((l) => l.last_contacted_at && nepalDayKey(new Date(l.last_contacted_at)) === today).length;
};

const priorityRank: Record<string, number> = { urgent: 0, high: 1, medium: 2, low: 3 };

const byPriorityThenRating = (a: HmsLeadRecord, b: HmsLeadRecord) =>
  (priorityRank[a.priority] ?? 4) - (priorityRank[b.priority] ?? 4) ||
  (b.rating ?? 0) - (a.rating ?? 0) ||
  a.name.localeCompare(b.name);

/**
 * New leads with a WhatsApp number that have never been messaged, most promising first.
 * A number shared by several leads (duplicate entries, or one owner with two hostels) is
 * queued once, and never again once any lead with that number has been messaged.
 */
export const getOutreachQueue = (leads: HmsLeadRecord[]): HmsLeadRecord[] => {
  const alreadyMessaged = new Set(
    leads.filter((l) => l.last_contacted_at).map((l) => getWhatsAppNumber(l)).filter(Boolean)
  );
  const queued = new Set<string>();
  return leads
    .filter((l) => l.status === "new" && !l.last_contacted_at && getWhatsAppNumber(l))
    .sort(byPriorityThenRating)
    .filter((l) => {
      const number = getWhatsAppNumber(l)!;
      if (alreadyMessaged.has(number) || queued.has(number)) return false;
      queued.add(number);
      return true;
    });
};

/**
 * Leads still at "Contacted" (no reply moved them further) whose last message is at least
 * FOLLOW_UP_AFTER_DAYS old and who have not had a follow-up yet. Oldest first.
 */
export const getFollowUpQueue = (leads: HmsLeadRecord[], now: Date = new Date()): HmsLeadRecord[] => {
  const cutoff = now.getTime() - FOLLOW_UP_AFTER_DAYS * 24 * 60 * 60 * 1000;
  return leads
    .filter(
      (l) =>
        l.status === "contacted" &&
        l.last_contacted_at &&
        new Date(l.last_contacted_at).getTime() <= cutoff &&
        !(l.notes || "").includes(FOLLOW_UP_NOTE) &&
        getWhatsAppNumber(l)
    )
    .sort((a, b) => new Date(a.last_contacted_at!).getTime() - new Date(b.last_contacted_at!).getTime());
};

/** Appends a dated line to the lead's notes, e.g. "29 Sep 2026: WhatsApp message sent (short opener)". */
export const appendSendNote = (notes: string | null, line: string, now: Date = new Date()): string => {
  const date = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kathmandu",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(now);
  const entry = `${date}: ${line}`;
  return notes?.trim() ? `${notes.trim()}\n${entry}` : entry;
};
