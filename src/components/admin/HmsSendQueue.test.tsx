import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HmsSendQueue from "@/components/admin/HmsSendQueue";
import type { HmsLeadRecord } from "@/data/hms-leads-seed";

const mockUpdate = vi.fn().mockResolvedValue({});
vi.mock("@/lib/admin-hms-leads", () => ({
  updateAdminHmsLead: (...args: unknown[]) => mockUpdate(...args),
}));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const lead = (overrides: Partial<HmsLeadRecord>): HmsLeadRecord =>
  ({
    id: crypto.randomUUID(),
    name: "Toshit Boys Hostel",
    type: "Boys",
    area_city: "Old Baneshwor",
    whatsapp_viber: "+977 984-8051505",
    phone: null,
    contact_person: null,
    rating: 4.5,
    status: "new",
    priority: "high",
    notes: null,
    last_contacted_at: null,
    ...overrides,
  }) as HmsLeadRecord;

describe("HmsSendQueue", () => {
  it("shows the next lead and marks it as contacted with a note", async () => {
    const onUpdated = vi.fn();
    render(<HmsSendQueue open onOpenChange={() => {}} leads={[lead({ id: "a" })]} onUpdated={onUpdated} />);

    expect(screen.getByText("Toshit Boys Hostel")).toBeInTheDocument();
    expect(screen.getByText(/of 30 sent today/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Open in WhatsApp/ })).toHaveAttribute(
      "href",
      expect.stringContaining("https://api.whatsapp.com/send?phone=9779848051505")
    );

    fireEvent.click(screen.getByRole("button", { name: /Mark as sent/ }));
    await waitFor(() => expect(onUpdated).toHaveBeenCalled());
    const [id, updates] = mockUpdate.mock.calls[0];
    expect(id).toBe("a");
    expect(updates.status).toBe("contacted");
    expect(updates.notes).toMatch(/WhatsApp message sent \(full pitch\)/);
    expect(await screen.findByText(/No new leads with a WhatsApp number/)).toBeInTheDocument();
  });

  it("locks once the daily limit is reached", () => {
    const today = new Date().toISOString();
    const sent = Array.from({ length: 30 }, (_, i) =>
      lead({ id: `s${i}`, status: "contacted", last_contacted_at: today })
    );
    render(<HmsSendQueue open onOpenChange={() => {}} leads={[...sent, lead({ id: "next" })]} onUpdated={vi.fn()} />);
    expect(screen.getByText(/Done for today/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Open in WhatsApp/ })).not.toBeInTheDocument();
  });
});
