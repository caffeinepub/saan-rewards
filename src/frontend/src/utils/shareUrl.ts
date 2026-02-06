/**
 * Returns a sanitized public share URL without any hash fragments or tokens.
 * This ensures admin tokens and other sensitive data are never included in shared links.
 * 
 * CRITICAL: This function must ALWAYS remove the hash fragment under ALL conditions
 * to prevent accidental exposure of caffeineAdminToken or other sensitive data.
 */
export function getSanitizedShareUrl(): string {
  const { protocol, host, pathname, search } = window.location;
  
  // Build URL without hash - explicitly exclude window.location.hash
  const baseUrl = `${protocol}//${host}${pathname}${search}`;
  
  // Double-check: ensure no hash is present (defense in depth)
  // This handles edge cases where search params might contain '#'
  const sanitized = baseUrl.split('#')[0];
  
  return sanitized;
}

/**
 * Returns a sanitized install deep-link URL with ?install=1 parameter.
 * This URL is safe to share and will trigger the install flow when opened.
 * Hash fragments are always removed to prevent token exposure.
 */
export function getInstallDeepLinkUrl(): string {
  const { protocol, host, pathname } = window.location;
  
  // Build clean URL with install parameter, explicitly excluding hash
  const baseUrl = `${protocol}//${host}${pathname}`;
  
  // Add install parameter
  const urlWithParam = `${baseUrl}?install=1`;
  
  // Double-check: ensure no hash is present (defense in depth)
  const sanitized = urlWithParam.split('#')[0];
  
  return sanitized;
}
