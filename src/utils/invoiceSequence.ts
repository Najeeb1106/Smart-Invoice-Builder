const SEQUENCE_KEY = 'smart_invoice_sequence_counter';

export const getNextSequenceNumber = (): number => {
  try {
    const saved = localStorage.getItem(SEQUENCE_KEY);
    const count = saved ? parseInt(saved, 10) : 1;
    return isNaN(count) ? 1 : count;
  } catch {
    return 1;
  }
};

export const incrementSequenceNumber = (): number => {
  try {
    const next = getNextSequenceNumber() + 1;
    localStorage.setItem(SEQUENCE_KEY, next.toString());
    return next;
  } catch {
    return 1;
  }
};

export const generateInvoiceNumber = (seqCount?: number): string => {
  const count = seqCount !== undefined ? seqCount : getNextSequenceNumber();
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const seq = String(count).padStart(3, '0');

  return `INV-${yyyy}${mm}${dd}-${seq}`;
};
