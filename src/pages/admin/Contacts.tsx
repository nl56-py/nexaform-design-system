import AdminContactsManager from "@/components/admin/AdminContactsManager";

const AdminContactsPage = () => (
  <section className="space-y-6">
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl font-semibold text-foreground">Contacts</h2>
      <p className="mt-2 text-sm leading-7 text-muted-foreground md:text-base">
        Review leads submitted through the contact form and update follow-up status.
      </p>
    </div>
    <AdminContactsManager />
  </section>
);

export default AdminContactsPage;
