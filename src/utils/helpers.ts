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
  )