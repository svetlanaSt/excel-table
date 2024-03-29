import { defaultStyles, defaultTitle } from '@/constans';
import { clone } from '../core/utils';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    currentText: '',
    currentStyles:  defaultStyles,
    stylesState: {},
    title: defaultTitle,
    openedDate: new Date().toJSON()
}

const normalize = state => ({
    ...state,
    currentStyles:  defaultStyles,
    currentText: ''
});


export function normalizeInitialState(state) {    
    return state ? normalize(state) : clone(defaultState);
}