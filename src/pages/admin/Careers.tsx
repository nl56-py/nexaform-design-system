import AdminCareersManager from "@/components/admin/AdminCareersManager";

const AdminCareersPage = () => (
  <section className="space-y-6">
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl font-semibold text-foreground">Careers</h2>
      <p className="mt-2 text-sm leading-7 text-muted-foreground md:text-base">
        Post open positions and review job applications. Manage the hiring pipeline from submission
        to offer.
      </p>
    </div>
    <AdminCareersManager />
  </section>
);

export default AdminCareersPage;
