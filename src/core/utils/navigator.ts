export async function copyToClipboard(text: string) {
  if (!navigator.clipboard) throw new Error("Clipboard unavailable");
  return navigator.clipboard.writeText(text);
}
