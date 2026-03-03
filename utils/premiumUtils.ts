export function parseAmount(text: string | null): number {
  if (!text) throw new Error('Amount text is null');
  return parseFloat(text.replace(/[^\d.]/g, ''));
}  