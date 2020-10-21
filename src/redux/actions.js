import { APPLY_STYLE, CHANGE_TEXT, CHANGE_TITLE, CURRENT_STYLE, TABLE_RESIZE, UPDATE_DATE } from "./types";

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    };
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    };
}

export function updateDate() {
    return {
        type: UPDATE_DATE
    };
}

export function changeStyles(data) {
    return {
        type: CURRENT_STYLE,
        data
    };
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    };
}

export function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        data
    };
}