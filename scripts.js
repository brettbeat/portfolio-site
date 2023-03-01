export function stickyNav(navbarOffset, colorBarHeight) {
    const navbar = document.querySelector("header");
    if(window.pageYOffset+colorBarHeight >= navbarOffset) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

export function sendEmail() {
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        contactForm.contact_number.value = Math.random() * 100000 | 0;
        console.log(contactForm.contact_number.value);
        emailjs.sendForm("service_tbwngak", "template_by6e0md", contactForm, "rMZoh61VyIBaV_BEh")
            .then(() => {console.log("Email sent successfully");}, (error) => {console.log("Email send failure", error);});
    });
}