import AdminSeoCampaignDashboard from "@/components/admin/AdminSeoCampaignDashboard";

const AdminSeoCampaignPage = () => (
  <section className="space-y-6">
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl font-semibold text-foreground">SEO & Campaign</h2>
      <p className="mt-2 text-sm leading-7 text-muted-foreground md:text-base">
        Track free SEO/AEO/GEO audit requests and Digital Fairness campaign bookings from one
        operational dashboard.
      </p>
    </div>
    <AdminSeoCampaignDashboard />
  </section>
);

export default AdminSeoCampaignPage;
