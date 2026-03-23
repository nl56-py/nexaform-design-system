import AdminProjectsManager from "@/components/admin/AdminProjectsManager";

const AdminProjectsPage = () => (
  <section className="space-y-6">
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl font-semibold text-foreground">Projects</h2>
      <p className="mt-2 text-sm leading-7 text-muted-foreground md:text-base">
        Control the project records used on the homepage and the main projects page.
      </p>
    </div>
    <AdminProjectsManager />
  </section>
);

export default AdminProjectsPage;
