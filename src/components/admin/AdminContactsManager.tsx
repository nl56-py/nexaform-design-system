import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { Building2, Calendar, Globe2, Mail, Phone, RefreshCcw, SearchCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  listAdminDigitalFairnessBookings,
  listAdminFreeAuditRequests,
  updateAdminDigitalFairnessBookingStatus,
  updateAdminFreeAuditRequestStatus,
} from "@/lib/admin-campaign-leads";
import {
  listAdminContactSubmissions,
  updateAdminContactSubmissionStatus,
} from "@/lib/admin-contacts";

const contactsQueryKey = ["admin-contact-submissions"];
const campaignBookingsQueryKey = ["admin-digital-fairness-bookings"];
const auditRequestsQueryKey = ["admin-free-audit-requests"];
const contactStatusOptions = ["new", "reviewing", "replied", "archived"];
const leadStatusOptions = ["new", "reviewing", "contacted", "completed", "converted", "archived"];

const statusStyles: Record<string, string> = {
  new: "bg-primary/10 text-primary border-primary/15",
  reviewing: "bg-amber-500/10 text-amber-600 border-amber-500/15",
  contacted: "bg-sky-500/10 text-sky-600 border-sky-500/15",
  completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/15",
  converted: "bg-highlight/10 text-highlight border-highlight/15",
  replied: "bg-emerald-500/10 text-emerald-600 border-emerald-500/15",
  archived: "bg-muted/40 text-muted-foreground border-border/60",
};

const AdminContactsManager = () => {
  const queryClient = useQueryClient();

  const {
    data: contacts = [],
    isLoading: isContactsLoading,
    error: contactsError,
    isFetching: isContactsFetching,
  } = useQuery({
    queryKey: contactsQueryKey,
    queryFn: listAdminContactSubmissions,
  });

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

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateAdminContactSubmissionStatus(id, status);
      await queryClient.invalidateQueries({ queryKey: contactsQueryKey });
      toast.success("Contact status updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update contact status.");
    }
  };

  const handleCampaignStatusChange = async (id: string, status: string) => {
    try {
      await updateAdminDigitalFairnessBookingStatus(id, status);
      await queryClient.invalidateQueries({ queryKey: campaignBookingsQueryKey });
      toast.success("Campaign booking status updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update campaign booking status.");
    }
  };

  const handleAuditStatusChange = async (id: string, status: string) => {
    try {
      await updateAdminFreeAuditRequestStatus(id, status);
      await queryClient.invalidateQueries({ queryKey: auditRequestsQueryKey });
      toast.success("Free audit request status updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update free audit request status.");
    }
  };

  const isFetching = isContactsFetching || isCampaignFetching || isAuditsFetching;

  const refreshAll = () => {
    void queryClient.invalidateQueries({ queryKey: contactsQueryKey });
    void queryClient.invalidateQueries({ queryKey: campaignBookingsQueryKey });
    void queryClient.invalidateQueries({ queryKey: auditRequestsQueryKey });
  };

  return (
    <div className="space-y-6">
      <div className="card-surface rounded-card p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Contact submissions</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Review contact leads, Digital Fairness bookings, and free SEO/AEO/GEO audit requests.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={refreshAll}
            disabled={isFetching}
          >
            <RefreshCcw size={16} className={isFetching ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="campaign" className="space-y-5">
        <TabsList className="h-auto flex-wrap justify-start rounded-2xl bg-white/75 p-1.5">
          <TabsTrigger value="campaign">Digital Fairness bookings ({campaignBookings.length})</TabsTrigger>
          <TabsTrigger value="audits">Free audits ({auditRequests.length})</TabsTrigger>
          <TabsTrigger value="contacts">General contacts ({contacts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="campaign" className="space-y-4">
          {isCampaignLoading ? (
            <LoadingState label="Loading campaign bookings..." />
          ) : campaignError ? (
            <ErrorState error={campaignError} fallback="Failed to load campaign bookings." />
          ) : campaignBookings.length === 0 ? (
            <EmptyState label="No Digital Fairness bookings yet." />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {campaignBookings.map((booking) => (
                <div key={booking.id} className="card-surface rounded-card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="font-display text-xl font-semibold text-foreground">{booking.name}</div>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail size={14} />
                        {booking.email}
                      </div>
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                    <InfoLine label="Phone" value={booking.phone} icon={<Phone size={14} />} />
                    <InfoLine label="Organization" value={booking.organization} icon={<Building2 size={14} />} />
                    <InfoLine label="Category" value={booking.business_category} />
                    <InfoLine label="Domain" value={booking.domain_support} icon={<Globe2 size={14} />} />
                    <InfoLine label="Timeline" value={booking.preferred_timeline} icon={<Calendar size={14} />} />
                    <InfoLine label="Submitted" value={new Date(booking.created_at).toLocaleString()} />
                  </div>

                  <MessageBlock title="Services / products" value={booking.services_description} />

                  <StatusSelect
                    id={`campaign-status-${booking.id}`}
                    status={booking.status}
                    options={leadStatusOptions}
                    onChange={(status) => void handleCampaignStatusChange(booking.id, status)}
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          {isAuditsLoading ? (
            <LoadingState label="Loading free audit requests..." />
          ) : auditsError ? (
            <ErrorState error={auditsError} fallback="Failed to load free audit requests." />
          ) : auditRequests.length === 0 ? (
            <EmptyState label="No free audit requests yet." />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {auditRequests.map((request) => (
                <div key={request.id} className="card-surface rounded-card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="font-display text-xl font-semibold text-foreground">{request.business_name}</div>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <SearchCheck size={14} />
                        {request.website_url}
                      </div>
                    </div>
                    <StatusBadge status={request.status} />
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                    <InfoLine label="Contact" value={request.name} />
                    <InfoLine label="Email" value={request.email} icon={<Mail size={14} />} />
                    <InfoLine label="Phone" value={request.contact_number} icon={<Phone size={14} />} />
                    <InfoLine label="Category" value={request.business_category} />
                    <InfoLine label="Area" value={request.service_area} icon={<Globe2 size={14} />} />
                    <InfoLine label="Goal" value={request.primary_goal} />
                    <InfoLine label="Submitted" value={new Date(request.created_at).toLocaleString()} />
                  </div>

                  <MessageBlock title="Services / products" value={request.services} />
                  {request.notes ? <MessageBlock title="Notes" value={request.notes} /> : null}

                  <StatusSelect
                    id={`audit-status-${request.id}`}
                    status={request.status}
                    options={leadStatusOptions}
                    onChange={(status) => void handleAuditStatusChange(request.id, status)}
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          {isContactsLoading ? (
            <LoadingState label="Loading contact submissions..." />
          ) : contactsError ? (
            <ErrorState error={contactsError} fallback="Failed to load contact submissions." />
          ) : contacts.length === 0 ? (
            <EmptyState label="No contact submissions yet." />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {contacts.map((contact) => (
                <div key={contact.id} className="card-surface rounded-card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="font-display text-xl font-semibold text-foreground">{contact.name}</div>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail size={14} />
                        {contact.email}
                      </div>
                    </div>
                    <StatusBadge status={contact.status} />
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                    <InfoLine label="Company" value={contact.company} />
                    <InfoLine label="Project type" value={contact.project_type} />
                    <InfoLine label="Budget" value={contact.budget} />
                    <InfoLine label="Timeline" value={contact.timeline} />
                    <InfoLine label="Submitted" value={new Date(contact.created_at).toLocaleString()} />
                  </div>

                  <MessageBlock title="Message" value={contact.message} />

                  <StatusSelect
                    id={`status-${contact.id}`}
                    status={contact.status}
                    options={contactStatusOptions}
                    onChange={(status) => void handleStatusChange(contact.id, status)}
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => (
  <Badge variant="outline" className={statusStyles[status] ?? statusStyles.new}>
    {status}
  </Badge>
);

const InfoLine = ({
  icon,
  label,
  value,
}: {
  icon?: ReactNode;
  label: string;
  value?: string | null;
}) => (
  <div className="flex items-start gap-2">
    {icon ? <span className="mt-0.5 text-muted-foreground">{icon}</span> : null}
    <span>
      <span className="font-medium text-foreground">{label}:</span> {value || "Not provided"}
    </span>
  </div>
);

const MessageBlock = ({ title, value }: { title: string; value: string }) => (
  <div className="mt-5 rounded-2xl border border-border/60 bg-secondary/35 p-4">
    <div className="font-medium text-foreground">{title}</div>
    <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{value}</p>
  </div>
);

const StatusSelect = ({
  id,
  status,
  options,
  onChange,
}: {
  id: string;
  status: string;
  options: string[];
  onChange: (status: string) => void;
}) => (
  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
    <label className="text-sm text-muted-foreground" htmlFor={id}>
      Update status
    </label>
    <select
      id={id}
      className="rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground"
      value={status}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
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
  <div className="card-surface rounded-card border-dashed p-6 text-sm text-muted-foreground">
    {label}
  </div>
);

export default AdminContactsManager;
