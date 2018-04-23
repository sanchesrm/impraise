import axios from 'axios';

//Setted to use cors-anywhere public proxy
const ROOT_URL = `https://cors-anywhere.herokuapp.com/http://impraise-shorty.herokuapp.com`;

export const SHORT_URL = 'SHORT_URL';
export const FETCH_SHORTENED_URLS = 'FETCH_SHORTENED_URLS';
export const FETCH_URL_SHORTENED = 'FETCH_URL_SHORTENED';

export function shortUrl(urlToShort) {
  const url = `${ROOT_URL}/shorten`;

  const request = axios.post(url, {
    url: urlToShort
  });

  return {
    type: SHORT_URL,
    payload: request
  }
}

export function fetchUrlShortened(newShortCode) {  
  const url = `${ROOT_URL}/${newShortCode}/stats`;
  const request = axios.get(url);

  return {
    type: FETCH_URL_SHORTENED,
    payload: request
  }
}

export function fetchShortenedURLS(shortenedURLS) {
  return {
    type: FETCH_SHORTENED_URLS,
    payload: shortenedURLS
  }
}