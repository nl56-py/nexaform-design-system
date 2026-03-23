import { useEffect, useRef, useState, type ChangeEvent, type ComponentType } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  LoaderCircle,
  Quote,
  Redo2,
  RemoveFormatting,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { uploadAdminImage } from "@/lib/admin-media";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  editorClassName?: string;
  folder: string;
  minHeightClassName?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}

interface ToolbarButtonProps {
  active?: boolean;
  disabled?: boolean;
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}

const ToolbarButton = ({
  active = false,
  disabled = false,
  icon: Icon,
  label,
  onClick,
}: ToolbarButtonProps) => (
  <Button
    type="button"
    variant={active ? "default" : "ghost"}
    size="sm"
    disabled={disabled}
    onClick={onClick}
    className="h-9 px-3"
    aria-label={label}
    title={label}
  >
    <Icon className="h-4 w-4" />
  </Button>
);

const RichTextEditor = ({
  editorClassName,
  folder,
  minHeightClassName = "min-h-[320px]",
  onChange,
  placeholder = "Write here...",
  value,
}: RichTextEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Image.configure({
        allowBase64: false,
        inline: false,
      }),
      Link.configure({
        autolink: true,
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "admin-rich-text prose prose-slate max-w-none focus:outline-none [&_h1]:font-display [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_blockquote]:border-l-4 [&_blockquote]:border-primary/35 [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:rounded-2xl [&_img]:border [&_img]:border-border/60 [&_img]:shadow-sm [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentHtml = editor.getHTML();
    if (currentHtml !== value) {
      editor.commands.setContent(value || "", false);
    }
  }, [editor, value]);

  const insertLink = () => {
    if (!editor) {
      return;
    }

    const existingHref = editor.getAttributes("link").href as string | undefined;
    const href = window.prompt("Enter the link URL", existingHref || "https://");

    if (href === null) {
      return;
    }

    const trimmedHref = href.trim();

    if (!trimmedHref) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: trimmedHref }).run();
  };

  const handleInlineImageSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !editor) {
      return;
    }

    setUploadingImage(true);

    try {
      const url = await uploadAdminImage(file, folder);
      editor.chain().focus().setImage({ alt: file.name, src: url }).run();
      toast.success("Image uploaded and inserted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload image.");
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  if (!editor) {
    return (
      <div className="rounded-2xl border border-border/60 bg-secondary/35 px-4 py-8 text-sm text-muted-foreground">
        Loading editor...
      </div>
    );
  }

  return (
    <Tabs defaultValue="write" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border/60 bg-secondary/35 p-2">
          <ToolbarButton
            icon={Undo2}
            label="Undo"
            disabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}
          />
          <ToolbarButton
            icon={Redo2}
            label="Redo"
            disabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}
          />
          <Separator orientation="vertical" className="mx-1 h-7" />
          <ToolbarButton
            icon={Heading1}
            label="Heading 1"
            active={editor.isActive("heading", { level: 1 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          />
          <ToolbarButton
            icon={Heading2}
            label="Heading 2"
            active={editor.isActive("heading", { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          />
          <ToolbarButton
            icon={Bold}
            label="Bold"
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          />
          <ToolbarButton
            icon={Italic}
            label="Italic"
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />
          <ToolbarButton
            icon={UnderlineIcon}
            label="Underline"
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          />
          <ToolbarButton
            icon={Quote}
            label="Blockquote"
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          />
          <ToolbarButton
            icon={List}
            label="Bullet list"
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
          <ToolbarButton
            icon={ListOrdered}
            label="Ordered list"
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />
          <ToolbarButton
            icon={AlignLeft}
            label="Align left"
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          />
          <ToolbarButton
            icon={AlignCenter}
            label="Align center"
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          />
          <ToolbarButton
            icon={AlignRight}
            label="Align right"
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          />
          <ToolbarButton
            icon={Link2}
            label="Insert link"
            active={editor.isActive("link")}
            onClick={insertLink}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => void handleInlineImageSelected(event)}
          />
          <ToolbarButton
            icon={uploadingImage ? LoaderCircle : ImagePlus}
            label="Insert image"
            disabled={uploadingImage}
            onClick={() => fileInputRef.current?.click()}
          />
          <ToolbarButton
            icon={RemoveFormatting}
            label="Clear formatting"
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().setParagraph().run()
            }
          />
        </div>

        <TabsList className="h-10 rounded-xl bg-secondary/55">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="write" className="mt-0">
        <div
          className={cn(
            "overflow-hidden rounded-[1.5rem] border border-border/60 bg-card shadow-sm",
            editorClassName,
          )}
        >
          <EditorContent
            editor={editor}
            className={cn(
              "px-5 py-4 text-sm text-foreground [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none",
              minHeightClassName,
            )}
          />
        </div>
      </TabsContent>

      <TabsContent value="preview" className="mt-0">
        <div className="overflow-hidden rounded-[1.5rem] border border-border/60 bg-card shadow-sm">
          <div className="border-b border-border/50 px-5 py-3 text-sm text-muted-foreground">
            Live preview
          </div>
          <div
            className={cn(
              "admin-rich-text prose prose-slate max-w-none px-5 py-4 text-sm text-foreground [&_h1]:font-display [&_h2]:font-display [&_img]:rounded-2xl [&_img]:border [&_img]:border-border/60",
              minHeightClassName,
            )}
            dangerouslySetInnerHTML={{ __html: value || "<p></p>" }}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default RichTextEditor;
