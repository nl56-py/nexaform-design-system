import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Clock, ExternalLink, MessageSquare, SkipForward, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateAdminHmsLead, type HmsLeadRecord } from "@/lib/admin-hms-leads";
import {
  DEFAULT_DAILY_LIMIT,
  FOLLOW_UP_AFTER_DAYS,
  FOLLOW_UP_NOTE,
  PITCH_NOTE,
  appendSendNote,
  buildWhatsAppLink,
  buildWhatsAppMessage,
  countSentToday,
  getFollowUpQueue,
  getOutreachQueue,
  getWhatsAppNumber,
  nepalDayKey,
  type WhatsAppMessageKind,
} from "@/lib/hms-whatsapp";

const LIMIT_KEY = "nexaform_hms_whatsapp_daily_limit";
const KIND_KEY = "nexaform_hms_whatsapp_first_message";

const readStored = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStored = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // not critical: the setting just won't be remembered
  }
};

interface HmsSendQueueProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leads: HmsLeadRecord[];
  /** Called after a lead is marked as sent, so the parent can refetch. */
  onUpdated: () => Promise<unknown> | void;
}

/**
 * Daily WhatsApp send queue. Each message is opened pre-filled in WhatsApp and sent by a person,
 * then marked here; the queue stops at the daily limit (counted in Nepal time).
 */
const HmsSendQueue = ({ open, onOpenChange, leads, onUpdated }: HmsSendQueueProps) => {
  const [tab, setTab] = useState<"outreach" | "followup">("outreach");
  const [firstMessage, setFirstMessage] = useState<"pitch" | "opener">(() =>
    readStored(KIND_KEY) === "opener" ? "opener" : "pitch"
  );
  const [dailyLimit, setDailyLimit] = useState<number>(() => {
    const stored = Number(readStored(LIMIT_KEY));
    return Number.isFinite(stored) && stored > 0 ? stored : DEFAULT_DAILY_LIMIT;
  });
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [skippedIds, setSkippedIds] = useState<Set<string>>(new Set());
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  const outreach = useMemo(() => getOutreachQueue(leads), [leads]);
  const followUps = useMemo(() => getFollowUpQueue(leads), [leads]);

  // Leads just marked as sent may not be in the refetched list yet; count them straight away.
  const sentToday = useMemo(() => {
    const today = nepalDayKey(new Date());
    const counted = countSentToday(leads);
    const pending = leads.filter(
      (l) =>
        doneIds.has(l.id) &&
        !(l.last_contacted_at && nepalDayKey(new Date(l.last_contacted_at)) === today)
    ).length;
    return counted + pending;
  }, [leads, doneIds]);
  const remaining = Math.max(0, dailyLimit - sentToday);
  const limitReached = remaining === 0;

  const queue = (tab === "outreach" ? outreach : followUps).filter(
    (l) => !skippedIds.has(l.id) && !doneIds.has(l.id)
  );
  const current = queue[0] ?? null;
  const kind: WhatsAppMessageKind = tab === "followup" ? "followup" : firstMessage;
  const link = current ? buildWhatsAppLink(current, kind) : null;

  const changeFirstMessage = (value: "pitch" | "opener") => {
    setFirstMessage(value);
    writeStored(KIND_KEY, value);
  };

  const changeLimit = (value: string) => {
    const n = Math.min(200, Math.max(1, Math.round(Number(value) || 0)));
    setDailyLimit(n);
    writeStored(LIMIT_KEY, String(n));
  };

  const skip = (lead: HmsLeadRecord) => {
    setSkippedIds((prev) => new Set(prev).add(lead.id));
    setOpenedId(null);
  };

  const markSent = async (lead: HmsLeadRecord) => {
    setSaving(true);
    try {
      const line =
        kind === "followup"
          ? FOLLOW_UP_NOTE
          : `${PITCH_NOTE} (${kind === "opener" ? "short opener" : "full pitch"})`;
      await updateAdminHmsLead(lead.id, {
        status: lead.status === "new" ? "contacted" : lead.status,
        last_contacted_at: new Date().toISOString(),
        notes: appendSendNote(lead.notes, line),
      });
      setDoneIds((prev) => new Set(prev).add(lead.id));
      setOpenedId(null);
      await onUpdated();
      toast.success(`${lead.name} marked as sent.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update the lead.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send size={18} className="text-emerald-600" />
            WhatsApp send queue
          </DialogTitle>
          <DialogDescription>
            Open each message in WhatsApp, press send there, then mark it as sent here. The queue stops at the
            daily limit and starts again after midnight, Nepal time.
          </DialogDescription>
        </DialogHeader>

        {/* Today's progress and settings */}
        <div className="grid gap-3 rounded-xl border border-border/60 bg-muted/30 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">{sentToday}</span>
              <span className="text-sm text-muted-foreground">of {dailyLimit} sent today</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-border/60">
              <div
                className={`h-full rounded-full ${limitReached ? "bg-amber-500" : "bg-emerald-500"}`}
                style={{ width: `${Math.min(100, (sentToday / dailyLimit) * 100)}%` }}
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            Daily limit
            <Input
              type="number"
              min={1}
              max={200}
              value={dailyLimit}
              onChange={(e) => changeLimit(e.target.value)}
              className="h-8 w-20"
            />
          </label>
        </div>

        <Tabs value={tab} onValueChange={(v) => { setTab(v as "outreach" | "followup"); setOpenedId(null); }}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="outreach">New outreach ({outreach.length})</TabsTrigger>
            <TabsTrigger value="followup">Follow-ups ({followUps.length})</TabsTrigger>
          </TabsList>
        </Tabs>

        {tab === "outreach" ? (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted-foreground">First message:</span>
            <Button
              type="button"
              size="sm"
              variant={firstMessage === "pitch" ? "default" : "outline"}
              onClick={() => changeFirstMessage("pitch")}
            >
              Full pitch
            </Button>
            <Button
              type="button"
              size="sm"
              variant={firstMessage === "opener" ? "default" : "outline"}
              onClick={() => changeFirstMessage("opener")}
            >
              Short opener
            </Button>
            {firstMessage === "opener" && (
              <span className="text-xs text-muted-foreground">
                When they reply, send the full pitch from the lead's "WhatsApp Pitch" button.
              </span>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Leads still at "Contacted" {FOLLOW_UP_AFTER_DAYS}+ days after the first message. Each gets one follow-up.
            If someone replied, move them to "Interested" and they leave this list.
          </p>
        )}

        {/* Current lead */}
        {limitReached ? (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 text-center">
            <CheckCircle2 className="mx-auto mb-2 text-amber-600" size={28} />
            <p className="font-semibold text-foreground">Done for today: {dailyLimit} messages sent.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              The queue opens again after midnight. Spend the rest of the time calling the hostels that replied.
            </p>
          </div>
        ) : !current ? (
          <div className="rounded-xl border border-border/60 p-6 text-center text-sm text-muted-foreground">
            {tab === "outreach"
              ? "No new leads with a WhatsApp number left to message."
              : "No follow-ups due right now."}
          </div>
        ) : (
          <div className="space-y-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-lg font-bold text-foreground">{current.name}</p>
                <p className="text-sm text-muted-foreground">
                  {current.area_city}
                  {current.contact_person ? ` · ${current.contact_person}` : ""}
                  {" · +"}
                  {getWhatsAppNumber(current)}
                </p>
                {tab === "followup" && current.last_contacted_at && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={12} />
                    Last messaged {new Date(current.last_contacted_at).toLocaleDateString("en-GB", { timeZone: "Asia/Kathmandu" })}
                  </p>
                )}
              </div>
              <Badge variant="outline" className="capitalize">
                {current.priority} priority
              </Badge>
            </div>

            <details className="rounded-lg border border-border/60 bg-white/70 p-3 text-sm">
              <summary className="cursor-pointer font-medium text-foreground">Preview message</summary>
              <p className="mt-2 whitespace-pre-wrap text-muted-foreground">{buildWhatsAppMessage(current, kind)}</p>
            </details>

            <div className="flex flex-wrap gap-2">
              {link && (
                <Button asChild className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                  <a href={link} target="_blank" rel="noopener noreferrer" onClick={() => setOpenedId(current.id)}>
                    <MessageSquare size={15} />
                    1. Open in WhatsApp
                    <ExternalLink size={13} />
                  </a>
                </Button>
              )}
              <Button
                type="button"
                variant={openedId === current.id ? "default" : "outline"}
                disabled={saving}
                onClick={() => void markSent(current)}
                className="gap-2"
              >
                <CheckCircle2 size={15} />
                2. Mark as sent
              </Button>
              <Button type="button" variant="ghost" disabled={saving} onClick={() => skip(current)} className="gap-2">
                <SkipForward size={15} />
                Skip
              </Button>
            </div>

            {queue.length > 1 && (
              <p className="text-xs text-muted-foreground">
                Up next: {queue.slice(1, 4).map((l) => l.name).join(", ")}
                {queue.length > 4 ? ` and ${queue.length - 4} more` : ""}
              </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HmsSendQueue;
