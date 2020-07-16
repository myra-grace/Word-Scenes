import { createStore } from 'redux';
import reducer from './reducers';

const enhancer = window['devToolsExtension'] ? window['devToolsExtension']()(createStore) : createStore;

export default function configureStore(initialState:any) {
    const store = enhancer(
        reducer, initialState,);
    return store;
}