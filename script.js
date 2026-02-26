const navBarToggle = document.querySelector(".navBar-toggle");
const navBarMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const allImages = document.querySelectorAll("main img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = 0;
let visibleImages = [];


navBarToggle.addEventListener("click",()=>{
    navBarToggle.classList.toggle("active");
    navBarMenu.classList.toggle("active");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");
    });
});

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const filter = link.getAttribute("data-filter");
        navLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");

        if (filter === "all") {
            allImages.forEach(img => {
                img.style.display = "";
            });
        } else {
            allImages.forEach(img => {
                if (img.classList.contains(filter)) {
                    img.style.display = "";
                } else {
                    img.style.display = "none";
                }
            });
        }
        navBarToggle.classList.remove("active");
        navBarMenu.classList.remove("active");
    });
});



allImages.forEach((img, index) => {
    img.addEventListener("click", () => {

        visibleImages = Array.from(allImages).filter(
    image => window.getComputedStyle(image).display !== "none"
);

        currentIndex = visibleImages.indexOf(img);

        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});


nextBtn.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0; // loop back
    }

    lightboxImg.src = visibleImages[currentIndex].src;
});

prevBtn.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    lightboxImg.src = visibleImages[currentIndex].src;
});

document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {

        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "Escape") lightbox.style.display = "none";
    }
});