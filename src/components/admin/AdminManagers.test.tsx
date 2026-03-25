import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AdminBlogsManager from "@/components/admin/AdminBlogsManager";
import AdminProjectsManager from "@/components/admin/AdminProjectsManager";

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

vi.mock("@/components/admin/AdminImageField", () => ({
  default: () => <div data-testid="admin-image-field" />,
}));

vi.mock("@/components/admin/RichTextEditor", () => ({
  default: () => <div data-testid="rich-text-editor" />,
}));

vi.mock("@/components/ui/switch", () => ({
  Switch: ({
    checked,
    onCheckedChange,
  }: {
    checked: boolean;
    onCheckedChange: (value: boolean) => void;
  }) => (
    <input
      aria-label="Published"
      type="checkbox"
      checked={checked}
      onChange={(event) => onCheckedChange(event.target.checked)}
    />
  ),
}));

vi.mock("@/lib/admin-blogs", () => ({
  deleteAdminBlog: vi.fn(),
  listAdminBlogs: vi.fn(),
  saveAdminBlog: vi.fn(),
}));

vi.mock("@/lib/admin-projects", () => ({
  deleteAdminProject: vi.fn(),
  listAdminProjects: vi.fn(),
  saveAdminProject: vi.fn(),
}));

vi.mock("@/lib/blogs", () => ({
  emptyBlogForm: () => ({
    id: null,
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    coverImage: "",
    published: true,
    publishedAt: "",
  }),
  blogToFormValues: (blog: typeof existingBlog) => ({
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content ?? "",
    category: blog.category,
    tags: blog.tags.join(", "),
    coverImage: blog.cover_image ?? "",
    published: blog.published,
    publishedAt: blog.published_at ?? "",
  }),
  buildBlogPayload: (form: {
    id: string | null;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string;
    coverImage: string;
    published: boolean;
    publishedAt: string;
  }) => ({
    id: form.id ?? undefined,
    title: form.title,
    slug: form.slug,
    excerpt: form.excerpt,
    content: form.content,
    category: form.category,
    tags: form.tags ? form.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
    cover_image: form.coverImage || null,
    published: form.published,
    published_at: form.publishedAt || null,
  }),
}));

vi.mock("@/lib/projects", () => ({
  emptyProjectForm: () => ({
    id: null,
    title: "",
    slug: "",
    description: "",
    outcome: "",
    tags: "",
    coverImage: "",
    industry: "",
    content: "",
    published: true,
    displayOrder: 0,
  }),
  projectToFormValues: (project: typeof existingProject) => ({
    id: project.id,
    title: project.title,
    slug: project.slug,
    description: project.description,
    outcome: project.outcome,
    tags: project.tags.join(", "),
    coverImage: project.cover_image ?? "",
    industry: project.industry ?? "",
    content: project.content ?? "",
    published: project.published,
    displayOrder: project.display_order,
  }),
  buildProjectPayload: (form: {
    id: string | null;
    title: string;
    slug: string;
    description: string;
    outcome: string;
    tags: string;
    coverImage: string;
    industry: string;
    content: string;
    published: boolean;
    displayOrder: number;
  }) => ({
    id: form.id ?? undefined,
    title: form.title,
    slug: form.slug,
    description: form.description,
    outcome: form.outcome,
    tags: form.tags ? form.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
    cover_image: form.coverImage || null,
    industry: form.industry || null,
    content: form.content || null,
    published: form.published,
    display_order: form.displayOrder,
  }),
  slugify: (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
}));

const existingBlog = {
  id: "blog-1",
  title: "Existing Blog",
  slug: "existing-blog",
  excerpt: "Existing excerpt",
  content: "<p>Existing content</p>",
  category: "AI",
  tags: ["AI"],
  cover_image: null,
  published: true,
  published_at: "2026-03-23T12:00:00.000Z",
  created_at: "2026-03-23T12:00:00.000Z",
  updated_at: "2026-03-23T12:00:00.000Z",
};

const existingProject = {
  id: "project-1",
  title: "Existing Project",
  slug: "existing-project",
  description: "Existing description",
  outcome: "Existing outcome",
  tags: ["Ops"],
  cover_image: null,
  industry: "Operations",
  content: "<p>Existing content</p>",
  published: true,
  display_order: 1,
  created_at: "2026-03-23T12:00:00.000Z",
  updated_at: "2026-03-23T12:00:00.000Z",
};

describe("admin managers", () => {
  beforeEach(() => {
    mockUseQuery.mockReset();
    mockInvalidateQueries.mockReset();
  });

  it("keeps the blog form in create mode when clicking New with existing posts", async () => {
    mockUseQuery.mockReturnValue({
      data: [existingBlog],
      isLoading: false,
      error: null,
    });

    render(<AdminBlogsManager />);

    expect(await screen.findByRole("heading", { name: /edit blog post/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^new$/i }));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /create blog post/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/^title$/i)).toHaveValue("");
    });
  });

  it("keeps the project form in create mode when clicking New with existing projects", async () => {
    mockUseQuery.mockReturnValue({
      data: [existingProject],
      isLoading: false,
      error: null,
    });

    render(<AdminProjectsManager />);

    expect(await screen.findByRole("heading", { name: /edit project/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^new$/i }));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /create project/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/^title$/i)).toHaveValue("");
    });
  });
});
