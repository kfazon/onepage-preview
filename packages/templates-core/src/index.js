export const TEMPLATE_VERSION = '0.1.0';

export function normalizeTemplate(data) {
  return {
    version: TEMPLATE_VERSION,
    ...data
  };
}
