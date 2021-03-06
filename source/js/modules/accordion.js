const accordion = () => {
  const accordionList = document.querySelectorAll('.js-accordion');
  const createJsAccordion = (accordionItem) => {
    if (accordionItem) {
      const buttonList = accordionItem.querySelectorAll('.js-accordion__button');
      const content = accordionItem.querySelector('.js-accordion__content');
      const contentMore = accordionItem.querySelector('.js-accordion__content-more');
      const buttonShowMore = accordionItem.querySelector('.js-accordion__button-show-more');

      const getContentSize = (contentElement) => {
        return ({
          contentHeight: contentElement.scrollHeight,
          marginBottom: getComputedStyle(contentElement).marginBottom,
          marginTop: getComputedStyle(contentElement).marginTop,
        });
      };

      let mainContentSize = getContentSize(content);
      let secondContentSize = getContentSize(contentMore);

      const resetSizeContent = (contentElement) => {
        contentElement.style.height = 0;
        contentElement.style.marginBottom = 0;
        contentElement.style.marginTop = 0;
      };

      const setSizeContent = (contentElement, size, secondSize = 0) => {
        contentElement.style.height = `${size.contentHeight + secondSize}px`;
        contentElement.style.marginBottom = size.marginBottom;
        contentElement.style.marginTop = size.marginTop;
      };

      const isContentClose = () => {
        return content.classList.contains('js-accordion__content--close');
      };

      const isContentMoreClose = () => {
        return contentMore.classList.contains('js-accordion__content-more--close');
      };

      if (isContentClose()) {
        resetSizeContent(content);
      }

      if (isContentMoreClose()) {
        resetSizeContent(contentMore);
      }

      const closeSecondContent = () => {
        contentMore.classList.add('js-accordion__content-more--close');
        contentMore.classList.remove('js-accordion__content-more--open');
      };

      const openSecondContent = () => {
        contentMore.classList.add('js-accordion__content-more--open');
        contentMore.classList.remove('js-accordion__content-more--close');
      };

      const closeContent = () => {
        content.classList.add('js-accordion__content--close');
        content.classList.remove('js-accordion__content--open');
      };

      const openContent = () => {
        content.classList.add('js-accordion__content--open');
        content.classList.remove('js-accordion__content--close');
      };

      if (buttonShowMore) {
        buttonShowMore.addEventListener('click', (evt) => {
          evt.preventDefault();
          if (isContentMoreClose()) {
            openSecondContent();
            setSizeContent(content, mainContentSize, getContentSize(contentMore).contentHeight);
            setSizeContent(contentMore, secondContentSize);
            buttonShowMore.textContent = buttonShowMore.dataset.titleClose;
          } else {
            closeSecondContent();
            content.style.height = `${getContentSize(content).contentHeight - getContentSize(contentMore).contentHeight}px`;
            resetSizeContent(contentMore);
            buttonShowMore.textContent = buttonShowMore.dataset.titleOpen;
          }
        });
      }

      buttonList.forEach((button)=> {
        button.addEventListener('click', (evt) => {
          evt.preventDefault();
          if (isContentClose()) {
            if (contentMore.classList.contains('js-accordion__content-more--open')) {
              setSizeContent(content, mainContentSize, getContentSize(contentMore).contentHeight);
            } else {
              setSizeContent(content, mainContentSize);
            }
            openContent();
          } else {
            closeContent();
            resetSizeContent(content);
          }
        });
      });

      buttonShowMore.textContent = buttonShowMore.dataset.titleOpen;
    }
  };

  accordionList.forEach((item) => {
    createJsAccordion(item);
  });
};

export {accordion};
