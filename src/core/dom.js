class Dom {
   constructor(selector) {
       this.$el = typeof selector === 'string'
       ? document.querySelector(selector)
       : selector;
   }

   html(html) {
    if (typeof html === 'string') {
        this.$el.innerHTML = html;
        return this;
    }
    return this.$el.outerHTML.trim();
       
   }

   clear() {
    this.html('');
    return this;
   }

   on(eventType, fn) {
    this.$el.addEventListener(eventType, fn);    
   }

   off(eventType, fn) {
    this.$el.removeEventListener(eventType, fn);    
   }

   append(node) {
    if (node instanceof Dom) {
        node = node.$el;
    }   
    this.$el.append(node);  
    return this;  
   }

   closest(selector) {
       return $(this.$el.closest(selector));
   }

   getCoords() {
       return this.$el.getBoundingClientRect();
   }

   get data() {
       return this.$el.dataset;
   }

   findAll(selector) {
       return this.$el.querySelectorAll(selector);
   }

   css(styles = {}) {
        Object
        .keys(styles)
        .forEach(key => {
        this.$el.style[key] = styles[key]
        })

   }
   
}

export function $(selector) {
    return new Dom(selector);     
}

$.create = (tagname, classes = '') => {    
    const el = document.createElement(tagname);

    if (classes) {
        el.classList.add(classes);
    }
    return $(el);
}