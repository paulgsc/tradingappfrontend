
export const centerScreenPopUp = (id) => {
    const element = document.getElementById(id);
    element.style.position = "fixed";
    element.style.top = "50%";
    element.style.left = "50%";
    element.style.transform = "translate(-50%, -50%)";
    element.style.width = "35vw";
    element.style.height = "60vh";
    element.style.padding = "40px 60px 40px 60px";
    element.style.display = "flex";
    element.style.flexDirection = "column";
    element.style.justifyContent = "center";
    element.style.alignItems = "center";
    element.style.backgroundColor = "rgb(250, 250, 250)";
    element.style.transform = "translate(-50%, -50%)";
    element.style.boxShadow = "0 7px 100px 0 rgba(0,0,0,.40)";
    element.style.borderRadius = "4px";
    element.style.zIndex = "calc(var(--max-z-index) + 100)";
}