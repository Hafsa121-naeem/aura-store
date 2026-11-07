export function formatPrice(price: number): string {
  if (isNaN(price)) return 'Rs. 0';
  return `Rs. ${Math.round(price).toLocaleString('en-PK')}`;
}

export function formatDate(dateString: string): string {
  try {
    if (!dateString) return 'Nov 1, 2026';
    const cleanDate = dateString.split('T')[0];
    const [year, monthNum, day] = cleanDate.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[parseInt(monthNum, 10) - 1] || monthNum;
    return `${month} ${parseInt(day, 10)}, ${year}`;
  } catch {
    return dateString;
  }
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
