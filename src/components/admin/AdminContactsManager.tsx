import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Mail, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  listAdminContactSubmissions,
  updateAdminContactSubmissionStatus,
} from "@/lib/admin-contacts";

const queryKey = ["admin-contact-submissions"];
const statusOptions = ["new", "reviewing", "replied", "archived"];

const statusStyles: Record<string, string> = {
  new: "bg-primary/10 text-primary border-primary/15",
  reviewing: "bg-amber-500/10 text-amber-600 border-amber-500/15",
  replied: "bg-emerald-500/10 text-emerald-600 border-emerald-500/15",
  archived: "bg-muted/40 text-muted-foreground border-border/60",
};

const AdminContactsManager = () => {
  const queryClient = useQueryClient();

  const { data: contacts = [], isLoading, error, isFetching } = useQuery({
    queryKey,
    queryFn: listAdminContactSubmissions,
  });

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateAdminContactSubmissionStatus(id, status);
      await queryClient.invalidateQueries({ queryKey });
      toast.success("Contact status updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update contact status.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="card-surface rounded-card p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Contact submissions</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Review inquiries submitted from the contact form and keep their status up to date.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => queryClient.invalidateQueries({ queryKey })}
            disabled={isFetching}
          >
            <RefreshCcw size={16} className={isFetching ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="card-surface rounded-card p-6 text-sm text-muted-foreground">
          Loading contact submissions...
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-5 text-sm text-destructive">
          {error instanceof Error ? error.message : "Failed to load contact submissions."}
        </div>
      )}

      {!isLoading && !error && contacts.length === 0 && (
        <div className="card-surface rounded-card border-dashed p-6 text-sm text-muted-foreground">
          No contact submissions yet.
        </div>
      )}

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
              <Badge
                variant="outline"
                className={statusStyles[contact.status] ?? statusStyles.new}
              >
                {contact.status}
              </Badge>
            </div>

            <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <div>
                <span className="font-medium text-foreground">Company:</span>{" "}
                {contact.company || "Not provided"}
              </div>
              <div>
                <span className="font-medium text-foreground">Project type:</span>{" "}
                {contact.project_type || "Not provided"}
              </div>
              <div>
                <span className="font-medium text-foreground">Budget:</span>{" "}
                {contact.budget || "Not provided"}
              </div>
              <div>
                <span className="font-medium text-foreground">Timeline:</span>{" "}
                {contact.timeline || "Not provided"}
              </div>
              <div className="sm:col-span-2">
                <span className="font-medium text-foreground">Submitted:</span>{" "}
                {new Date(contact.created_at).toLocaleString()}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-border/60 bg-secondary/35 p-4">
              <div className="font-medium text-foreground">Message</div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                {contact.message}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <label className="text-sm text-muted-foreground" htmlFor={`status-${contact.id}`}>
                Update status
              </label>
              <select
                id={`status-${contact.id}`}
                className="rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground"
                value={contact.status}
                onChange={(event) => void handleStatusChange(contact.id, event.target.value)}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContactsManager;
