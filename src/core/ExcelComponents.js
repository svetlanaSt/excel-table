import {DomListener} from '@core/DomListener';

export class ExcelComponents extends DomListener {    
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name;
        this.store = options.store;
        this.emitter = options.emitter;
        this.subscribe = options.subscribe || [];
        this.unsubscribers = [];                

        this.prepare();
    }

    prepare() { 
           
    }

    toHTML () {
        return '';
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }

    storeChanged() {

    }

    isWatching(key) {
        return this.subscribe.includes(key);
    }

    // $subscribe(fn) {
    //     this.storeSub = this.store.subscribe(fn);
    // }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(fn);
    }

    init() {
        this. initDOMListeners();        
    }

    destroy() {
        this. removeDOMListeners();
        this.unsubscribers.forEach(unsub => unsub());
            
    }


}