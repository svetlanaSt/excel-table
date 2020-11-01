export function capitalize(string ) {
    if (typeof string !== 'string') {
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end];
    }
    return new Array(end - start + 1)
       .fill('')
       .map((_, index) => start + index)
  }

export function storage(key, data = null) {
    if (!data) {          
        return JSON.parse(localStorage.getItem(key));
    }     
    localStorage.setItem(key, JSON.stringify(data));
  }

export function isEquel(a, b) {
    if (typeof a === 'object' && typeof a === 'object') {
        return JSON.stringify(a) ===  JSON.stringify(a);        
    }
    return a === b;
}  

export function camelCaseToDash(str) {
    return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function stylesToString(styles = {}) {
    return Object.keys(styles)
    .map(key => `${camelCaseToDash(key)}: ${styles[key]}`
    )
    .join(';');
}

export function debounce(fn, ms) {
    let timeout;
    return function (...args) {
        const later = () => {
            clearTimeout(timeout);
            fn.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, ms);
    };
}

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}