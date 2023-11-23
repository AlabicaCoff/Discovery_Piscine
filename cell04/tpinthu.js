function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function goToFunction(target) {
    let wrapper = document.querySelector(".wrapper");
    wrapper.scrollTop = target;
    document.documentElement.scrollTop = target;
}