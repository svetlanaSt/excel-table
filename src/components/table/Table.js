import { ExcelComponents } from "../../core/ExcelComponents";
import { createTable } from "./tableTemplate";
import { resizeHandler } from "./tableResize";
import {$} from '@core/dom';

export class Table extends ExcelComponents {
    static className = 'excel__table';

    constructor($root) {
      super($root, {
        listeners: [ 'mousedown']
      })
    }

    toHTML() {
      return  createTable(20);   
    }

    // onClick() {
    //   console.log('click');
    // }

    onMousedown(event) {
      if(event.target.dataset.resize) {
        resizeHandler(this.$root, event);
      }
    }

    // onMousemove() {
      
    // }

    // onMouseup() {

    // }
    
}

