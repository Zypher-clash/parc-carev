/* =========================================================
   PARC CAREV — MAIN JAVASCRIPT
   Navigation / Loader / Scroll / Mobile
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01 — LOADER
    ===================================================== */

    const loader = document.getElementById("loader");

    if (loader) {

        window.addEventListener("load", () => {

            setTimeout(() => {
                loader.classList.add("hidden");
            }, 700);

        });

    }


    /* =====================================================
       02 — NAVBAR AU SCROLL
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* =====================================================
       03 — MENU MOBILE
    ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

            const isOpen =
                mobileMenu.classList.contains("active");

            menuButton.textContent =
                isOpen ? "✕" : "☰";

        });


        /* Fermer le menu lorsqu'on clique sur un lien */

        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                menuButton.textContent = "☰";

            });

        });

    }


    /* =====================================================
       04 — ANIMATION AU SCROLL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".service-card, .intro-content, .section-heading, .experience-box, .reservation-content, .contact-item"
        );

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =====================================================
       05 — SMOOTH SCROLL
    ===================================================== */

    const anchors =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchors.forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId =
                anchor.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       06 — EFFET MAGNETIC SUR LES BOUTONS
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".primary-button, .secondary-button"
        );


    magneticButtons.forEach(button => {

        button.addEventListener("mousemove", event => {

            if (window.innerWidth < 768) return;

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const moveX =
                (x - rect.width / 2) * 0.08;

            const moveY =
                (y - rect.height / 2) * 0.08;

            button.style.transform =
                `translate(${moveX}px, ${moveY}px)`;

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });


    /* =====================================================
       07 — PARALLAX LÉGER
    ===================================================== */

    const glows =
        document.querySelectorAll(".hero-glow");


    window.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 768) return;

            const x =
                (event.clientX / window.innerWidth - 0.5);

            const y =
                (event.clientY / window.innerHeight - 0.5);


            glows.forEach((glow, index) => {

                const strength =
                    index === 0 ? 20 : -15;

                glow.style.transform =
                    `translate(
                        ${x * strength}px,
                        ${y * strength}px
                    )`;

            });

        }
    );


    /* =====================================================
       08 — FERMER LE MENU AVEC ESC
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        if (!mobileMenu) return;

        mobileMenu.classList.remove("active");

        if (menuButton) {
            menuButton.textContent = "☰";
        }

    });


    /* =====================================================
       09 — MESSAGE DE DÉMARRAGE
    ===================================================== */

    console.log(
        "%c PARC CAREV ",
        "background:#35e8ff;color:#05070d;font-size:18px;font-weight:bold;padding:8px;"
    );

    console.log(
        "Interface Parc Carev initialisée."
    );

});

/* =========================================================
   SCROLL REVEAL
   ========================================================= */

.reveal {
    opacity: 0;
    transform: translateY(35px);
    transition:
        opacity 900ms ease,
        transform 900ms cubic-bezier(.2,.8,.2,1);
}

.reveal.revealed {
    opacity: 1;
    transform: translateY(0);
                          }
