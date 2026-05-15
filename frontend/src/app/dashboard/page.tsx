export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border">Jobs</div>

        <div className="bg-white p-4 rounded-xl border">Customers</div>

        <div className="bg-white p-4 rounded-xl border">Invoices</div>
      </div>
    </div>
  );
}
