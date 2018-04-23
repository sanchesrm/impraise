import { SHORT_URL, FETCH_URL_SHORTENED, FETCH_SHORTENED_URLS } from '../actions';

export function ShortUrl(state = [], action) {
  if (action.error) {
    action.type = 'HANDLE_ERROR'; // change the type
  } 
  switch (action.type) {
    case SHORT_URL:
      return action.payload.data;
    case FETCH_URL_SHORTENED:
      return action.payload.data;
    case 'HANDLE_ERROR':
      throw action.payload.response;
    default:
      return state
  }
}

export function ShortenedURLS(state = {}, action) {
  switch (action.type) {
    case FETCH_SHORTENED_URLS:
      return action.payload;
    default:
      return state;
  }
}
