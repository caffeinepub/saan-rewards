/**
 * Returns a sanitized public share URL without any hash fragments or tokens.
 * This ensures admin tokens are never included in shared links.
 */
export function getSanitizedShareUrl(): string {
  const { protocol, host, pathname, search } = window.location;
  // Explicitly exclude hash to remove any caffeineAdminToken or other fragments
  // Strip any hash fragment under all conditions
  const url = `${protocol}//${host}${pathname}${search}`;
  // Double-check: ensure no hash is present
  return url.split('#')[0];
}
