const CODE = {
    A: 65,
    Z: 90
}

// function createCell(_, col) {
//     return `
//     <div class="cell" i contenteditable="" data-col="${col}"></div>
//     `
// }

function createCell(row) {
    return function (_, col) {
        return `
             <div class="cell"  contenteditable="" 
             data-col="${col}"
             data-type="cell" 
             data-id="${row}:${col}"></div>
            `
    }
}

function createCol(el, i) {
    return `
    <div class="column" data-type="resizable" data-col="${i}">       
        ${el}
        <div class="col-resize"  data-resize="col"></div>
    </div>
    `
}

function createRow(index, content) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
      <div class="row" data-type="resizable">
        <div class="row-info">
          ${index ? index : ''}
          ${resize}
        </div>
        <div class="row-data">${content}</div>
      </div>
    `
  }

function toChar(_, index) {
    return String.fromCharCode(CODE.A + index);
}

export function createTable(rowsCount = 10) {
    const colCount = CODE.Z = CODE.A + 1;
    const rows = [];

    const cols = new Array(colCount)
    .fill('')
    .map(toChar)    
    .map(createCol)
    .join('');   
    

    rows.push(createRow(null, cols));

    for (let row= 0; row < rowsCount; row++) {
        const cells = new Array(rowsCount)
        .fill('')  
        .map(createCell(row))
        .join('');   
    
        rows.push(createRow(row + 1, cells));        
    }

    return rows.join('');
}