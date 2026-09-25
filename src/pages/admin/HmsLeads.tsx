import AdminHmsLeadsManager from "@/components/admin/AdminHmsLeadsManager";

const AdminHmsLeadsPage = () => (
  <section className="space-y-6">
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl font-semibold text-foreground">
        HMS (Hostel Management System) Leads
      </h2>
      <p className="mt-2 text-sm leading-7 text-muted-foreground md:text-base">
        Manage outreach, product demos, and SaaS sales pipeline for 190+ hostels across Kathmandu Valley.
        Filter by gender type, review scores, area clusters, and direct contact channels.
      </p>
    </div>
    <AdminHmsLeadsManager />
  </section>
);

export default AdminHmsLeadsPage;
