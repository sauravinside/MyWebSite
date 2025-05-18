// Format date to readable string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Generate random ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Debounce function
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

// Throttle function
export const throttle = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastExecuted = 0;

  return (...args: Parameters<F>): void => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecuted;

    if (timeSinceLastExecution >= waitFor) {
      func(...args);
      lastExecuted = now;
    } else if (timeout === null) {
      timeout = setTimeout(() => {
        func(...args);
        lastExecuted = Date.now();
        timeout = null;
      }, waitFor - timeSinceLastExecution);
    }
  };
};

// Get viewport size
export const getViewportSize = (): { width: number; height: number } => {
  if (typeof window !== 'undefined') {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  return { width: 0, height: 0 };
};

// Check if element is in viewport
export const isInViewport = (element: HTMLElement, offset: number = 0): boolean => {
  if (typeof window !== 'undefined') {
    const rect = element.getBoundingClientRect();
    return (
      rect.top + offset < window.innerHeight &&
      rect.left < window.innerWidth &&
      rect.bottom > 0 &&
      rect.right > 0
    );
  }
  return false;
};

// Copy text to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Failed to copy text: ', error);
      return false;
    }
  }
  return false;
};
