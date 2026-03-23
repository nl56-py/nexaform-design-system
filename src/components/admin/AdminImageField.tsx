import { useRef, useState, type ChangeEvent } from "react";
import { ImagePlus, LoaderCircle, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadAdminImage } from "@/lib/admin-media";

interface AdminImageFieldProps {
  description?: string;
  folder: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  previewAlt: string;
  value: string;
}

const AdminImageField = ({
  description,
  folder,
  id,
  label,
  onChange,
  previewAlt,
  value,
}: AdminImageFieldProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);

    try {
      const publicUrl = await uploadAdminImage(file, folder);
      onChange(publicUrl);
      toast.success("Image uploaded.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload image.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Label htmlFor={id}>{label}</Label>
        <div className="flex flex-wrap gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => void handleFileSelected(event)}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? <LoaderCircle className="animate-spin" /> : <Upload />}
            {uploading ? "Uploading..." : "Upload"}
          </Button>
          {value && (
            <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
              <Trash2 />
              Clear
            </Button>
          )}
        </div>
      </div>

      <Input id={id} value={value} onChange={(event) => onChange(event.target.value)} placeholder="https://..." />

      {description && <p className="text-xs text-muted-foreground">{description}</p>}

      {value && (
        <div className="overflow-hidden rounded-[1.5rem] border border-border/60 bg-secondary/40">
          <div className="flex items-center gap-2 border-b border-border/40 px-4 py-3 text-sm text-muted-foreground">
            <ImagePlus size={16} />
            Image preview
          </div>
          <img src={value} alt={previewAlt} className="h-56 w-full object-cover" />
        </div>
      )}
    </div>
  );
};

export default AdminImageField;
