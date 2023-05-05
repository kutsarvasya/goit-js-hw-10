import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryItemEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(eventHandler, DEBOUNCE_DELAY));

function eventHandler(e) {
  console.log(e.target.value);
  const countryName = e.target.value.trim();
  countryListEl.innerHTML = '';
  countryItemEl.innerHTML = '';

  if (!countryName) return;

  fetchCountries(countryName)
    .then(countries => createMarcUp(countries))
    .catch(error => {
      Notiflix.Notify.failure(`${error}`);
    });
}

function createMarcUp(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  if (countries.length >= 2 && countries.length <= 10) {
    const listCountries = countries
      .map(country => {
        return `  <li class="country-item">
        <img src=${country.flags.svg} alt="" width="30" />
        <h3>${country.name.common}</h3>
      </li>`;
      })
      .join('');
    countryListEl.innerHTML = listCountries;
  }

  if (countries.length === 1) {
    const itemCountry = `<div class="country-item">
        <img src=${countries[0].flags.svg} alt="" width="30" />
        <h2>${countries[0].name.common}</h2>
      </div>
      <ul>
        <li><b>Capital: </b>${countries[0].capital}</li>
        <li><b>Population: </b>${countries[0].population}</li>
        <li><b>Languages: </b>${Object.values(countries[0].languages)}</li>
      </ul>`;
    countryItemEl.innerHTML = itemCountry;
  }
}
