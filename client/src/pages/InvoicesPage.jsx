import { useQuery } from '@tanstack/react-query';
import { fetchInvoices } from '../features/invoices/invoiceApi';

export default function InvoicesPage() {
  const { data } = useQuery({ queryKey: ['invoices'], queryFn: fetchInvoices });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr><th className="p-3">Invoice #</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {data?.map((inv) => (
              <tr key={inv._id} className="border-t">
                <td className="p-3">{inv.invoiceNumber}</td>
                <td>₹{inv.total}</td>
                <td className="capitalize">{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
