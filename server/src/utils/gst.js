export const calculateInvoiceTotals = (items = [], intraState = true) => {
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.unitPrice - (item.discount || 0), 0);
  const totalTax = items.reduce((sum, item) => {
    const lineAmount = item.qty * item.unitPrice - (item.discount || 0);
    return sum + (lineAmount * (item.gstRate || 0)) / 100;
  }, 0);

  return {
    subtotal,
    cgst: intraState ? totalTax / 2 : 0,
    sgst: intraState ? totalTax / 2 : 0,
    igst: intraState ? 0 : totalTax,
    total: subtotal + totalTax
  };
};
