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

   text(text) {
    if (typeof text === 'string') {
        this.$el.textContent = text;
        return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
        return this.$el.value.trim();   
    }
    return this.$el.textContent.trim();       
   }

   clear() {
    this.html('');
    return this;
   }

   on(eventType, fn) {
    this.$el.addEventListener(eventType, fn);
    return this;    
   }

   off(eventType, fn) {
    this.$el.removeEventListener(eventType, fn);
    return this;    
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

   find(selector) {
    return $(this.$el.querySelector(selector));
   }

   findAll(selector) {
       return this.$el.querySelectorAll(selector);
   }

   addClass(classes) {
    return this.$el.classList.add(classes);
   }

   focus() {
       this.$el.focus();
       return this;
   }

   removeClass(classes) {
    return this.$el.classList.remove(classes);
   }

   id(parse) {
       if (parse) {
        const parsed = this.id().split(':');        
        return {
            row: +parsed[0],
            col: +parsed[1]
        }
       }
       return this.data.id;
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