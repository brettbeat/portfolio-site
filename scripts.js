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
        emailjs.sendForm("service_tbwngak", "template_by6e0md", contactForm, "rMZoh61VyIBaV_BEh")
            .then(() => {
                console.log("Email sent successfully");
                showEmailDialog();
            }, 
            (error) => {
                console.log("Email send failure", error);
            });
    }); 
}

function showEmailDialog() {
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("message").value = "";
    let dialog = document.getElementById("dialog");
    let dialogChildren = dialog.querySelectorAll("*");
    dialogChildren[1].onclick = (event) => {dialog.close();};
    dialog.showModal(); 
}