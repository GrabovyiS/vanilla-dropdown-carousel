import './styles/styles.css';
import './styles/carousel.css';
import './styles/dropdown.css';

import Carousel from './widgets/carousel';
import DropdownMenu from './widgets/dropdown';

const myCarousel = new Carousel(document.querySelector('.carousel'));
const myDropdown = new DropdownMenu(
  document.querySelector('.dropdown-container')
);
