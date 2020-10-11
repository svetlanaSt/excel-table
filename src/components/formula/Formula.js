import { ExcelComponents } from "../../core/ExcelComponents";
import {$} from '@core/dom';
import * as actions from "../../redux/actions";

export class Formula extends ExcelComponents {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        });       
    }    
    
    toHTML() {
        console.log(this.store.getState().currentText);
        return `
        <div class="info">fx</div>
        <div id="formula" class="input" contenteditable spellcheck="false"></div>`;  
    }

    init() {
        super.init();
        this.formula = this.$root.find('#formula');

        this.$on('table:select', $cell => {                     
           this.formula.text($cell.text());
        });       

        // this.$on('table:input', $cell => {           
        //     this.formula.text($cell.text());
        //  });

        // this.$subscribe(state => {
        //     this.formula.text(state.currentText);
        //  });
    }

    storeChanged({currentText}) {
        this.formula.text(currentText);
    }  

    onInput(event) {        
        this.$emit('formula:input', $(event.target).text());               
    }

    onKeydown(event) {
        if (event.key === 'Enter' || event.key === 'Tab') {
            event.preventDefault();
            this.$emit('formula:focus');
        }        
    }


    
}