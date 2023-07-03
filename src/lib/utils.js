
import toast from "react-hot-toast";

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



export function notify(message, position) {
  toast(message, {
    className: "w-full",
    duration: 5000,
    position: position
  });
}

export const djangoToReactTypes = {
  charfield: "text",
  textfield: "textarea",
  emailfield: "email",
  integerfield: "number",
  positiveintegerfield: "number",
  decimalfield: "number",
  booleanfield: "checkbox",
  datefield: "date",
  datetimefield: "datetime-local",
  filefield: "file",
  imagefield: "file",
  urlfield: "url",
  CharField: "text",
  TextField: "textarea",
  EmailField: "email",
  IntegerField: "number",
  PositiveIntegerField: "number",
  DecimalField: "number",
  BooleanField: "checkbox",
  DateField: "date",
  DateTimeField: "datetime-local",
  FileField: "file",
  ImageField: "file",
  UrlField: "url",
};


export function formatTimestamp(created_at) {
  const now = new Date();
  const timestamp = new Date(created_at);

  const secondsDiff = Math.floor((now - timestamp) / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);
  const weeksDiff = Math.floor(daysDiff / 7);
  const monthsDiff = Math.floor(daysDiff / 30);
  const yearsDiff = Math.floor(daysDiff / 365);

  if (secondsDiff < 60) {
    return `${secondsDiff} seconds ago`;
  } else if (minutesDiff < 60) {
    return `${minutesDiff} minutes ago`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff} hours ago`;
  } else if (daysDiff < 7) {
    return `${daysDiff} days ago`;
  } else if (weeksDiff < 4) {
    return `${weeksDiff} weeks ago`;
  } else if (monthsDiff < 4) {
    return `${monthsDiff} months ago`;
  } else {
    return `${yearsDiff} years ago`;
  }
}

