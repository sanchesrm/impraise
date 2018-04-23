import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Fonts/fonts.css';
import registerServiceWorker from './registerServiceWorker';
import Routes from './Routes';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { loadState, saveState } from './LocalStorage'

const persistedState = loadState();
const createStoreWithMiddleware = applyMiddleware(ReduxPromise);

const store = createStore(
    reducers,
    persistedState,
    createStoreWithMiddleware
);

store.subscribe(() => {
    saveState(
        store.getState().shortenList
    );
});

store.dispatch({
    type: 'FETCH_SHORTENED_URLS',
    payload: persistedState
});

ReactDOM.render(<Provider store={store}>
                    <Routes />
                </Provider>, document.getElementById('root'));
registerServiceWorker();
