import './css/styles.css';
import { fetchCountries } from './fetchCountries';


const url = 'https://restcountries.com/v3.1/all?fields=name,flags'

fetchCountries(url)



const DEBOUNCE_DELAY = 300;
