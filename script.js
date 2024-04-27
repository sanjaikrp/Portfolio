function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function makeCall(phoneNumber) {
    window.location.href = "tel:" + phoneNumber;
}

document.getElementById("callLink").addEventListener("click", function(event) {
    event.preventDefault();
    makeCall("+916382064949"); 
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("slide");
    if (n > slides.length) { 
        slideIndex = 1;
    }
    if (n < 1) { 
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    slides[slideIndex - 1].style.display = "block";
}

let volunteeringSlideIndex = 1;
showvolunteeringSlides(volunteeringSlideIndex);

function plusvolunteeringSlides(n) {
    showvolunteeringSlides(volunteeringSlideIndex += n);
}

function currentvolunteeringSlide(n) {
    showvolunteeringSlides(volunteeringSlideIndex = n);
}

function showvolunteeringSlides(n) {
    let i;
    const volunteeringSlides = document.getElementsByClassName("volunteeringSlide");
    if (n > volunteeringSlides.length) { 
        volunteeringSlideIndex = 1;
    }
    if (n < 1) { 
        volunteeringSlideIndex = volunteeringSlides.length;
    }
    for (i = 0; i < volunteeringSlides.length; i++) {
        volunteeringSlides[i].style.display = "none"; 
    }
    volunteeringSlides[volunteeringSlideIndex - 1].style.display = "block";
}