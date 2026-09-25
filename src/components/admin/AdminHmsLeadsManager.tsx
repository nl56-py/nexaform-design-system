import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  Phone,
  MessageSquare,
  Facebook,
  Globe,
  MapPin,
  Star,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Database,
  Copy,
  Check,
  Calendar,
  User,
  SlidersHorizontal,
  Flame,
  LayoutGrid,
  List,
  CheckCircle2,
  Clock,
  Send,
  BedDouble,
  FileCode2,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  listAdminHmsLeads,
  updateAdminHmsLead,
  createAdminHmsLead,
  deleteAdminHmsLead,
  type HmsLeadRecord,
  type HmsLeadStatus,
  type HmsLeadPriority,
} from "@/lib/admin-hms-leads";

const queryKey = ["admin-hms-leads"];

const statusConfig: Record<
  HmsLeadStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  new: { label: "New Lead", bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/20" },
  contacted: { label: "Contacted", bg: "bg-sky-500/10", text: "text-sky-600", border: "border-sky-500/20" },
  interested: { label: "Interested", bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/20" },
  demo_scheduled: { label: "Demo Scheduled", bg: "bg-purple-500/10", text: "text-purple-600", border: "border-purple-500/20" },
  negotiating: { label: "Negotiating", bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/20" },
  converted: { label: "Converted / Won", bg: "bg-emerald-600/15", text: "text-emerald-700", border: "border-emerald-600/30" },
  not_interested: { label: "Not Interested", bg: "bg-rose-500/10", text: "text-rose-600", border: "border-rose-500/20" },
  archived: { label: "Archived", bg: "bg-muted/40", text: "text-muted-foreground", border: "border-border/60" },
};

const priorityConfig: Record<
  HmsLeadPriority,
  { label: string; bg: string; text: string }
> = {
  urgent: { label: "Urgent", bg: "bg-rose-500/15 text-rose-600 border-rose-500/30" },
  high: { label: "High", bg: "bg-amber-500/15 text-amber-600 border-amber-500/30" },
  medium: { label: "Medium", bg: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  low: { label: "Low", bg: "bg-slate-500/10 text-slate-600 border-slate-500/20" },
};

const pipelineStages: HmsLeadStatus[] = [
  "new",
  "contacted",
  "interested",
  "demo_scheduled",
  "negotiating",
  "converted",
];

const AdminHmsLeadsManager = () => {
  const queryClient = useQueryClient();

  // Queries
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey,
    queryFn: listAdminHmsLeads,
  });

  const leads = data?.leads ?? [];
  const isFallback = data?.isFallback ?? false;

  // UI States
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [hasPhoneOnly, setHasPhoneOnly] = useState(false);
  const [hasWhatsAppOnly, setHasWhatsAppOnly] = useState(false);

  // Selected Lead Drawer
  const [selectedLead, setSelectedLead] = useState<HmsLeadRecord | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    name: "",
    type: "Boys",
    area_city: "Kathmandu",
    address: "",
    phone: "",
    whatsapp_viber: "",
    email: "",
    website: "",
    facebook_url: "",
    contact_person: "",
    rating: "",
    reviews_count: "",
    approximate_size: "",
    priority: "medium" as HmsLeadPriority,
    notes: "",
  });

  // Extract unique areas for filter dropdown
  const uniqueAreas = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => {
      if (l.area_city) {
        const primary = l.area_city.split(",")[0].trim();
        if (primary) set.add(primary);
      }
    });
    return Array.from(set).sort();
  }, [leads]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = lead.name.toLowerCase().includes(q);
        const matchesArea = (lead.area_city || "").toLowerCase().includes(q);
        const matchesAddress = (lead.address || "").toLowerCase().includes(q);
        const matchesContact = (lead.contact_person || "").toLowerCase().includes(q);
        const matchesPhone = (lead.phone || "").toLowerCase().includes(q);
        if (!matchesName && !matchesArea && !matchesAddress && !matchesContact && !matchesPhone) {
          return false;
        }
      }

      if (typeFilter !== "all" && lead.type.toLowerCase() !== typeFilter.toLowerCase()) {
        return false;
      }

      if (statusFilter !== "all" && lead.status !== statusFilter) {
        return false;
      }

      if (priorityFilter !== "all" && lead.priority !== priorityFilter) {
        return false;
      }

      if (areaFilter !== "all") {
        const primary = (lead.area_city || "").split(",")[0].trim();
        if (primary.toLowerCase() !== areaFilter.toLowerCase()) {
          return false;
        }
      }

      if (hasPhoneOnly && !lead.phone) return false;
      if (hasWhatsAppOnly && !lead.whatsapp_viber) return false;

      return true;
    });
  }, [leads, searchQuery, typeFilter, statusFilter, priorityFilter, areaFilter, hasPhoneOnly, hasWhatsAppOnly]);

  // Aggregate Metrics
  const metrics = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "new").length;
    const pipelineCount = leads.filter((l) =>
      ["contacted", "interested", "demo_scheduled", "negotiating"].includes(l.status)
    ).length;
    const convertedCount = leads.filter((l) => l.status === "converted").length;
    const withPhoneCount = leads.filter((l) => Boolean(l.phone)).length;
    const highPriorityCount = leads.filter((l) => l.priority === "high" || l.priority === "urgent").length;

    const boysCount = leads.filter((l) => l.type === "Boys").length;
    const girlsCount = leads.filter((l) => l.type === "Girls").length;
    const coedCount = leads.filter((l) => l.type === "Co-ed").length;

    return {
      total,
      newCount,
      pipelineCount,
      convertedCount,
      withPhoneCount,
      phoneReachability: total > 0 ? Math.round((withPhoneCount / total) * 100) : 0,
      highPriorityCount,
      boysCount,
      girlsCount,
      coedCount,
    };
  }, [leads]);

  // Handle stage change
  const handleStatusChange = async (leadId: string, newStatus: HmsLeadStatus) => {
    try {
      await updateAdminHmsLead(leadId, { status: newStatus });
      await queryClient.invalidateQueries({ queryKey });
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
      toast.success(`Stage moved to ${statusConfig[newStatus]?.label || newStatus}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update lead status");
    }
  };

  // Handle priority change
  const handlePriorityChange = async (leadId: string, newPriority: HmsLeadPriority) => {
    try {
      await updateAdminHmsLead(leadId, { priority: newPriority });
      await queryClient.invalidateQueries({ queryKey });
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead({ ...selectedLead, priority: newPriority });
      }
      toast.success(`Priority updated to ${newPriority}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update priority");
    }
  };

  // Handle notes save
  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setIsSavingNotes(true);
    try {
      await updateAdminHmsLead(selectedLead.id, { notes: notesDraft });
      await queryClient.invalidateQueries({ queryKey });
      setSelectedLead({ ...selectedLead, notes: notesDraft });
      toast.success("Notes saved successfully.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save notes");
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Handle delete lead
  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteAdminHmsLead(leadId);
      await queryClient.invalidateQueries({ queryKey });
      if (selectedLead?.id === leadId) {
        setSelectedLead(null);
      }
      toast.success("Lead removed successfully.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete lead");
    }
  };

  // Handle Create Lead
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name.trim()) {
      toast.error("Hostel name is required.");
      return;
    }

    try {
      const created = await createAdminHmsLead({
        name: newLead.name.trim(),
        type: newLead.type,
        area_city: newLead.area_city.trim() || "Kathmandu",
        address: newLead.address.trim() || null,
        phone: newLead.phone.trim() || null,
        whatsapp_viber: newLead.whatsapp_viber.trim() || null,
        email: newLead.email.trim() || null,
        website: newLead.website.trim() || null,
        facebook_url: newLead.facebook_url.trim() || null,
        contact_person: newLead.contact_person.trim() || null,
        rating: newLead.rating ? parseFloat(newLead.rating) : null,
        reviews_count: newLead.reviews_count ? parseInt(newLead.reviews_count, 10) : null,
        rating_raw: newLead.rating ? `${newLead.rating} (${newLead.reviews_count || 0} reviews)` : null,
        approximate_size: newLead.approximate_size.trim() || null,
        source_urls: null,
        status: "new",
        priority: newLead.priority,
        notes: newLead.notes.trim() || null,
        follow_up_date: null,
        last_contacted_at: null,
      });

      await queryClient.invalidateQueries({ queryKey });
      setIsAddModalOpen(false);
      setNewLead({
        name: "",
        type: "Boys",
        area_city: "Kathmandu",
        address: "",
        phone: "",
        whatsapp_viber: "",
        email: "",
        website: "",
        facebook_url: "",
        contact_person: "",
        rating: "",
        reviews_count: "",
        approximate_size: "",
        priority: "medium",
        notes: "",
      });
      setSelectedLead(created);
      toast.success("New HMS hostel lead created!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create lead");
    }
  };

  // Export to CSV
  const handleExportCsv = () => {
    const headers = [
      "Hostel Name",
      "Type",
      "Area / City",
      "Address",
      "Phone",
      "WhatsApp/Viber",
      "Email",
      "Website",
      "Facebook URL",
      "Contact Person",
      "Rating",
      "Reviews Count",
      "Approximate Size",
      "Status",
      "Priority",
      "Notes",
    ];

    const rows = filteredLeads.map((l) => [
      `"${(l.name || "").replace(/"/g, '""')}"`,
      `"${(l.type || "").replace(/"/g, '""')}"`,
      `"${(l.area_city || "").replace(/"/g, '""')}"`,
      `"${(l.address || "").replace(/"/g, '""')}"`,
      `"${(l.phone || "").replace(/"/g, '""')}"`,
      `"${(l.whatsapp_viber || "").replace(/"/g, '""')}"`,
      `"${(l.email || "").replace(/"/g, '""')}"`,
      `"${(l.website || "").replace(/"/g, '""')}"`,
      `"${(l.facebook_url || "").replace(/"/g, '""')}"`,
      `"${(l.contact_person || "").replace(/"/g, '""')}"`,
      l.rating ?? "",
      l.reviews_count ?? "",
      `"${(l.approximate_size || "").replace(/"/g, '""')}"`,
      l.status,
      l.priority,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `hms_hostel_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${filteredLeads.length} leads to CSV.`);
  };

  // WhatsApp clean link generator
  const getWhatsAppLink = (lead: HmsLeadRecord) => {
    const raw = lead.whatsapp_viber || lead.phone;
    if (!raw) return null;
    const digits = raw.replace(/\D/g, "");
    if (!digits) return null;
    const phoneWithCountry = digits.startsWith("977") ? digits : digits.length === 10 ? `977${digits}` : digits;
    const text = encodeURIComponent(
      `Namaste! I'm reaching out from Nexaform regarding our modern Hostel Management System (HMS) tailored for hostels in ${lead.area_city || "Kathmandu"}. Would love to share a quick 5-min demo with ${lead.contact_person || "the hostel management"}.`
    );
    return `https://wa.me/${phoneWithCountry}?text=${text}`;
  };

  // Open lead sheet
  const handleOpenLead = (lead: HmsLeadRecord) => {
    setSelectedLead(lead);
    setNotesDraft(lead.notes || "");
  };

  // Copy SQL to clipboard
  const handleCopySql = () => {
    const script = `-- Quick instruction: Run this file located at 'supabase/hms_leads_seed.sql' in your Supabase SQL editor\n-- or execute the migration file 'supabase/migrations/20260520120000_hms_lead_management.sql'`;
    navigator.clipboard.writeText(script);
    setCopiedSql(true);
    toast.success("SQL reference command copied to clipboard!");
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Database Status */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-white/80 p-6 shadow-[0_12px_24px_rgba(22,34,71,0.06)] md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Building2 size={22} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                HMS (Hostel Management System) Outreach Pipeline
              </h2>
              {isFallback ? (
                <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-600">
                  <Database size={12} className="mr-1" />
                  Local Seed Cache Active
                </Badge>
              ) : (
                <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600">
                  <Database size={12} className="mr-1" />
                  Live Supabase Sync Active
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {leads.length} hostels across Kathmandu Valley seeded for SaaS demo scheduling and acquisition.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsSqlModalOpen(true)}
            className="gap-2"
          >
            <FileCode2 size={15} />
            SQL Migration & Seed
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void refetch()}
            disabled={isFetching}
            className="gap-2"
          >
            <RefreshCcw size={15} className={isFetching ? "animate-spin" : ""} />
            Refresh
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            className="gap-2"
          >
            <Download size={15} />
            Export CSV
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="gap-2 shadow-[0_10px_20px_rgba(59,130,246,0.2)]"
          >
            <Plus size={15} />
            Add Hostel Lead
          </Button>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Total Hostels</span>
            <Building2 size={16} className="text-primary" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">{metrics.total}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {metrics.boysCount} Boys · {metrics.girlsCount} Girls
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>New Uncontacted</span>
            <Clock size={16} className="text-blue-500" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-blue-600">{metrics.newCount}</p>
          <p className="mt-1 text-xs text-muted-foreground">Ready for outreach</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>In Discussions</span>
            <MessageSquare size={16} className="text-amber-500" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-amber-600">{metrics.pipelineCount}</p>
          <p className="mt-1 text-xs text-muted-foreground">Contacted or warm</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Converted / Won</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-emerald-600">{metrics.convertedCount}</p>
          <p className="mt-1 text-xs text-muted-foreground">Active HMS users</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Phone Reachable</span>
            <Phone size={16} className="text-sky-500" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-sky-600">{metrics.phoneReachability}%</p>
          <p className="mt-1 text-xs text-muted-foreground">{metrics.withPhoneCount} verified phones</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-white/70 p-4 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>High Potential</span>
            <Flame size={16} className="text-rose-500" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-rose-600">{metrics.highPriorityCount}</p>
          <p className="mt-1 text-xs text-muted-foreground">4.5+ ★ or 30+ reviews</p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="rounded-2xl border border-border/60 bg-white/75 p-5 shadow-[0_12px_24px_rgba(22,34,71,0.04)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hostel name, area, address, contact person, or phone..."
              className="pl-10 pr-4"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 self-start lg:self-center">
            <div className="flex rounded-xl border border-border/60 bg-secondary/50 p-1">
              <button
                type="button"
                onClick={() => setViewMode("kanban")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  viewMode === "kanban"
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid size={14} />
                Kanban
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  viewMode === "table"
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List size={14} />
                Table ({filteredLeads.length})
              </button>
            </div>
          </div>
        </div>

        {/* Filter Dropdowns row */}
        <div className="mt-4 flex flex-wrap items-center gap-3 pt-3 border-t border-border/40">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Filter size={14} />
            Filters:
          </div>

          {/* Type Filter */}
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-8 w-[130px] text-xs">
              <SelectValue placeholder="Gender Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="boys">Boys Only</SelectItem>
              <SelectItem value="girls">Girls Only</SelectItem>
              <SelectItem value="co-ed">Co-ed / Mixed</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 w-[140px] text-xs">
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {Object.entries(statusConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Priority Filter */}
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="h-8 w-[130px] text-xs">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Area Filter */}
          <Select value={areaFilter} onValueChange={setAreaFilter}>
            <SelectTrigger className="h-8 w-[170px] text-xs">
              <SelectValue placeholder="Area Cluster" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectItem value="all">All Areas</SelectItem>
              {uniqueAreas.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Toggles */}
          <button
            type="button"
            onClick={() => setHasPhoneOnly(!hasPhoneOnly)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs transition ${
              hasPhoneOnly
                ? "border-primary bg-primary/10 font-semibold text-primary"
                : "border-border/60 text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Phone size={12} />
            Has Phone
          </button>

          <button
            type="button"
            onClick={() => setHasWhatsAppOnly(!hasWhatsAppOnly)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs transition ${
              hasWhatsAppOnly
                ? "border-emerald-500 bg-emerald-500/10 font-semibold text-emerald-600"
                : "border-border/60 text-muted-foreground hover:bg-secondary"
            }`}
          >
            <MessageSquare size={12} />
            Has WhatsApp
          </button>

          {(searchQuery ||
            typeFilter !== "all" ||
            statusFilter !== "all" ||
            priorityFilter !== "all" ||
            areaFilter !== "all" ||
            hasPhoneOnly ||
            hasWhatsAppOnly) && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setTypeFilter("all");
                setStatusFilter("all");
                setPriorityFilter("all");
                setAreaFilter("all");
                setHasPhoneOnly(false);
                setHasWhatsAppOnly(false);
              }}
              className="text-xs text-rose-600 hover:underline"
            >
              Reset Filters
            </button>
          )}

          <div className="ml-auto text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredLeads.length}</span> of{" "}
            {leads.length} hostels
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "kanban" ? (
        /* Kanban Pipeline Board */
        <div className="grid grid-cols-1 gap-4 overflow-x-auto pb-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 min-w-[1200px]">
          {pipelineStages.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.status === stage);
            const stageInfo = statusConfig[stage];

            return (
              <div
                key={stage}
                className="flex flex-col rounded-2xl border border-border/60 bg-white/60 p-3 shadow-sm min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-border/40">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block h-2.5 w-2.5 rounded-full ${stageInfo.bg.replace('/10', '')} ${stage === 'converted' ? 'bg-emerald-500' : stage === 'new' ? 'bg-blue-500' : stage === 'contacted' ? 'bg-sky-500' : stage === 'interested' ? 'bg-emerald-400' : stage === 'demo_scheduled' ? 'bg-purple-500' : 'bg-amber-500'}`} />
                    <h3 className="font-semibold text-xs tracking-tight text-foreground">
                      {stageInfo.label}
                    </h3>
                  </div>
                  <Badge variant="secondary" className="text-[11px] px-2 py-0.5">
                    {stageLeads.length}
                  </Badge>
                </div>

                {/* Cards List */}
                <div className="mt-3 flex flex-1 flex-col gap-2.5 overflow-y-auto max-h-[700px] pr-1">
                  {stageLeads.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center p-6 text-center text-xs text-muted-foreground/60 border border-dashed border-border/40 rounded-xl">
                      No hostels in this stage
                    </div>
                  ) : (
                    stageLeads.map((lead) => {
                      const waLink = getWhatsAppLink(lead);
                      const isHighPriority = lead.priority === "high" || lead.priority === "urgent";

                      return (
                        <div
                          key={lead.id}
                          onClick={() => handleOpenLead(lead)}
                          className="group relative cursor-pointer rounded-xl border border-border/60 bg-white p-3.5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                        >
                          {/* Top Badges */}
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium ${
                                lead.type === "Boys"
                                  ? "bg-blue-50 text-blue-700"
                                  : lead.type === "Girls"
                                  ? "bg-purple-50 text-purple-700"
                                  : "bg-emerald-50 text-emerald-700"
                              }`}
                            >
                              <BedDouble size={10} className="mr-1" />
                              {lead.type}
                            </span>

                            {isHighPriority && (
                              <span className="inline-flex items-center rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                                <Flame size={10} className="mr-0.5 text-amber-500" />
                                {lead.priority}
                              </span>
                            )}
                          </div>

                          {/* Hostel Name */}
                          <h4 className="mt-2 font-semibold text-sm leading-tight text-foreground group-hover:text-primary transition line-clamp-2">
                            {lead.name}
                          </h4>

                          {/* Location & Reviews */}
                          <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1 truncate">
                              <MapPin size={11} className="shrink-0 text-muted-foreground/80" />
                              <span className="truncate">{lead.area_city || "Kathmandu"}</span>
                            </div>

                            {lead.rating && (
                              <div className="flex items-center gap-1 font-medium text-amber-600">
                                <Star size={11} className="fill-amber-400 text-amber-400" />
                                <span>{lead.rating.toFixed(1)}</span>
                                {lead.reviews_count && (
                                  <span className="text-muted-foreground font-normal">
                                    ({lead.reviews_count} reviews)
                                  </span>
                                )}
                              </div>
                            )}

                            {lead.contact_person && (
                              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                <User size={11} className="shrink-0" />
                                <span className="truncate">{lead.contact_person}</span>
                              </div>
                            )}
                          </div>

                          {/* Quick Action Buttons */}
                          <div
                            className="mt-3 flex items-center justify-between border-t border-border/40 pt-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center gap-1">
                              {lead.phone && (
                                <a
                                  href={`tel:${lead.phone.split(",")[0].trim()}`}
                                  title={`Call ${lead.phone}`}
                                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary"
                                >
                                  <Phone size={12} />
                                </a>
                              )}

                              {waLink && (
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Chat on WhatsApp"
                                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600"
                                >
                                  <MessageSquare size={12} />
                                </a>
                              )}

                              {lead.facebook_url && (
                                <a
                                  href={lead.facebook_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Open Facebook Page"
                                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-600"
                                >
                                  <Facebook size={12} />
                                </a>
                              )}
                            </div>

                            {/* Move stage dropdown */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button
                                  type="button"
                                  className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                                >
                                  Stage
                                  <ChevronRight size={12} />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-44">
                                <DropdownMenuLabel className="text-xs">Move to stage</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {pipelineStages.map((targetStage) => (
                                  <DropdownMenuItem
                                    key={targetStage}
                                    disabled={targetStage === lead.status}
                                    onClick={() => void handleStatusChange(lead.id, targetStage)}
                                    className="text-xs"
                                  >
                                    {statusConfig[targetStage].label}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-white/80 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/60 bg-secondary/50 font-medium text-xs text-muted-foreground">
                <tr>
                  <th className="py-3.5 pl-6 pr-3">Hostel Name</th>
                  <th className="px-3 py-3.5">Type</th>
                  <th className="px-3 py-3.5">Area & Address</th>
                  <th className="px-3 py-3.5">Rating & Reviews</th>
                  <th className="px-3 py-3.5">Direct Contact</th>
                  <th className="px-3 py-3.5">Priority</th>
                  <th className="px-3 py-3.5">Pipeline Stage</th>
                  <th className="py-3.5 pl-3 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-sm text-muted-foreground">
                      No hostel leads match the current filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const waLink = getWhatsAppLink(lead);
                    const statusInfo = statusConfig[lead.status as HmsLeadStatus] || statusConfig.new;
                    const priorityInfo = priorityConfig[lead.priority as HmsLeadPriority] || priorityConfig.medium;

                    return (
                      <tr
                        key={lead.id}
                        onClick={() => handleOpenLead(lead)}
                        className="cursor-pointer transition hover:bg-secondary/40"
                      >
                        <td className="py-4 pl-6 pr-3 font-semibold text-foreground">
                          <div className="flex flex-col">
                            <span className="hover:text-primary transition">{lead.name}</span>
                            {lead.contact_person && (
                              <span className="text-xs font-normal text-muted-foreground flex items-center gap-1 mt-0.5">
                                <User size={10} /> {lead.contact_person}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-3 py-4">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                              lead.type === "Boys"
                                ? "bg-blue-50 text-blue-700"
                                : lead.type === "Girls"
                                ? "bg-purple-50 text-purple-700"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {lead.type}
                          </span>
                        </td>

                        <td className="px-3 py-4 max-w-[220px]">
                          <div className="truncate text-xs text-foreground font-medium">
                            {lead.area_city || "Kathmandu"}
                          </div>
                          <div className="truncate text-[11px] text-muted-foreground" title={lead.address || ""}>
                            {lead.address || "Address not listed"}
                          </div>
                        </td>

                        <td className="px-3 py-4">
                          {lead.rating ? (
                            <div className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                              <Star size={12} className="fill-amber-400 text-amber-400" />
                              <span>{lead.rating.toFixed(1)}</span>
                              <span className="text-[11px] font-normal text-muted-foreground">
                                ({lead.reviews_count || 0})
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </td>

                        <td className="px-3 py-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1.5">
                            {lead.phone ? (
                              <a
                                href={`tel:${lead.phone.split(",")[0].trim()}`}
                                className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                title={lead.phone}
                              >
                                <Phone size={12} />
                              </a>
                            ) : null}

                            {waLink ? (
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-600"
                                title="WhatsApp"
                              >
                                <MessageSquare size={12} />
                              </a>
                            ) : null}

                            {lead.facebook_url ? (
                              <a
                                href={lead.facebook_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:bg-blue-500/10 hover:text-blue-600"
                                title="Facebook Page"
                              >
                                <Facebook size={12} />
                              </a>
                            ) : null}

                            {lead.website ? (
                              <a
                                href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:bg-indigo-500/10 hover:text-indigo-600"
                                title="Website"
                              >
                                <Globe size={12} />
                              </a>
                            ) : null}
                          </div>
                        </td>

                        <td className="px-3 py-4">
                          <span
                            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${priorityInfo.bg}`}
                          >
                            {priorityInfo.label}
                          </span>
                        </td>

                        <td className="px-3 py-4" onClick={(e) => e.stopPropagation()}>
                          <Select
                            value={lead.status}
                            onValueChange={(val) => void handleStatusChange(lead.id, val as HmsLeadStatus)}
                          >
                            <SelectTrigger className="h-7 w-[130px] text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(statusConfig).map(([sKey, sConf]) => (
                                <SelectItem key={sKey} value={sKey} className="text-xs">
                                  {sConf.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>

                        <td className="py-4 pl-3 pr-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-xs"
                              onClick={() => handleOpenLead(lead)}
                            >
                              Details
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                              onClick={() => void handleDeleteLead(lead.id)}
                            >
                              <Trash2 size={13} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Selected Lead Profile Drawer */}
      <Sheet open={Boolean(selectedLead)} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedLead && (
            <div className="space-y-6 pb-8">
              <SheetHeader>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                      selectedLead.type === "Boys"
                        ? "bg-blue-50 text-blue-700"
                        : selectedLead.type === "Girls"
                        ? "bg-purple-50 text-purple-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    <BedDouble size={12} className="mr-1" />
                    {selectedLead.type} Hostel
                  </span>

                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${
                      priorityConfig[selectedLead.priority as HmsLeadPriority]?.bg || ""
                    }`}
                  >
                    {priorityConfig[selectedLead.priority as HmsLeadPriority]?.label || selectedLead.priority} Priority
                  </span>
                </div>

                <SheetTitle className="text-2xl font-bold tracking-tight text-foreground">
                  {selectedLead.name}
                </SheetTitle>

                <SheetDescription className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <MapPin size={13} className="shrink-0 text-primary" />
                  {selectedLead.address || selectedLead.area_city || "Kathmandu"}
                </SheetDescription>
              </SheetHeader>

              {/* Action Buttons Hub */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {selectedLead.phone && (
                  <Button
                    asChild
                    variant="outline"
                    className="gap-2 border-primary/20 text-primary hover:bg-primary/5"
                  >
                    <a href={`tel:${selectedLead.phone.split(",")[0].trim()}`}>
                      <Phone size={15} />
                      Call {selectedLead.phone.split(",")[0].trim()}
                    </a>
                  </Button>
                )}

                {getWhatsAppLink(selectedLead) && (
                  <Button
                    asChild
                    className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                  >
                    <a href={getWhatsAppLink(selectedLead)!} target="_blank" rel="noopener noreferrer">
                      <MessageSquare size={15} />
                      WhatsApp Demo Pitch
                    </a>
                  </Button>
                )}

                {selectedLead.facebook_url && (
                  <Button asChild variant="outline" className="gap-2">
                    <a href={selectedLead.facebook_url} target="_blank" rel="noopener noreferrer">
                      <Facebook size={15} className="text-blue-600" />
                      Facebook Page
                    </a>
                  </Button>
                )}

                <Button asChild variant="outline" className="gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${selectedLead.name} ${selectedLead.area_city || "Kathmandu"}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin size={15} className="text-rose-500" />
                    Open in Maps
                  </a>
                </Button>
              </div>

              {/* Status and Priority Selectors */}
              <div className="grid grid-cols-2 gap-4 rounded-xl border border-border/60 bg-secondary/40 p-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Pipeline Stage</label>
                  <Select
                    value={selectedLead.status}
                    onValueChange={(val) => void handleStatusChange(selectedLead.id, val as HmsLeadStatus)}
                  >
                    <SelectTrigger className="mt-1 h-9 bg-white text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusConfig).map(([sKey, sConf]) => (
                        <SelectItem key={sKey} value={sKey} className="text-xs">
                          {sConf.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground">Priority Level</label>
                  <Select
                    value={selectedLead.priority}
                    onValueChange={(val) => void handlePriorityChange(selectedLead.id, val as HmsLeadPriority)}
                  >
                    <SelectTrigger className="mt-1 h-9 bg-white text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Detailed Lead Information List */}
              <div className="space-y-3 rounded-xl border border-border/60 bg-white p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Hostel Profile & Details
                </h4>

                <div className="grid grid-cols-1 gap-2.5 text-xs sm:grid-cols-2">
                  <div>
                    <span className="text-muted-foreground">Contact Person:</span>
                    <p className="font-medium text-foreground">{selectedLead.contact_person || "Not listed"}</p>
                  </div>

                  <div>
                    <span className="text-muted-foreground">Phone Number(s):</span>
                    <p className="font-medium text-foreground">{selectedLead.phone || "Not listed"}</p>
                  </div>

                  <div>
                    <span className="text-muted-foreground">WhatsApp / Viber:</span>
                    <p className="font-medium text-foreground">{selectedLead.whatsapp_viber || "Not listed"}</p>
                  </div>

                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium text-foreground">{selectedLead.email || "Not listed"}</p>
                  </div>

                  <div>
                    <span className="text-muted-foreground">Google Rating:</span>
                    <p className="font-medium text-amber-600">
                      {selectedLead.rating ? `★ ${selectedLead.rating.toFixed(1)} (${selectedLead.reviews_count || 0} reviews)` : "Not listed"}
                    </p>
                  </div>

                  <div>
                    <span className="text-muted-foreground">Capacity / Size:</span>
                    <p className="font-medium text-foreground">{selectedLead.approximate_size || "Not listed"}</p>
                  </div>
                </div>

                {selectedLead.source_urls && (
                  <div className="border-t border-border/40 pt-2 text-xs">
                    <span className="text-muted-foreground">Source URL:</span>
                    <p className="truncate text-primary">
                      <a href={selectedLead.source_urls} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {selectedLead.source_urls}
                      </a>
                    </p>
                  </div>
                )}
              </div>

              {/* CRM Activity Notes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Outreach & Interaction Notes
                  </h4>
                  <span className="text-[11px] text-muted-foreground">Markdown supported</span>
                </div>
                <Textarea
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  placeholder="Record call summary, warden/owner conversation, software requirements, scheduled demo details..."
                  className="min-h-[120px] text-xs leading-relaxed"
                />
                <div className="flex items-center justify-between pt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    onClick={() => void handleDeleteLead(selectedLead.id)}
                  >
                    <Trash2 size={13} className="mr-1" />
                    Delete Lead
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    disabled={isSavingNotes}
                    onClick={handleSaveNotes}
                    className="gap-2 text-xs"
                  >
                    <Check size={14} />
                    {isSavingNotes ? "Saving..." : "Save Notes"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Add Hostel Lead Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <form onSubmit={handleCreateLead}>
            <DialogHeader>
              <DialogTitle>Add New HMS Hostel Lead</DialogTitle>
              <DialogDescription>
                Manually record a new hostel opportunity in Kathmandu Valley.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3 py-4 text-xs">
              <div className="col-span-2">
                <label className="font-medium text-foreground">Hostel Name *</label>
                <Input
                  required
                  placeholder="e.g. Paramount Boys Hostel"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="font-medium text-foreground">Type</label>
                <Select
                  value={newLead.type}
                  onValueChange={(val) => setNewLead({ ...newLead, type: val })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Boys">Boys</SelectItem>
                    <SelectItem value="Girls">Girls</SelectItem>
                    <SelectItem value="Co-ed">Co-ed / Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="font-medium text-foreground">Priority</label>
                <Select
                  value={newLead.priority}
                  onValueChange={(val) => setNewLead({ ...newLead, priority: val as HmsLeadPriority })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <label className="font-medium text-foreground">Area & City</label>
                <Input
                  placeholder="e.g. New Baneshwor, Kathmandu"
                  value={newLead.area_city}
                  onChange={(e) => setNewLead({ ...newLead, area_city: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="col-span-2">
                <label className="font-medium text-foreground">Full Address</label>
                <Input
                  placeholder="e.g. Near Eyeplex Mall, New Baneshwor"
                  value={newLead.address}
                  onChange={(e) => setNewLead({ ...newLead, address: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="font-medium text-foreground">Phone Number</label>
                <Input
                  placeholder="+977 980-0000000"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="font-medium text-foreground">WhatsApp / Viber</label>
                <Input
                  placeholder="+977 980-0000000"
                  value={newLead.whatsapp_viber}
                  onChange={(e) => setNewLead({ ...newLead, whatsapp_viber: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="font-medium text-foreground">Contact Person / Owner</label>
                <Input
                  placeholder="e.g. Ramesh Adhikari"
                  value={newLead.contact_person}
                  onChange={(e) => setNewLead({ ...newLead, contact_person: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="font-medium text-foreground">Facebook URL</label>
                <Input
                  placeholder="https://facebook.com/..."
                  value={newLead.facebook_url}
                  onChange={(e) => setNewLead({ ...newLead, facebook_url: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="font-medium text-foreground">Google Maps Rating (e.g. 4.8)</label>
                <Input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  placeholder="4.8"
                  value={newLead.rating}
                  onChange={(e) => setNewLead({ ...newLead, rating: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="font-medium text-foreground">Review Count</label>
                <Input
                  type="number"
                  placeholder="45"
                  value={newLead.reviews_count}
                  onChange={(e) => setNewLead({ ...newLead, reviews_count: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="col-span-2">
                <label className="font-medium text-foreground">Initial Outreach Notes</label>
                <Textarea
                  placeholder="Any context or lead source..."
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  className="mt-1 h-16"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Lead</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* SQL Migration Reference Modal */}
      <Dialog open={isSqlModalOpen} onOpenChange={setIsSqlModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Database size={18} className="text-primary" />
              HMS Leads Database Migration & Seed SQL
            </DialogTitle>
            <DialogDescription>
              Run this SQL script in your Supabase SQL Editor to create table <code>public.hms_leads</code> and seed all 190 hostel leads.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="rounded-xl bg-slate-950 p-4 text-xs font-mono text-slate-100 max-h-72 overflow-y-auto space-y-2">
              <div className="text-emerald-400">-- Migration File: supabase/migrations/20260520120000_hms_lead_management.sql</div>
              <div className="text-slate-400">-- Standalone Seed: supabase/hms_leads_seed.sql</div>
              <div className="text-slate-300">
                CREATE TABLE IF NOT EXISTS public.hms_leads (<br />
                &nbsp;&nbsp;id uuid PRIMARY KEY DEFAULT gen_random_uuid(),<br />
                &nbsp;&nbsp;name text NOT NULL,<br />
                &nbsp;&nbsp;type text NOT NULL DEFAULT 'Hostel',<br />
                &nbsp;&nbsp;area_city text NOT NULL,<br />
                &nbsp;&nbsp;address text,<br />
                &nbsp;&nbsp;phone text,<br />
                &nbsp;&nbsp;whatsapp_viber text,<br />
                &nbsp;&nbsp;email text,<br />
                &nbsp;&nbsp;website text,<br />
                &nbsp;&nbsp;facebook_url text,<br />
                &nbsp;&nbsp;contact_person text,<br />
                &nbsp;&nbsp;rating numeric(3, 2),<br />
                &nbsp;&nbsp;reviews_count integer,<br />
                &nbsp;&nbsp;rating_raw text,<br />
                &nbsp;&nbsp;approximate_size text,<br />
                &nbsp;&nbsp;status text NOT NULL DEFAULT 'new',<br />
                &nbsp;&nbsp;priority text NOT NULL DEFAULT 'medium',<br />
                &nbsp;&nbsp;created_at timestamptz DEFAULT now(),<br />
                &nbsp;&nbsp;updated_at timestamptz DEFAULT now()<br />
                );<br />
                <br />
                -- Followed by RLS policies and 190 complete INSERT statements.
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-secondary/30 p-3 text-xs text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground">How to run in Supabase:</p>
              <p>1. Open your Supabase Project Dashboard &gt; <strong>SQL Editor</strong>.</p>
              <p>2. Open or copy the contents of <code>supabase/hms_leads_seed.sql</code> in this repository.</p>
              <p>3. Click <strong>Run</strong>. The table will be created and populated immediately.</p>
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between sm:justify-between">
            <span className="text-xs text-muted-foreground">
              Files: <code>supabase/hms_leads_seed.sql</code>
            </span>
            <Button type="button" onClick={handleCopySql} className="gap-2">
              {copiedSql ? <Check size={14} /> : <Copy size={14} />}
              {copiedSql ? "Copied!" : "Copy Instructions"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminHmsLeadsManager;
