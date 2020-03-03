const scrollIntersections = document.querySelectorAll(`[class="scroll"],[class^="scroll-"]`);

const callback: IntersectionObserverCallback = (entries, observer) => {
    console.log(entries);

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // cases: once, while-in-view, while-meets-scroll-position
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

    // const classes = Array.prototype.slice.call(x.classList);
    // const scrollPointerClass = classes.find(c => c.startsWith("scroll-"));



    // const scrollClass = classes.find(c => c.startsWith("scroll"));
    // if (scrollClass) {

    // }

});