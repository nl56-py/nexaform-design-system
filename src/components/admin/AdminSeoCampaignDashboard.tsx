import { useMemo, useState, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  BadgeCheck,
  Building2,
  Calendar,
  ExternalLink,
  Globe2,
  Mail,
  Phone,
  RefreshCcw,
  SearchCheck,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  listAdminDigitalFairnessBookings,
  listAdminFreeAuditRequests,
  updateAdminDigitalFairnessBookingStatus,
  updateAdminFreeAuditRequestStatus,
} from "@/lib/admin-campaign-leads";
import type { DigitalFairnessBookingRecord, FreeAuditRequestRecord } from "@/lib/campaign-leads";

const campaignBookingsQueryKey = ["admin-digital-fairness-bookings"];
const auditRequestsQueryKey = ["admin-free-audit-requests"];
const leadStatusOptions = ["new", "reviewing", "contacted", "completed", "converted", "archived"];

const statusStyles: Record<string, string> = {
  new: "bg-primary/10 text-primary border-primary/15",
  reviewing: "bg-amber-500/10 text-amber-600 border-amber-500/15",
  contacted: "bg-sky-500/10 text-sky-600 border-sky-500/15",
  completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/15",
  converted: "bg-highlight/10 text-highlight border-highlight/15",
  archived: "bg-muted/40 text-muted-foreground border-border/60",
};

type DashboardLead = {
  createdAt: string;
  email: string;
  id: string;
  phone: string;
  source: "campaign" | "audit";
  status: string;
  subtitle: string;
  title: string;
};

const AdminSeoCampaignDashboard = () => {
  const queryClient = useQueryClient();
  const [updatingLead, setUpdatingLead] = useState<string | null>(null);

  const {
    data: campaignBookings = [],
    isLoading: isCampaignLoading,
    error: campaignError,
    isFetching: isCampaignFetching,
  } = useQuery({
    queryKey: campaignBookingsQueryKey,
    queryFn: listAdminDigitalFairnessBookings,
  });

  const {
    data: auditRequests = [],
    isLoading: isAuditsLoading,
    error: auditsError,
    isFetching: isAuditsFetching,
  } = useQuery({
    queryKey: auditRequestsQueryKey,
    queryFn: listAdminFreeAuditRequests,
  });

  const allLeads = useMemo<DashboardLead[]>(
    () =>
      [
        ...campaignBookings.map((booking) => ({
          createdAt: booking.created_at,
          email: booking.email,
          id: booking.id,
          phone: booking.phone,
          source: "campaign" as const,
          status: booking.status,
          subtitle: booking.organization || booking.business_category,
          title: booking.name,
        })),
        ...auditRequests.map((request) => ({
          createdAt: request.created_at,
          email: request.email,
          id: request.id,
          phone: request.contact_number,
          source: "audit" as const,
          status: request.status,
          subtitle: request.website_url,
          title: request.business_name,
        })),
      ].sort((left, right) => getTime(right.createdAt) - getTime(left.createdAt)),
    [auditRequests, campaignBookings],
  );

  const recentLeads = allLeads.slice(0, 5);
  const campaignStats = getLeadStats(campaignBookings);
  const auditStats = getLeadStats(auditRequests);
  const totalNew = allLeads.filter((lead) => lead.status === "new").length;
  const followUpQueue = allLeads.filter((lead) => ["new", "reviewing", "contacted"].includes(lead.status)).length;
  const convertedCampaigns = campaignBookings.filter((booking) => booking.status === "converted").length;
  const isLoading = isCampaignLoading || isAuditsLoading;
  const isFetching = isCampaignFetching || isAuditsFetching;

  const refreshAll = () => {
    void queryClient.invalidateQueries({ queryKey: campaignBookingsQueryKey });
    void queryClient.invalidateQueries({ queryKey: auditRequestsQueryKey });
  };

  const invalidateLeadQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: campaignBookingsQueryKey }),
      queryClient.invalidateQueries({ queryKey: auditRequestsQueryKey }),
      queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
    ]);
  };

  const handleCampaignStatusChange = async (id: string, status: string) => {
    setUpdatingLead(`campaign-${id}`);
    try {
      await updateAdminDigitalFairnessBookingStatus(id, status);
      await invalidateLeadQueries();
      toast.success("Campaign booking status updated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update campaign booking status.");
    } finally {
      setUpdatingLead(null);
    }
  };

  const handleAuditStatusChange = async (id: string, status: string) => {
    setUpdatingLead(`audit-${id}`);
    try {
      await updateAdminFreeAuditRequestStatus(id, status);
      await invalidateLeadQueries();
      toast.success("Free audit request status updated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update free audit request status.");
    } finally {
      setUpdatingLead(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card-surface rounded-card p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                Live lead dashboard
              </Badge>
              <Badge variant="outline">{followUpQueue} leads need follow-up</Badge>
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">
              SEO audit and Digital Fairness campaign pipeline
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground md:text-base">
              Track free SEO/AEO/GEO audit requests and Digital Fairness campaign applications, then move each
              lead through follow-up, completion, conversion, or archive.
            </p>
          </div>
          <Button type="button" variant="outline" onClick={refreshAll} disabled={isFetching}>
            <RefreshCcw size={16} className={isFetching ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={<SearchCheck size={20} />}
          label="Free audit requests"
          value={auditRequests.length}
          detail={`${auditStats.new} new, ${auditStats.reviewing} reviewing`}
        />
        <MetricCard
          icon={<UsersRound size={20} />}
          label="Campaign bookings"
          value={campaignBookings.length}
          detail={`${campaignStats.new} new, ${convertedCampaigns} converted`}
        />
        <MetricCard
          icon={<Target size={20} />}
          label="Fresh leads"
          value={totalNew}
          detail="New submissions across both funnels"
        />
        <MetricCard
          icon={<Sparkles size={20} />}
          label="Fairness leads"
          value={campaignBookings.length}
          detail="Total campaign applications"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-5">
        <TabsList className="h-auto flex-wrap justify-start rounded-2xl bg-white/75 p-1.5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaign">Campaign bookings ({campaignBookings.length})</TabsTrigger>
          <TabsTrigger value="audits">Free audits ({auditRequests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <div className="space-y-6">
              <StatusBreakdown
                title="Digital Fairness funnel"
                description="Digital Fairness campaign booking status mix."
                records={campaignBookings}
              />
              <StatusBreakdown
                title="SEO audit funnel"
                description="Free SEO/AEO/GEO audit request status mix."
                records={auditRequests}
              />
            </div>

            <div className="card-surface rounded-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-display text-xl font-semibold text-foreground">Newest leads</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Latest campaign and audit submissions by arrival time.
                  </p>
                </div>
                {isLoading ? <Badge variant="outline">Loading...</Badge> : null}
              </div>

              <div className="mt-5 space-y-3">
                {!isLoading && recentLeads.length === 0 ? (
                  <EmptyState label="No SEO or campaign leads have arrived yet." />
                ) : null}

                {recentLeads.map((lead) => (
                  <RecentLeadRow key={`${lead.source}-${lead.id}`} lead={lead} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="campaign" className="space-y-4">
          {isCampaignLoading ? (
            <LoadingState label="Loading Digital Fairness bookings..." />
          ) : campaignError ? (
            <ErrorState error={campaignError} fallback="Failed to load campaign bookings." />
          ) : campaignBookings.length === 0 ? (
            <EmptyState label="No Digital Fairness campaign bookings yet." />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {campaignBookings.map((booking) => (
                <CampaignBookingCard
                  key={booking.id}
                  booking={booking}
                  disabled={updatingLead === `campaign-${booking.id}`}
                  onStatusChange={(status) => void handleCampaignStatusChange(booking.id, status)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          {isAuditsLoading ? (
            <LoadingState label="Loading free SEO audit requests..." />
          ) : auditsError ? (
            <ErrorState error={auditsError} fallback="Failed to load free audit requests." />
          ) : auditRequests.length === 0 ? (
            <EmptyState label="No free SEO audit requests yet." />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {auditRequests.map((request) => (
                <AuditRequestCard
                  key={request.id}
                  request={request}
                  disabled={updatingLead === `audit-${request.id}`}
                  onStatusChange={(status) => void handleAuditStatusChange(request.id, status)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const MetricCard = ({
  detail,
  icon,
  label,
  value,
}: {
  detail: string;
  icon: ReactNode;
  label: string;
  value: number | string;
}) => (
  <div className="card-surface rounded-card p-5">
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
    </div>
    <div className="mt-3 font-display text-3xl font-semibold text-foreground">{value}</div>
    <div className="mt-2 text-sm text-muted-foreground">{detail}</div>
  </div>
);

const StatusBreakdown = ({
  description,
  records,
  title,
}: {
  description: string;
  records: Array<{ status: string }>;
  title: string;
}) => {
  const total = records.length;

  return (
    <div className="card-surface rounded-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-display text-xl font-semibold text-foreground">{title}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <Badge variant="outline">{total} total</Badge>
      </div>

      <div className="mt-5 space-y-4">
        {leadStatusOptions.map((status) => {
          const count = records.filter((record) => record.status === status).length;
          const percent = total ? Math.round((count / total) * 100) : 0;

          return (
            <div key={status}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="capitalize text-foreground">{status}</span>
                <span className="text-muted-foreground">
                  {count} / {total}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RecentLeadRow = ({ lead }: { lead: DashboardLead }) => (
  <div className="rounded-2xl border border-border/60 bg-secondary/30 px-4 py-4">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={lead.source === "campaign" ? "border-sky-500/20 text-sky-600" : "border-emerald-500/20 text-emerald-600"}>
            {lead.source === "campaign" ? "Campaign" : "SEO audit"}
          </Badge>
          <StatusBadge status={lead.status} />
        </div>
        <div className="mt-2 font-medium text-foreground">{lead.title}</div>
        <div className="mt-1 break-words text-sm text-muted-foreground">{lead.subtitle}</div>
      </div>
      <div className="text-sm text-muted-foreground">{formatRelativeTime(lead.createdAt)}</div>
    </div>
  </div>
);

const CampaignBookingCard = ({
  booking,
  disabled,
  onStatusChange,
}: {
  booking: DigitalFairnessBookingRecord;
  disabled: boolean;
  onStatusChange: (status: string) => void;
}) => (
  <div className="card-surface rounded-card p-6">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-sky-500/20 text-sky-600">
            Digital Fairness campaign
          </Badge>
          <StatusBadge status={booking.status} />
        </div>
        <h4 className="mt-3 font-display text-xl font-semibold text-foreground">{booking.name}</h4>
        <div className="mt-1 text-sm text-muted-foreground">{booking.organization || "Organization not provided"}</div>
      </div>
      <div className="text-sm text-muted-foreground">{formatRelativeTime(booking.created_at)}</div>
    </div>

    <div className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
      <InfoLine label="Email" value={booking.email} icon={<Mail size={14} />} href={`mailto:${booking.email}`} />
      <InfoLine label="Phone" value={booking.phone} icon={<Phone size={14} />} href={`tel:${booking.phone}`} />
      <InfoLine label="Category" value={booking.business_category} icon={<Building2 size={14} />} />
      <InfoLine label="Domain" value={booking.domain_support} icon={<Globe2 size={14} />} />
      <InfoLine label="Timeline" value={booking.preferred_timeline} icon={<Calendar size={14} />} />
      <InfoLine label="Submitted" value={new Date(booking.created_at).toLocaleString()} icon={<BadgeCheck size={14} />} />
    </div>

    <MessageBlock title="Services / products" value={booking.services_description} />

    <StatusSelect
      id={`campaign-status-${booking.id}`}
      disabled={disabled}
      status={booking.status}
      onChange={onStatusChange}
    />
  </div>
);

const AuditRequestCard = ({
  disabled,
  onStatusChange,
  request,
}: {
  disabled: boolean;
  onStatusChange: (status: string) => void;
  request: FreeAuditRequestRecord;
}) => (
  <div className="card-surface rounded-card p-6">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-emerald-500/20 text-emerald-600">
            Free SEO audit
          </Badge>
          <StatusBadge status={request.status} />
        </div>
        <h4 className="mt-3 font-display text-xl font-semibold text-foreground">{request.business_name}</h4>
        <a
          href={request.website_url}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-flex max-w-full items-center gap-1 break-all text-sm text-primary hover:underline"
        >
          {request.website_url}
          <ExternalLink size={13} />
        </a>
      </div>
      <div className="text-sm text-muted-foreground">{formatRelativeTime(request.created_at)}</div>
    </div>

    <div className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
      <InfoLine label="Contact" value={request.name} icon={<UsersRound size={14} />} />
      <InfoLine label="Email" value={request.email} icon={<Mail size={14} />} href={`mailto:${request.email}`} />
      <InfoLine label="Phone" value={request.contact_number} icon={<Phone size={14} />} href={`tel:${request.contact_number}`} />
      <InfoLine label="Category" value={request.business_category} icon={<Building2 size={14} />} />
      <InfoLine label="Area" value={request.service_area} icon={<Globe2 size={14} />} />
      <InfoLine label="Goal" value={request.primary_goal} icon={<TrendingUp size={14} />} />
      <InfoLine label="Submitted" value={new Date(request.created_at).toLocaleString()} icon={<BadgeCheck size={14} />} />
    </div>

    <MessageBlock title="Services / products" value={request.services} />
    {request.notes ? <MessageBlock title="Notes" value={request.notes} /> : null}

    <StatusSelect
      id={`audit-status-${request.id}`}
      disabled={disabled}
      status={request.status}
      onChange={onStatusChange}
    />
  </div>
);

const StatusBadge = ({ status }: { status: string }) => (
  <Badge variant="outline" className={statusStyles[status] ?? statusStyles.new}>
    {status}
  </Badge>
);

const InfoLine = ({
  href,
  icon,
  label,
  value,
}: {
  href?: string;
  icon?: ReactNode;
  label: string;
  value?: string | null;
}) => {
  const displayValue = value || "Not provided";

  return (
    <div className="flex min-w-0 items-start gap-2">
      {icon ? <span className="mt-0.5 text-muted-foreground">{icon}</span> : null}
      <span className="min-w-0">
        <span className="font-medium text-foreground">{label}:</span>{" "}
        {href && value ? (
          <a className="break-all text-primary hover:underline" href={href}>
            {displayValue}
          </a>
        ) : (
          <span className="break-words">{displayValue}</span>
        )}
      </span>
    </div>
  );
};

const MessageBlock = ({ title, value }: { title: string; value: string }) => (
  <div className="mt-5 rounded-2xl border border-border/60 bg-secondary/35 p-4">
    <div className="font-medium text-foreground">{title}</div>
    <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{value}</p>
  </div>
);

const StatusSelect = ({
  disabled,
  id,
  onChange,
  status,
}: {
  disabled: boolean;
  id: string;
  onChange: (status: string) => void;
  status: string;
}) => (
  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
    <label className="text-sm text-muted-foreground" htmlFor={id}>
      Update status
    </label>
    <select
      id={id}
      className="rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground disabled:cursor-not-allowed disabled:opacity-60"
      disabled={disabled}
      value={status}
      onChange={(event) => onChange(event.target.value)}
    >
      {leadStatusOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const LoadingState = ({ label }: { label: string }) => (
  <div className="card-surface rounded-card p-6 text-sm text-muted-foreground">{label}</div>
);

const ErrorState = ({ error, fallback }: { error: unknown; fallback: string }) => (
  <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-5 text-sm text-destructive">
    {error instanceof Error ? error.message : fallback}
  </div>
);

const EmptyState = ({ label }: { label: string }) => (
  <div className="card-surface rounded-card border-dashed p-6 text-sm text-muted-foreground">{label}</div>
);

const getLeadStats = (records: Array<{ status: string }>) =>
  leadStatusOptions.reduce(
    (stats, status) => ({
      ...stats,
      [status]: records.filter((record) => record.status === status).length,
    }),
    {} as Record<string, number>,
  );

const getTime = (value: string) => {
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
};

const formatRelativeTime = (value: string) => {
  const time = getTime(value);

  if (!time) {
    return "No date";
  }

  return formatDistanceToNow(new Date(value), { addSuffix: true });
};

const formatRupees = (value: number) => `Rs. ${new Intl.NumberFormat("en-NP").format(value)}`;

export default AdminSeoCampaignDashboard;
