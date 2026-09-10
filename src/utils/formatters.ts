/**
 * Mengubah string tanggal ISO (contoh: "2026-09-01") menjadi format bahasa Indonesia
 * Contoh output: "1 September 2026"
 */
export function formatIndonesianDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
}
