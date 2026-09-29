import { describe, expect, it } from "vitest";
import type { HmsLeadRecord } from "@/data/hms-leads-seed";
import {
  FOLLOW_UP_NOTE,
  appendSendNote,
  buildWhatsAppLink,
  buildWhatsAppPitch,
  countSentToday,
  getFollowUpQueue,
  getOutreachQueue,
  getWhatsAppNumber,
  nepalDayKey,
  parseMobileNumbers,
} from "@/lib/hms-whatsapp";

const lead = (overrides: Partial<HmsLeadRecord>): HmsLeadRecord => ({
  id: crypto.randomUUID(),
  name: "Test Hostel",
  type: "Boys",
  area_city: "Kathmandu",
  address: null,
  phone: null,
  whatsapp_viber: "9841000000",
  email: null,
  website: null,
  facebook_url: null,
  contact_person: null,
  rating: null,
  reviews_count: null,
  rating_raw: null,
  approximate_size: null,
  source_urls: null,
  status: "new",
  priority: "medium",
  notes: null,
  follow_up_date: null,
  last_contacted_at: null,
  created_at: "2026-09-01T00:00:00Z",
  updated_at: "2026-09-01T00:00:00Z",
  ...overrides,
});

describe("hms-whatsapp", () => {
  it("greets the contact person, then the hostel, then plainly", () => {
    expect(buildWhatsAppPitch({ name: "Toshit", contact_person: "Ram" })).toMatch(/^नमस्ते Ram जी/);
    expect(buildWhatsAppPitch({ name: "Toshit", contact_person: null })).toMatch(/^नमस्ते Toshit परिवार/);
    expect(buildWhatsAppPitch({ name: "", contact_person: null })).toMatch(/^नमस्ते 🙏/);
  });

  it("normalises numbers and links through api.whatsapp.com with emojis encoded", () => {
    expect(getWhatsAppNumber({ whatsapp_viber: "+977 984-8051505", phone: null })).toBe("9779848051505");
    expect(getWhatsAppNumber({ whatsapp_viber: null, phone: "9841000000" })).toBe("9779841000000");
    const link = buildWhatsAppLink(lead({}))!;
    expect(link.startsWith("https://api.whatsapp.com/send?phone=9779841000000&text=")).toBe(true);
    expect(decodeURIComponent(link.split("text=")[1])).toContain("🙏");
  });

  it("picks the first mobile from a field with several numbers and skips landlines", () => {
    expect(parseMobileNumbers("+977 980-4915365, +977 986-0497181, +977 981-5653549")).toEqual([
      "9779804915365",
      "9779860497181",
      "9779815653549",
    ]);
    expect(getWhatsAppNumber({ whatsapp_viber: null, phone: "+977 1-4110038, +977 981-3230542" })).toBe(
      "9779813230542"
    );
    expect(getWhatsAppNumber({ whatsapp_viber: null, phone: "+977 1-4475161" })).toBeNull();
    expect(getWhatsAppNumber({ whatsapp_viber: "01-5367530", phone: "9841000000" })).toBe("9779841000000");
  });

  it("queues a shared number once, and not at all once it has been messaged", () => {
    const queue = getOutreachQueue([
      lead({ name: "Dup A", whatsapp_viber: "9841748599", priority: "high" }),
      lead({ name: "Dup B", whatsapp_viber: "+977 984-1748599" }),
      lead({ name: "Owner's second hostel", whatsapp_viber: "9851144936" }),
      lead({ name: "Owner's first hostel", status: "contacted", whatsapp_viber: "9851144936", last_contacted_at: "2026-09-28T00:00:00Z" }),
    ]);
    expect(queue.map((l) => l.name)).toEqual(["Dup A"]);
  });

  it("counts today's sends in Nepal time", () => {
    // 20:00 UTC on the 28th is already 01:45 on the 29th in Nepal
    const now = new Date("2026-09-29T06:00:00Z");
    expect(nepalDayKey(new Date("2026-09-28T20:00:00Z"))).toBe("2026-09-29");
    const leads = [
      lead({ last_contacted_at: "2026-09-28T20:00:00Z" }),
      lead({ last_contacted_at: "2026-09-28T18:00:00Z" }), // 23:45 on the 28th, Nepal
      lead({}),
    ];
    expect(countSentToday(leads, now)).toBe(1);
  });

  it("queues only never-messaged new leads with a number, highest priority first", () => {
    const queue = getOutreachQueue([
      lead({ name: "Low", priority: "low", whatsapp_viber: "9841000001" }),
      lead({ name: "Urgent", priority: "urgent", whatsapp_viber: "9841000002" }),
      lead({ name: "No number", whatsapp_viber: null, phone: null }),
      lead({ name: "Contacted", status: "contacted", last_contacted_at: "2026-09-20T00:00:00Z" }),
    ]);
    expect(queue.map((l) => l.name)).toEqual(["Urgent", "Low"]);
  });

  it("offers one follow-up after 3 days of no reply", () => {
    const now = new Date("2026-09-29T06:00:00Z");
    const queue = getFollowUpQueue(
      [
        lead({ name: "Due", status: "contacted", last_contacted_at: "2026-09-25T06:00:00Z" }),
        lead({ name: "Too soon", status: "contacted", last_contacted_at: "2026-09-28T06:00:00Z" }),
        lead({ name: "Replied", status: "interested", last_contacted_at: "2026-09-20T06:00:00Z" }),
        lead({
          name: "Already followed up",
          status: "contacted",
          last_contacted_at: "2026-09-20T06:00:00Z",
          notes: appendSendNote(null, FOLLOW_UP_NOTE, now),
        }),
      ],
      now
    );
    expect(queue.map((l) => l.name)).toEqual(["Due"]);
  });
});
