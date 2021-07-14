const accordion = () => {
  const accordionElement = document.querySelector('.js-accordion');
  if (accordionElement) {
    const button = accordionElement.querySelector('.js-accordion__button');
    const content = accordionElement.querySelector('.js-accordion__content');

    const contentHeight = getComputedStyle(content).height;
    const marginBottom = getComputedStyle(content).marginBottom;
    const marginTop = getComputedStyle(content).marginTop;

    const resetSizeContent = () => {
      content.style.height = 0;
      content.style.marginBottom = 0;
      content.style.marginTop = 0;
    };

    const setSizeContent = () => {
      content.style.height = contentHeight;
      content.style.marginBottom = marginBottom;
      content.style.marginTop = marginTop;
    };

    setSizeContent();

    if (content.classList.contains('js-accordion__content--close')) {
      resetSizeContent();
    }

    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (content.classList.contains('js-accordion__content--close')) {
        content.classList.add('js-accordion__content--open');
        content.classList.remove('js-accordion__content--close');
        setSizeContent();
      } else {
        content.classList.add('js-accordion__content--close');
        content.classList.remove('js-accordion__content--open');
        resetSizeContent();
      }
    });
  }
};

export {accordion};
