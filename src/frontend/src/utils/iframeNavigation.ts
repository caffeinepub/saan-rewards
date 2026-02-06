/**
 * Utility for iframe-safe navigation with fallback handling.
 * Detects embedded contexts and navigates the top-level window when needed.
 */

/**
 * Checks if the current window is embedded in an iframe.
 * Handles cross-origin access failures gracefully.
 */
export function isEmbedded(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    // Cross-origin access denied means we're embedded
    return true;
  }
}

/**
 * Attempts to navigate to a URL using the appropriate method based on context.
 * Returns true if navigation was initiated successfully, false otherwise.
 * 
 * @param url - The URL to navigate to
 * @returns Promise<boolean> - true if navigation succeeded, false if it failed
 */
export async function navigateSafely(url: string): Promise<boolean> {
  try {
    if (isEmbedded()) {
      // When embedded, navigate the top-level window
      try {
        window.top!.location.href = url;
        return true;
      } catch {
        // Cross-origin restriction - fallback failed
        return false;
      }
    } else {
      // Normal context - navigate current window
      window.location.href = url;
      return true;
    }
  } catch {
    return false;
  }
}

/**
 * Opens a URL in a new tab/window with security attributes.
 * Returns true if the window was opened successfully.
 * 
 * @param url - The URL to open
 * @returns boolean - true if window opened, false if blocked
 */
export function openInNewTab(url: string): boolean {
  try {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    return newWindow !== null;
  } catch {
    return false;
  }
}
