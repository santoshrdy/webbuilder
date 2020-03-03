

const initialize = () => {
    const scrollIntersections = document.querySelectorAll(`.button`);

    // ,[class="button"],[class^="scroll-"]

    const callback: IntersectionObserverCallback = (entries, observer) => {
        console.log(entries);

        entries.forEach(entry => {
            // cases: once, while-in-view, while-meets-scroll-position

            if (!entry.isIntersecting) {
                return;
            }

            const classes = Array.prototype.slice.call(entry.target.classList);
            // const scrollPointerClass = classes.find(c => c.startsWith("scroll-"));

            const scrollClass = classes.find(c => c === "button");

            if (scrollClass) {
                entry.target.classList.add("scroll-active");
            }
        });
    };

    const observer = new IntersectionObserver(callback, {
        root: null,
        rootMargin: "0px",
        threshold: 0.25
    });

    scrollIntersections.forEach(x => {
        observer.observe(x);
        console.log(x);
    });
};

setTimeout(initialize, 500);

