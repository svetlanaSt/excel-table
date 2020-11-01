import { defaultStyles } from '@/constans';
import { stylesToString } from "../../core/utils";
import { parse } from '@core/parse';

const CODE = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 25 + 'px';

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';  
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';  
}


function createCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`;
    const data = state.dataState[id];    
    const styles = stylesToString({...defaultStyles, ...state.stylesState[id]});
    
    return `
         <div class="cell"  contenteditable="" 
         data-col="${col}"
         data-type="cell" 
         data-id="${id}"
         data-value="${data || ''}"
         style="${styles};  width: ${getWidth(state.colState, col)}">${parse(data) || ''}</div>
        `;
  }
}

function createCol({col, index, width}) {
  return `
  <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">       
      ${col}
      <div class="col-resize" data-resize="col"></div>
  </div>
  ` ;
}

function createRow(index, content, state) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
      <div class="row" data-type="resizable" data-row="${index}" style="height: ${getHeight(state, index)}">
        <div class="row-info">
          ${index ? index : ''}
          ${resize}
        </div>
        <div class="row-data" >${content}</div>
      </div>
    `;
  }

function toChar(_, index) {
  return String.fromCharCode(CODE.A + index);
}

function withWidthFromState(state) {
  return function (col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    };   
  }  
}

export function createTable(rowsCount = 10, state = {}) {  
  const colCount = CODE.Z = CODE.A + 1;
    const rows = [];

    const cols = new Array(colCount)
    .fill('')
    .map(toChar)
    .map(withWidthFromState(state))
    .map(createCol)
    .join('');   
    

    rows.push(createRow(null, cols, {}));

    for (let row= 0; row < rowsCount; row++) {
        const cells = new Array(rowsCount)
        .fill('')  
        .map(createCell(state, row))
        .join('');   
    
        rows.push(createRow(row + 1, cells, state.rowState));        
    }

    return rows.join('');
}

