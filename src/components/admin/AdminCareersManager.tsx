import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Briefcase, Building2, Calendar, Clock, Download, Eye, EyeOff, FileText, Loader2,
  Mail, MapPin, Phone, Plus, RefreshCcw, Save, Trash2, Users, X,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  listAdminPositions, createAdminPosition, updateAdminPosition, deleteAdminPosition,
  listAdminApplications, updateAdminApplicationStatus, updateAdminApplicationNotes,
} from "@/lib/admin-careers";
import type { JobPositionRecord } from "@/lib/careers";

const positionsKey = ["admin-positions"];
const applicationsKey = ["admin-applications"];

const statusStyles: Record<string, string> = {
  new: "bg-primary/10 text-primary border-primary/15",
  reviewing: "bg-amber-500/10 text-amber-600 border-amber-500/15",
  shortlisted: "bg-sky-500/10 text-sky-600 border-sky-500/15",
  interviewed: "bg-violet-500/10 text-violet-600 border-violet-500/15",
  offered: "bg-emerald-500/10 text-emerald-600 border-emerald-500/15",
  rejected: "bg-red-500/10 text-red-500 border-red-500/15",
  archived: "bg-muted/40 text-muted-foreground border-border/60",
};

const applicationStatusOptions = ["new", "reviewing", "shortlisted", "interviewed", "offered", "rejected", "archived"];

const emptyPosition = {
  title: "", slug: "", department: "Engineering", location: "Remote",
  employment_type: "Full-time", experience_level: "Mid-level", salary_range: "",
  description: "", requirements: "", benefits: "", published: false,
  published_at: null, deadline: null,
};

const AdminCareersManager = () => {
  const qc = useQueryClient();
  const [editingPosition, setEditingPosition] = useState<Partial<JobPositionRecord> | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedApp, setExpandedApp] = useState<string | null>(null);

  const { data: positions = [], isLoading: posLoading, isFetching: posFetching } = useQuery({
    queryKey: positionsKey, queryFn: listAdminPositions,
  });
  const { data: applications = [], isLoading: appLoading, isFetching: appFetching } = useQuery({
    queryKey: applicationsKey, queryFn: listAdminApplications,
  });

  const isFetching = posFetching || appFetching;

  const refreshAll = () => {
    void qc.invalidateQueries({ queryKey: positionsKey });
    void qc.invalidateQueries({ queryKey: applicationsKey });
  };

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSavePosition = async () => {
    if (!editingPosition || !editingPosition.title?.trim()) {
      toast.error("Position title is required."); return;
    }
    setSaving(true);
    try {
      const slug = editingPosition.slug?.trim() || slugify(editingPosition.title);
      const payload = { ...editingPosition, slug } as any;

      if (payload.published && !payload.published_at) {
        payload.published_at = new Date().toISOString();
      }

      if (editingPosition.id) {
        const { id, created_at, ...rest } = payload;
        await updateAdminPosition(id, rest);
        toast.success("Position updated.");
      } else {
        await createAdminPosition(payload);
        toast.success("Position created.");
      }
      setEditingPosition(null);
      await qc.invalidateQueries({ queryKey: positionsKey });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save position.");
    } finally { setSaving(false); }
  };

  const handleDeletePosition = async (id: string) => {
    if (!confirm("Delete this position and all its applications?")) return;
    try {
      await deleteAdminPosition(id);
      await qc.invalidateQueries({ queryKey: positionsKey });
      await qc.invalidateQueries({ queryKey: applicationsKey });
      toast.success("Position deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete.");
    }
  };

  const handleTogglePublish = async (pos: JobPositionRecord) => {
    try {
      await updateAdminPosition(pos.id, {
        published: !pos.published,
        published_at: !pos.published ? new Date().toISOString() : pos.published_at,
      });
      await qc.invalidateQueries({ queryKey: positionsKey });
      toast.success(pos.published ? "Position unpublished." : "Position published.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to toggle publish.");
    }
  };

  const handleAppStatus = async (id: string, status: string) => {
    try {
      await updateAdminApplicationStatus(id, status);
      await qc.invalidateQueries({ queryKey: applicationsKey });
      toast.success("Application status updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update.");
    }
  };

  const handleAppNotes = async (id: string, notes: string) => {
    try {
      await updateAdminApplicationNotes(id, notes);
      await qc.invalidateQueries({ queryKey: applicationsKey });
      toast.success("Notes saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save notes.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="card-surface rounded-card p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Careers Manager</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Post open positions and review submitted applications.
            </p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={refreshAll} disabled={isFetching}>
              <RefreshCcw size={16} className={isFetching ? "animate-spin" : ""} /> Refresh
            </Button>
            <Button type="button" variant="gradient" onClick={() => setEditingPosition({ ...emptyPosition })}>
              <Plus size={16} /> New Position
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="positions" className="space-y-5">
        <TabsList className="h-auto flex-wrap justify-start rounded-2xl bg-white/75 p-1.5">
          <TabsTrigger value="positions">
            <Briefcase size={14} className="mr-1.5" /> Positions ({positions.length})
          </TabsTrigger>
          <TabsTrigger value="applications">
            <Users size={14} className="mr-1.5" /> Applications ({applications.length})
          </TabsTrigger>
        </TabsList>

        {/* ── POSITIONS TAB ── */}
        <TabsContent value="positions" className="space-y-4">
          {/* Position Editor Modal */}
          {editingPosition && (
            <div className="card-surface rounded-card p-6 border-2 border-primary/20">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {editingPosition.id ? "Edit Position" : "Create Position"}
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setEditingPosition(null)}>
                  <X size={16} />
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-foreground">Title *</label>
                  <input className="mt-1 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm"
                    value={editingPosition.title ?? ""} onChange={(e) => setEditingPosition({ ...editingPosition, title: e.target.value, slug: slugify(e.target.value) })} placeholder="Senior React Developer" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Slug</label>
                  <input className="mt-1 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm"
                    value={editingPosition.slug ?? ""} onChange={(e) => setEditingPosition({ ...editingPosition, slug: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Department</label>
                  <input className="mt-1 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm"
                    value={editingPosition.department ?? ""} onChange={(e) => setEditingPosition({ ...editingPosition, department: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <input className="mt-1 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm"
                    value={editingPosition.location ?? ""} onChange={(e) => setEditingPosition({ ...editingPosition, location: e.target.value })} placeholder="Remote / Kathmandu" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Type</label>
                  <select className="mt-1 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm"
                    value={editingPosition.employment_type ?? "Full-time"} onChange={(e) => setEditingPosition({ ...editingPosition, employment_type: e.target.value })}>
                    {["Full-time","Part-time","Contract","Internship"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Experience Level</label>
                  <select className="mt-1 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm"
                    value={editingPosition.experience_level ?? "Mid-level"} onChange={(e) => setEditingPosition({ ...editingPosition, experience_level: e.target.value })}>
                    {["Entry","Mid-level","Senior","Lead"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Salary Range</label>
                  <input className="mt-1 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm"
                    value={editingPosition.salary_range ?? ""} onChange={(e) => setEditingPosition({ ...editingPosition, salary_range: e.target.value })} placeholder="NPR 50k – 80k / month" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Deadline</label>
                  <input type="date" className="mt-1 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm"
                    value={editingPosition.deadline ? editingPosition.deadline.slice(0,10) : ""} onChange={(e) => setEditingPosition({ ...editingPosition, deadline: e.target.value ? new Date(e.target.value).toISOString() : null })} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-foreground">Description (HTML)</label>
                  <textarea rows={5} className="mt-1 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm font-mono"
                    value={editingPosition.description ?? ""} onChange={(e) => setEditingPosition({ ...editingPosition, description: e.target.value })} placeholder="<p>We're looking for...</p>" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-foreground">Requirements (HTML)</label>
                  <textarea rows={4} className="mt-1 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm font-mono"
                    value={editingPosition.requirements ?? ""} onChange={(e) => setEditingPosition({ ...editingPosition, requirements: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-foreground">Benefits (HTML)</label>
                  <textarea rows={3} className="mt-1 w-full rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm font-mono"
                    value={editingPosition.benefits ?? ""} onChange={(e) => setEditingPosition({ ...editingPosition, benefits: e.target.value })} />
                </div>
                <div className="sm:col-span-2 flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
                    <input type="checkbox" checked={editingPosition.published ?? false}
                      onChange={(e) => setEditingPosition({ ...editingPosition, published: e.target.checked })} className="rounded" />
                    Publish immediately
                  </label>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button variant="gradient" onClick={() => void handleSavePosition()} disabled={saving}>
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {editingPosition.id ? "Update" : "Create"}
                </Button>
                <Button variant="outline" onClick={() => setEditingPosition(null)}>Cancel</Button>
              </div>
            </div>
          )}

          {posLoading ? (
            <div className="card-surface rounded-card p-6 text-sm text-muted-foreground">Loading positions...</div>
          ) : positions.length === 0 ? (
            <div className="card-surface rounded-card border-dashed p-6 text-center text-sm text-muted-foreground">
              No positions yet. Click "New Position" to create one.
            </div>
          ) : (
            <div className="grid gap-4">
              {positions.map((pos) => {
                const appCount = applications.filter(a => a.position_id === pos.id).length;
                return (
                  <div key={pos.id} className="card-surface rounded-card p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-lg font-semibold text-foreground">{pos.title}</h4>
                          {pos.published ? (
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Live</Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">Draft</Badge>
                          )}
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Building2 size={13}/> {pos.department}</span>
                          <span className="inline-flex items-center gap-1"><MapPin size={13}/> {pos.location}</span>
                          <span className="inline-flex items-center gap-1"><Clock size={13}/> {pos.employment_type}</span>
                          <span className="inline-flex items-center gap-1"><Users size={13}/> {appCount} applicant{appCount!==1?"s":""}</span>
                          {pos.deadline && <span className="inline-flex items-center gap-1"><Calendar size={13}/> {formatDistanceToNow(new Date(pos.deadline), {addSuffix:true})}</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => void handleTogglePublish(pos)} title={pos.published ? "Unpublish" : "Publish"}>
                          {pos.published ? <EyeOff size={15}/> : <Eye size={15}/>}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setEditingPosition({...pos})}>Edit</Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => void handleDeletePosition(pos.id)}>
                          <Trash2 size={15}/>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ── APPLICATIONS TAB ── */}
        <TabsContent value="applications" className="space-y-4">
          {appLoading ? (
            <div className="card-surface rounded-card p-6 text-sm text-muted-foreground">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="card-surface rounded-card border-dashed p-6 text-center text-sm text-muted-foreground">
              No applications received yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {applications.map((app) => {
                const isExpanded = expandedApp === app.id;
                return (
                  <div key={app.id} className="card-surface rounded-card p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 cursor-pointer" onClick={() => setExpandedApp(isExpanded ? null : app.id)}>
                      <div>
                        <div className="font-display text-lg font-semibold text-foreground">{app.full_name}</div>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Mail size={13}/> {app.email}</span>
                          {app.phone && <span className="inline-flex items-center gap-1"><Phone size={13}/> {app.phone}</span>}
                          <span className="inline-flex items-center gap-1">
                            <Briefcase size={13}/> {app.job_positions?.title ?? "Unknown Position"}
                          </span>
                          <span>{formatDistanceToNow(new Date(app.created_at), {addSuffix:true})}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className={statusStyles[app.status] ?? statusStyles.new}>{app.status}</Badge>
                    </div>

                    {isExpanded && (
                      <div className="mt-5 space-y-4 border-t border-border/40 pt-5">
                        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                          {app.current_role && <div><span className="font-medium text-foreground">Current Role:</span> {app.current_role}</div>}
                          {app.experience_years && <div><span className="font-medium text-foreground">Experience:</span> {app.experience_years}</div>}
                          {app.portfolio_url && <div><span className="font-medium text-foreground">Portfolio:</span> <a href={app.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">{app.portfolio_url}</a></div>}
                          {app.resume_url && (
                            <div>
                              <a href={app.resume_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary underline">
                                <Download size={14}/> Download Resume
                              </a>
                            </div>
                          )}
                        </div>

                        {app.cover_letter && (
                          <div className="rounded-2xl border border-border/60 bg-secondary/35 p-4">
                            <div className="font-medium text-foreground mb-2">Cover Letter</div>
                            <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{app.cover_letter}</p>
                          </div>
                        )}

                        <div className="rounded-2xl border border-border/60 bg-secondary/35 p-4">
                          <label className="font-medium text-foreground text-sm" htmlFor={`notes-${app.id}`}>Admin Notes</label>
                          <textarea id={`notes-${app.id}`} rows={2}
                            className="mt-2 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
                            defaultValue={app.admin_notes ?? ""}
                            onBlur={(e) => { if (e.target.value !== (app.admin_notes ?? "")) void handleAppNotes(app.id, e.target.value); }}
                            placeholder="Internal notes about this candidate..."
                          />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <label className="text-sm text-muted-foreground" htmlFor={`app-status-${app.id}`}>Update status</label>
                          <select id={`app-status-${app.id}`}
                            className="rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground"
                            value={app.status} onChange={(e) => void handleAppStatus(app.id, e.target.value)}>
                            {applicationStatusOptions.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCareersManager;
