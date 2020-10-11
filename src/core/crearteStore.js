export function createStore(rootReducer, initialState = {}) {    
    let state = rootReducer({...initialState}, '_INIT_');
    let listeners = [];

    return { 
        subscribe(fn) {
            listeners.push(fn);
            return { 
                unsubscribe() {
                    listeners.filter(listener => listener !== fn);
                }
            } 
        },

        dispatch(action) {
            state = rootReducer(state, action);
            listeners.forEach(listener => listener(state));
        },
        
        getState() {
            return JSON.parse(JSON.stringify(state));
        }
    }
}

// export class createStore {
//     constructor(rootReducer, initialState = {}) {
//         this.rootReducer = rootReducer;
//         this.initialState = initialState;

//         this.state = this.rootReducer({...this.initialState}, '_INIT_');
//         this.listeners = [];
//     }
    
//     subscribe(fn) {
//         this.listeners.push(fn);
//         return { 
//             unsubscribe() {
//                 this.listeners.filter(listener => listener !== fn);
//             }
//         } 
//     }

//     dispatch(action) {
//         this.state = this.rootReducer(this.state, action);
//         this.listeners.forEach(listener => listener(state));
//     }

//     getState() {
//         return this.state;
//     }
// }