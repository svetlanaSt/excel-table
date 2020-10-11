import {$} from '@core/dom';

export class TableSelection  {
    constructor($root) {
      this.$root = $root;
      this.group = [];
      this.current = null;        
    }

    select($el) {
      this.clear();
      this.group.push($el);
      this.current = $el;
      $el.focus().addClass('selected');      
    }

    selectGroup($group = []) {
      this.clear();
      this.group = $group;
      this.group.forEach($cell => $cell.addClass('selected'));     
    }

    get selectedIds() {
      return this.group.map($el => $el.id());
    }

    clear() {
      this.group.forEach(el => {
         el. removeClass('selected')
      });
      this.group.length = 0;
    }

    applyStyle(style) {
      this.group.forEach(el => {
         el.css(style)
      });
    }
}