const CODE = {
    A: 65,
    Z: 90
}

function createCell() {
    return `
    <div class="cell" contenteditable=""></div>
    `
}

function createCol(el) {
    return `
    <div class="column">
        ${el}
    </div>
    `
}

function createRow(content, i) {
    return `        
    <div class="row">
    <div class="row-info">${i + 1 || ''}</div>
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