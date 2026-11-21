
/* =====================================
   1. MOBILE NAVIGATION
===================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("show");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';

});

// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

    });

});


/* =====================================
   2. STICKY NAVBAR SHADOW
===================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =====================================
   3. SCROLL REVEAL ANIMATION
===================================== */

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("active");
    });

}


/* =====================================
   4. ANIMATED STATISTICS COUNTER
===================================== */

const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {

    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";

    const duration = 1800;
    const startTime = performance.now();

    function updateCounter(currentTime) {

        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = 1 - Math.pow(1 - progress, 3);

        const currentValue = Math.floor(
            easedProgress * target
        );

        counter.textContent = currentValue + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target + suffix;
        }

    }

    requestAnimationFrame(updateCounter);

}

if ("IntersectionObserver" in window && !prefersReducedMotion) {

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateCounter(entry.target);

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.5
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

} else {

    counters.forEach(counter => {
        counter.textContent =
            counter.dataset.target + (counter.dataset.suffix || "");
    });

}


/* =====================================
   5. FAQ ACCORDION
===================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.setAttribute("aria-expanded", "false");

    question.addEventListener("click", () => {

        const isOpen = item.classList.contains("open");

        // Close all other FAQ items

        faqItems.forEach(otherItem => {

            otherItem.classList.remove("open");

            otherItem.querySelector(".faq-answer").style.maxHeight = null;

            otherItem.querySelector(".faq-question")
                .setAttribute("aria-expanded", "false");

        });

        // Open selected item

        if (!isOpen) {

            item.classList.add("open");

            question.setAttribute("aria-expanded", "true");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/* =====================================
   6. ACTIVE NAVIGATION LINK
===================================== */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const currentId = entry.target.id;

                navItems.forEach(link => {

                    link.classList.toggle(
                        "active-link",
                        link.getAttribute("href") === "#" + currentId
                    );

                });

            }

        });

    },
    {
        rootMargin: "-25% 0px -65% 0px"
    }
);

sections.forEach(section => {
    navObserver.observe(section);
});


/* =====================================
   7. BACK TO TOP BUTTON
===================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================
   8. CONTACT FORM VALIDATION
===================================== */

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const subject = document.getElementById("subject").value.trim();

    const message = document.getElementById("message").value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {

        formMessage.style.color = "#dc2626";

        formMessage.textContent =
            "Please fill in all the fields.";

        return;

    }

    if (!emailPattern.test(email)) {

        formMessage.style.color = "#dc2626";

        formMessage.textContent =
            "Please enter a valid email address.";

        return;

    }

    formMessage.style.color = "#15803d";

    formMessage.textContent =
        "Form validated successfully! Connect a backend to send your enquiry.";

    contactForm.reset();

});


/* =====================================
   9. CURRENT YEAR
===================================== */

const copyright = document.querySelector(".footer-bottom p");

if (copyright) {

    copyright.textContent =
        `© ${new Date().getFullYear()} Affinity Steps. All Rights Reserved.`;

}


/* =====================================
   10. CONSOLE MESSAGE
===================================== */

console.log("Affinity Steps Landing Page Loaded Successfully!");
