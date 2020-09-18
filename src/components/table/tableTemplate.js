const CODE = {
    A: 65,
    Z: 90
}

function createCell(_, col) {
    return `
    <div class="cell" i contenteditable="" data-col="${col}"></div>
    `
}

function createCol(el, i) {
    return `
    <div class="column" data-type="resizable" data-col="${i}">
       
        ${el}
        <div class="col-resize"  data-resize="col"></div>
    </div>
    `
}

function createRow(content, i) {
    return `        
    <div class="row"  data-type="resizable">
    <div class="row-info">${i + 1 || ''}
        <div class="row-resize" data-resize="row"></div>
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

    const cols = new Array(rowsCount)
    .fill('')
    .map(toChar)    
    .map(createCol)
    .join('');
    
    const cell = new Array(rowsCount)
    .fill('')       
    .map(createCell)
    .join('');

    rows.push(createRow(cols));

    for (let i= 0; i < rowsCount; i++) {
        rows.push(createRow(cell, i));        
    }

    return rows.join('');
}