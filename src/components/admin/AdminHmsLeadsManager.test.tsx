import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AdminHmsLeadsManager from "@/components/admin/AdminHmsLeadsManager";

const mockUseQuery = vi.fn();
const mockInvalidateQueries = vi.fn();

vi.mock("@tanstack/react-query", () => ({
  useQuery: (options: unknown) => mockUseQuery(options),
  useQueryClient: () => ({
    invalidateQueries: mockInvalidateQueries,
  }),
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("@/lib/admin-hms-leads", () => ({
  listAdminHmsLeads: vi.fn(),
  updateAdminHmsLead: vi.fn(),
  createAdminHmsLead: vi.fn(),
  deleteAdminHmsLead: vi.fn(),
}));

const sampleLeads = [
  {
    id: "lead-1",
    name: "Toshit Boys Hostel",
    type: "Boys",
    area_city: "Old Baneshwor, Kathmandu",
    address: "Old Baneshwor Road, Kathmandu",
    phone: "+977 984-8051505",
    whatsapp_viber: "+977 984-8051505",
    email: null,
    website: null,
    facebook_url: "https://facebook.com/toshit",
    contact_person: "Mr. Sharma",
    rating: 4.9,
    reviews_count: 239,
    rating_raw: "4.9 (239 reviews)",
    approximate_size: "30 rooms",
    source_urls: null,
    status: "new",
    priority: "high",
    notes: null,
    follow_up_date: null,
    last_contacted_at: null,
    created_at: "2026-03-25T10:00:00Z",
    updated_at: "2026-03-25T10:00:00Z",
  },
  {
    id: "lead-2",
    name: "Shree Girls Hostel",
    type: "Girls",
    area_city: "Putalisadak, Kathmandu",
    address: "Near Star Mall, Putalisadak",
    phone: "+977 980-1234567",
    whatsapp_viber: null,
    email: "info@shreegirls.com",
    website: "https://shreegirls.com",
    facebook_url: null,
    contact_person: "Mrs. Thapa",
    rating: 4.5,
    reviews_count: 42,
    rating_raw: "4.5 (42 reviews)",
    approximate_size: "4 floors",
    source_urls: null,
    status: "contacted",
    priority: "medium",
    notes: "Follow up next week",
    follow_up_date: null,
    last_contacted_at: null,
    created_at: "2026-03-25T10:00:00Z",
    updated_at: "2026-03-25T10:00:00Z",
  },
];

describe("AdminHmsLeadsManager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseQuery.mockReturnValue({
      data: {
        leads: sampleLeads,
        isFallback: false,
        totalCount: sampleLeads.length,
      },
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });
  });

  it("renders the HMS pipeline dashboard heading and metrics", () => {
    render(<AdminHmsLeadsManager />);

    expect(screen.getByText(/HMS \(Hostel Management System\) Leads/i)).toBeInTheDocument();
    expect(screen.getByText("Total Hostels")).toBeInTheDocument();
    expect(screen.getByText("New Uncontacted")).toBeInTheDocument();
    expect(screen.getByText("Phone Reachable")).toBeInTheDocument();
  });

  it("displays hostel cards in rich list view with pagination", () => {
    render(<AdminHmsLeadsManager />);

    expect(screen.getByText("Toshit Boys Hostel")).toBeInTheDocument();
    expect(screen.getByText("Shree Girls Hostel")).toBeInTheDocument();
    expect(screen.getByText(/Page 1 of 1/i)).toBeInTheDocument();
  });

  it("switches to Table view and displays hostel rows", () => {
    render(<AdminHmsLeadsManager />);

    const tableToggle = screen.getByRole("button", { name: /Table/i });
    fireEvent.click(tableToggle);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Toshit Boys Hostel")).toBeInTheDocument();
    expect(screen.getByText("Shree Girls Hostel")).toBeInTheDocument();
  });

  it("filters leads based on search query", () => {
    render(<AdminHmsLeadsManager />);

    const searchInput = screen.getByPlaceholderText(/Search hostel name/i);
    fireEvent.change(searchInput, { target: { value: "Toshit" } });

    expect(screen.getByText("Toshit Boys Hostel")).toBeInTheDocument();
    expect(screen.queryByText("Shree Girls Hostel")).not.toBeInTheDocument();
  });

  it("opens the SQL migration dialog when requested", () => {
    render(<AdminHmsLeadsManager />);

    const sqlBtn = screen.getByRole("button", { name: /SQL Migration/i });
    fireEvent.click(sqlBtn);

    expect(screen.getByText(/HMS Leads Database Migration & Seed SQL/i)).toBeInTheDocument();
    expect(screen.getByText(/supabase\/hms_leads_seed\.sql/i)).toBeInTheDocument();
  });
});
