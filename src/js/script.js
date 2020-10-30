import API from './fetchCountries.js';
import countriesMarkup from '../templates/countries-markup.hbs';
import counriesList from '../templates/countries-list.hbs';

const debounce = require('lodash.debounce');

const refs = {
  searchInput: document.querySelector('.input-control'),
  countriesContainer: document.querySelector('#js-card-container'),
};

// refs.searchInput.addEventListener(
//   'input',
//   debounce(() => {
//     onSearch;
//   }, 500),
// );

// function onSearch() {
//   const countrySearch = searchInput.value;
//   console.log(countrySearch);
// }
