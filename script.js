/* Affinity Steps — interactions */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const header = document.getElementById("header");
    const backToTop = document.getElementById("backToTop");
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mobile navigation
    if (menuToggle && navLinks) {
        const closeMenu = () => {
            navLinks.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
        };
        menuToggle.addEventListener("click", () => {
            const open = navLinks.classList.toggle("show");
            menuToggle.setAttribute("aria-expanded", String(open));
            menuToggle.innerHTML = open
                ? '<i class="fas fa-times" aria-hidden="true"></i>'
                : '<i class="fas fa-bars" aria-hidden="true"></i>';
        });
        navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeMenu();
        });
    }

    // Sticky header and back-to-top state
    const updateScrollUI = () => {
        if (header) header.classList.toggle("scrolled", window.scrollY > 30);
        if (backToTop) backToTop.classList.toggle("show", window.scrollY > 400);
    };
    window.addEventListener("scroll", updateScrollUI, { passive: true });
    updateScrollUI();

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
        });
    }

    // Reveal on scroll (show everything if IntersectionObserver is unavailable).
    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reducedMotion) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealElements.forEach(element => revealObserver.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add("active"));
    }

    // Accessible single-open FAQ accordion.
    document.querySelectorAll(".faq-item").forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        if (!question || !answer) return;
        question.setAttribute("aria-expanded", "false");
        question.addEventListener("click", () => {
            const shouldOpen = !item.classList.contains("open");
            document.querySelectorAll(".faq-item").forEach(other => {
                other.classList.remove("open");
                const otherAnswer = other.querySelector(".faq-answer");
                const otherQuestion = other.querySelector(".faq-question");
                if (otherAnswer) otherAnswer.style.maxHeight = null;
                if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
            });
            if (shouldOpen) {
                item.classList.add("open");
                question.setAttribute("aria-expanded", "true");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Active navigation link.
    const navItems = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id]");
    if ("IntersectionObserver" in window && navItems.length) {
        const navObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                navItems.forEach(link => {
                    link.classList.toggle("active-link", link.getAttribute("href") === "#" + entry.target.id);
                });
            });
        }, { rootMargin: "-28% 0px -62% 0px" });
        sections.forEach(section => navObserver.observe(section));
    }

    // Carry employer/candidate intent into the enquiry form.
    document.querySelectorAll("[data-interest]").forEach(link => {
        link.addEventListener("click", () => {
            const subject = document.getElementById("subject");
            if (subject) subject.value = link.dataset.interest;
        });
    });

    // Front-end validation only. No enquiry is claimed to be sent.
    if (contactForm && formMessage) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();
            const name = document.getElementById("name")?.value.trim() || "";
            const email = document.getElementById("email")?.value.trim() || "";
            const subject = document.getElementById("subject")?.value || "";
            const message = document.getElementById("message")?.value.trim() || "";
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !subject || !message) {
                formMessage.style.color = "#B91C1C";
                formMessage.textContent = "Please complete all fields before submitting.";
                return;
            }
            if (!emailPattern.test(email)) {
                formMessage.style.color = "#B91C1C";
                formMessage.textContent = "Please enter a valid email address.";
                return;
            }
            formMessage.style.color = "#0F766E";
            formMessage.textContent = "The form is not connected yet, so your enquiry has not been sent. Please do not enter confidential information.";
        });
    }

    // Current year
    const copyright = document.querySelector(".footer-bottom p");
    if (copyright) copyright.textContent = `© ${new Date().getFullYear()} Affinity Steps. All Rights Reserved.`;

    console.log("Affinity Steps landing page ready.");
});
