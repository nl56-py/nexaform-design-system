import AdminProjectsManager from "@/components/admin/AdminProjectsManager";

const AdminProjectsPage = () => (
  <section className="space-y-6">
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl font-semibold text-foreground">Projects</h2>
      <p className="mt-2 text-sm leading-7 text-muted-foreground md:text-base">
        Control project records with richer case-study content, image uploads, and publishing controls.
      </p>
    </div>
    <AdminProjectsManager />
  </section>
);

export default AdminProjectsPage;
