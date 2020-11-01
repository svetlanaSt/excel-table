import { ExcelComponents } from "../../core/ExcelComponents";
import { createTable } from "./tableTemplate";
import { resizeHandler } from "./tableResize";
import {$} from '@core/dom';
import { TableSelection } from "./TableSelection";
import { range } from "../../core/utils";
import { nextSelector } from "./tableFunctions";
import * as actions from "../../redux/actions";
import { defaultStyles } from '@/constans';
import { parse } from '@core/parse';

export class Table extends ExcelComponents {
    static className = 'excel__table';

    constructor($root, options) {
      super($root, {
        name: 'Table',
        listeners: [ 'mousedown', 'keydown', 'input'],
        ...options
      });
    }

    toHTML() {
      return  createTable(20, this.store.getState());   
    }

    prepare() {
      this.selection = new TableSelection(this.$root);
    }

    init() {      
      super.init();           
      const $cell = this.$root.find('[data-id="0:0"]');
      this.selectCell($cell);   
      
      
      this.$on('formula:input', value => {
        this.selection.current
          .attr('data-value', value)
          .text(parse(value));
        this.updateTextinStore(value);        
      });

      this.$on('formula:focus', () => {
        this.selection.current.focus();
      });

      this.$on('toolbar:applyStyle', style => {        
        this.selection.applyStyle(style);
        this.$dispatch(actions.applyStyle({
          value: style,
          ids: this.selection.selectedIds
        }));        
      });   
      
    }

    selectCell($cell) {
      this.selection.select($cell);
      this.$emit('table:select', $cell);
      const styles = $cell.getStyles(Object.keys(defaultStyles));
      this.$dispatch(actions.changeStyles(styles));      
    }
    
    onKeydown(event) {
      const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
      const {key} = event;

      if (keys.includes(key) && !event.shiftKey) {
        event.preventDefault();
        const id = this.selection.current.id(true);
        const $next = this.$root.find(nextSelector(key, id));
        this.selectCell($next);
      }        
    }

    async resizeTable(event) {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    }

    onMousedown(event) {
      if(event.target.dataset.resize) {
        this.resizeTable(event); 
      } else if (event.target.dataset.type === 'cell') {   
        const $activeCell = $(event.target);
        if (event.shiftKey) {          
          const target = $activeCell.id(true);
          const current = this.selection.current.id(true);          

          const cols = range(current.col, target.col);
          const rows = range(current.row, target.row);
          const ids = cols.reduce((acc, col) => {
            rows.forEach(row => acc.push(`${row}:${col}`));
            return acc;
          }, []);          
             
          const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`));
          this.selection.selectGroup($cells);          
        } else {          
          this.selectCell($activeCell);
        } 
      }
    }

    updateTextinStore(value) {            
      this.$dispatch(actions.changeText({
        id: this.selection.current.id(),
        value
      }));
    }
    
    onInput(event) {      
      this.updateTextinStore($(event.target).text());
    }
 }

 

 

