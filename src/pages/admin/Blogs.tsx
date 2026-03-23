import AdminBlogsManager from "@/components/admin/AdminBlogsManager";

const AdminBlogsPage = () => (
  <section className="space-y-6">
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl font-semibold text-foreground">Blogs</h2>
      <p className="mt-2 text-sm leading-7 text-muted-foreground md:text-base">
        Manage published and draft articles that appear in the public blog sections.
      </p>
    </div>
    <AdminBlogsManager />
  </section>
);

export default AdminBlogsPage;
