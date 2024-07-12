class Carousel {
  constructor(carouselContainer) {
    this.imageContainer = carouselContainer.querySelector('.images-container');

    const dotsContainer = carouselContainer.querySelector('.carousel-dots');
    const imageEls = carouselContainer.querySelectorAll('.carousel img');
    this.images = [];

    for (const imageEl of imageEls) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dotsContainer.appendChild(dot);

      dot.addEventListener('click', (e) => {
        const clickedIndex = this.images.findIndex(
          (image) => image.correspondingDot === dot
        );
        const currentImage = this.images.find((image) => image.isCurrent);
        currentImage.isCurrent = false;
        this.images[clickedIndex].isCurrent = true;
        this.slideToCurrent();
      });

      this.images.push({
        isCurrent: false,
        image: imageEl,
        correspondingDot: dot,
      });
    }

    this.images[0].isCurrent = true;
    this.updateDots();

    this.imageWidth = carouselContainer
      .querySelector('.window')
      .getBoundingClientRect().width;

    const leftArrow = carouselContainer.querySelector('.left-arrow');
    leftArrow.addEventListener('click', () => {
      this.slideLeft();
    });

    const rightArrow = carouselContainer.querySelector('.right-arrow');
    rightArrow.addEventListener('click', () => {
      this.slideRight();
    });

    setInterval(() => {
      this.slideRight();
    }, 5000);
  }

  slideRight() {
    if (this.images[this.images.length - 1].isCurrent) {
      this.images[this.images.length - 1].isCurrent = false;
      this.images[0].isCurrent = true;
    } else {
      const currentIndex = this.images.findIndex((image) => image.isCurrent);
      this.images[currentIndex].isCurrent = false;
      const newCurrentIndex = currentIndex + 1;
      this.images[newCurrentIndex].isCurrent = true;
    }

    this.slideToCurrent();
  }

  slideLeft() {
    if (this.images[0].isCurrent) {
      this.images[0].isCurrent = false;
      this.images[this.images.length - 1].isCurrent = true;
    } else {
      const currentIndex = this.images.findIndex((image) => image.isCurrent);
      this.images[currentIndex].isCurrent = false;
      const newCurrentIndex = currentIndex - 1;
      this.images[newCurrentIndex].isCurrent = true;
    }

    this.slideToCurrent();
  }

  slideToCurrent() {
    const currentIndex = this.images.findIndex((image) => image.isCurrent);
    this.imageContainer.style.transform = `translateX(-${
      this.imageWidth * currentIndex
    }px)`;

    this.updateDots();
  }

  updateDots() {
    for (const image of this.images) {
      image.correspondingDot.classList.remove('active');
      if (image.isCurrent) {
        image.correspondingDot.classList.add('active');
      }
    }
  }
}

export default Carousel;
