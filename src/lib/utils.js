
export function cn(...inputs) {
    const classes = inputs.filter((input) => input != null && input !== false);
    return classes.join(" ");
  }
  
  export function absoluteUrl(path) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
  }