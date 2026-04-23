// Wait until DOM loads
document.addEventListener("DOMContentLoaded", () => {

    // =======================
    // SEARCH FUNCTIONALITY
    // =======================
    const searchBtn = document.querySelector(".search-btn");

    searchBtn.addEventListener("click", () => {
        const keyword = document.querySelectorAll(".search-input")[0].value.toLowerCase();
        const location = document.querySelectorAll(".search-input")[1].value.toLowerCase();
        const experience = document.querySelectorAll(".search-input")[2].value;

        const jobCards = document.querySelectorAll(".job-card");

        jobCards.forEach(card => {
            const title = card.querySelector(".job-title").innerText.toLowerCase();
            const meta = card.querySelector(".job-meta").innerText.toLowerCase();

            let match = true;

            if (keyword && !title.includes(keyword)) {
                match = false;
            }

            if (location && !meta.includes(location)) {
                match = false;
            }

            if (experience && !meta.includes(experience)) {
                match = false;
            }

            card.style.display = match ? "block" : "none";
        });
    });


    // =======================
    // APPLY BUTTON
    // =======================
    const applyButtons = document.querySelectorAll(".apply-btn");

    applyButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.innerText = "Applied ✓";
            btn.style.background = "green";
            btn.disabled = true;
        });
    });


    // =======================
    // LOGIN & REGISTER
    // =======================
    document.querySelector(".btn-login").addEventListener("click", () => {
        alert("Login feature coming soon. Relax.");
    });

    document.querySelector(".btn-register").addEventListener("click", () => {
        alert("Register feature coming soon. Don't rush.");
    });


    // =======================
    // CATEGORY CLICK FILTER
    // =======================
    const categories = document.querySelectorAll(".category-card");

    categories.forEach(cat => {
        cat.addEventListener("click", () => {
            const categoryText = cat.innerText.toLowerCase();

            document.querySelectorAll(".job-card").forEach(card => {
                const text = card.innerText.toLowerCase();

                if (text.includes(categoryText.split(" ")[0])) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });


    // =======================
    // FADE-IN ANIMATION
    // =======================
    const cards = document.querySelectorAll(".job-card, .category-card, .stat-box");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            }
        });
    });

    cards.forEach(card => observer.observe(card));

});