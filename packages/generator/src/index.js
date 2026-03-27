export function generatePreview(input) {
  return {
    ok: true,
    input,
    createdAt: new Date().toISOString()
  };
}
