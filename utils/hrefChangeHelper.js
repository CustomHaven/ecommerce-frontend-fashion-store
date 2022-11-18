export const watchHrefChange = (href, setHref, element, selector) => {
    const bodyList = document.querySelector("body")

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (href != document.location.href) {
                setHref(document.location.href);
                element.current = document.querySelector(selector);
            }
        });
    });

    const config = {
        childList: true,
        subtree: true
    };

    observer.observe(bodyList, config);

    return element.current;
};