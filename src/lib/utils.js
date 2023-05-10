
export function cn(...inputs) {
    const classes = inputs.filter((input) => input != null && input !== false);
    return classes.join(" ");
  }
  
  export function absoluteUrl(path) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
  }

export const popupStyles = (element) => {
  element.style.position = "fixed";
  document.body.style.position = "relative";
  element.style.top = "35%";
  element.style.left = "30%";
  element.style.transform = "translate(-50%, -50%)";
  element.style.width = "max-content";
  element.style.height = "max-content";
  element.style.padding = "40px 60px 40px 60px";
  element.style.display = "block";
  element.style.justifyContent = "center";
  element.style.alignItems = "center";
  element.style.backgroundColor = "rgb(247, 250, 228)";
  element.style.transform = "translate(-50%, -50%)";
  element.style.boxShadow = "0 7px 100px 0 rgba(0,0,0,.40)";
  element.style.borderRadius = "4px";
  element.style.zIndex = "1000";
}

