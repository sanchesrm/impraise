import { combineReducers } from 'redux';
import { ShortUrl, ShortenedURLS } from './reducer_url';

const rootReducer = combineReducers({
  URLS: ShortUrl,
  shortenList: ShortenedURLS
});

export default rootReducer;
