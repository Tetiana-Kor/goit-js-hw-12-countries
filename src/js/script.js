import API from './fetchCountries.js';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import countriesMarkup from '../templates/countries-markup.hbs';
import counriesList from '../templates/countries-list.hbs';

const debounce = require('lodash.debounce');

const refs = {
  searchInput: document.querySelector('.input-control'),
  countriesContainer: document.querySelector('.js-card-container'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  let countrySearch = e.target.value;

  if (!countrySearch) {
    clearMarkup();
    return;
  }

  API.fetchCountries(countrySearch).then(chooseCountry).catch(onError);
}

function chooseCountry(countries) {
  if (countries.length > 10) {
    clearMarkup();
    tooManyMatchesError();
  } else if (countries.length > 1 && countries.length <= 10) {
    clearMarkup();
    renderCountryMarkup(counriesList, countries);
  } else if (countries.length === 1) {
    clearMarkup();
    renderCountryMarkup(countriesMarkup, countries);
  } else {
    noResults();
  }
}

function renderCountryMarkup(option, countries) {
  const markup = option(countries);
  refs.countriesContainer.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.countriesContainer.innerHTML = '';
}

function onError(error) {
  clearMarkup();
}

function tooManyMatchesError() {
  error({
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 1500,
  });
}

function noResults() {
  error({
    text: 'No such country. Please enter another query!',
    delay: 2000,
  });
}
