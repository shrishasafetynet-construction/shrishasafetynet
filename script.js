/* ===========================
pre loader
=========================== */







/* navbar  */
const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
});



/* hero Section */

window.addEventListener("load", () => {

    const content = document.querySelector(".hero-content");

    content.style.opacity = "0";

    setTimeout(() => {
        content.style.opacity = "1";
        content.style.transition = "1s ease";
    }, 200);

});

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {

    const linkPage = link.getAttribute("href");

    if(linkPage === currentPage){
        link.classList.add("active");
    }

});



/* counter Section */
const counters = document.querySelectorAll('.counter');

const startCounter = () => {

    counters.forEach(counter => {

        const target = +counter.getAttribute('data-target');

        let count = 0;

        const updateCounter = () => {

            const increment = target / 100;

            if(count < target){

                count += increment;

                counter.innerText = Math.ceil(count);

                setTimeout(updateCounter, 20);

            }else{

                if(target === 100){
    counter.innerText = target + "%";
}else{
    counter.innerText = target + "+";
}

            }

        }

        updateCounter();

    });

};

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            startCounter();

            observer.disconnect();

        }

    });

});

observer.observe(document.querySelector('.counter-section'));


const cards = document.querySelectorAll(".service-card");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.borderColor = "#f57c00";
    });

    card.addEventListener("mouseleave", () => {
        card.style.borderColor = "#e7e7e7";
    });
});


/* products Section */
const productCards = document.querySelectorAll(".products-card");

productCards.forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.style.borderColor = "#ff7a00";
    });

    card.addEventListener("mouseleave", () => {

        if(!card.classList.contains("active-card")){
            card.style.borderColor = "#e6e6e6";
        }

    });

});




/* projects Section */
const viewProjectsBtn = document.getElementById("viewProjectsBtn");

viewProjectsBtn.addEventListener("click", function () {
  window.location.href = "project.html";
});


/* contact Section */
const callBtn = document.getElementById("callBtn");

callBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const callConfirm = confirm("Do you want to call +91 84249 10995?");

  if (callConfirm) {
    window.location.href = "tel:+918424910995";
  }
});


/* floating WhatsApp Button */
  document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll(".ss-floating-btn");

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        var currentButton = this;

        currentButton.classList.add("clicked");

        setTimeout(function () {
          currentButton.classList.remove("clicked");
        }, 200);
      });
    }
  });




/* footer Section */
const footerCallLink = document.getElementById("footerCallLink");

footerCallLink.addEventListener("click", function (e) {
  e.preventDefault();

  const confirmCall = confirm("Do you want to call +91 84249 10995?");

  if (confirmCall) {
    window.location.href = "tel:+918424910995";
  }
});









/* projects Page */
window.addEventListener("load", () => {
    document.querySelector(".hero-content").classList.add("show");
});





/* about Section */
document.addEventListener("DOMContentLoaded", () => {

    const heroContent =
    document.querySelector(".about-hero-content");

    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(40px)";

    setTimeout(() => {

        heroContent.style.transition =
        "all .8s ease";

        heroContent.style.opacity = "1";

        heroContent.style.transform =
        "translateY(0)";

    }, 200);

});



/* about main Section  */
document.addEventListener("DOMContentLoaded", () => {

    const storySection =
    document.querySelector(".story-sec-wrapper");

    storySection.style.opacity = "0";
    storySection.style.transform = "translateY(40px)";

    setTimeout(() => {

        storySection.style.transition =
        "all .8s ease";

        storySection.style.opacity = "1";
        storySection.style.transform =
        "translateY(0)";

    },200);

});



/* call to action Section */
document.addEventListener("DOMContentLoaded",()=>{

const cards =
document.querySelectorAll(".sns-value-card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.borderColor="#ff7b00";

});

card.addEventListener("mouseleave",()=>{

card.style.borderColor="#e5e5e5";

});

});

});

/* call to action Section 2 */
  document.addEventListener("DOMContentLoaded", function () {
    var ctaBtn = document.getElementById("scsAboutCtaBtn");

    if (!ctaBtn) return;

    ctaBtn.addEventListener("click", function () {
      ctaBtn.classList.add("scsAboutCta-clicked");

      setTimeout(function () {
        ctaBtn.classList.remove("scsAboutCta-clicked");
      }, 220);
    });
  });

/* ===========================
estimate
=========================== */
  (function () {
    document.addEventListener("DOMContentLoaded", function () {
      var form = document.getElementById("scsQpForm");
      var submitBtn = form ? form.querySelector(".scsQp-submit") : null;

      if (!form || !submitBtn) return;

      submitBtn.addEventListener("click", function () {
        submitBtn.classList.add("scsQp-clicked");

        setTimeout(function () {
          submitBtn.classList.remove("scsQp-clicked");
        }, 220);
      });

      form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        var name = document.getElementById("scsQpName").value.trim();
        var phone = document.getElementById("scsQpPhone").value.trim();
        var email = document.getElementById("scsQpEmail").value.trim();
        var service = document.getElementById("scsQpService").value.trim();
        var location = document.getElementById("scsQpLocation").value.trim();
        var message = document.getElementById("scsQpMessage").value.trim();

        var whatsappNumber = "918424910995";

        var finalMessage =
          "Hello Shrisha Construction & Safety Net,\n" +
          "I want to request a free quote.\n\n" +
          "Full Name: " + name + "\n" +
          "Phone Number: " + phone + "\n" +
          "Email: " + (email || "Not provided") + "\n" +
          "Service Required: " + service + "\n" +
          "Project Location: " + (location || "Not provided") + "\n" +
          "Message: " + (message || "Please contact me with more details.") + "\n\n" +
          "Thank you.";

        var whatsappUrl =
          "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(finalMessage);

        window.open(whatsappUrl, "_blank");
      });
    });
  })();
   

  
  
/* ===========================
product card enquire
=========================== */ 
 
 document.addEventListener("DOMContentLoaded",()=>{

    const cards =
    document.querySelectorAll(".sn-product-card");

    const observer =
    new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{threshold:.15});

    cards.forEach((card,index)=>{

        card.style.transition =
        `all .6s ease ${index * 0.1}s`;

        observer.observe(card);

    });

});


/* ===========================
service hero section 
=========================== */ 
