const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const logoXI = $(".header-right");
const header = $(".header");
const footer = $(".footer");

if (logoXI) {
    logoXI.onclick = () => (window.location.href = "./index.html");
}

window.onscroll = function (e) {
    const scrollTop = document.body.scrollTop || window.scrollY;
    if (scrollTop > 60) {
        header.classList.add("hide");
        footer.classList.add("hide");
    } else {
        header.classList.remove("hide");
        footer.classList.remove("hide");
    }
};

