/**
 * Created by wangbiaozy on 17/6/23.
 */

(function(global){
    function remChange(){
        document.documentElement.style.fontSize=20*document.documentElement.clientWidth/750+'px';
    }
    remChange();
    global.addEventListener('resize',remChange,false);
})(window);

window.onload = initPage;

function initPage() {
    var table = document.getElementById('box'),
        cells = table.getElementsByTagName('td');
    for (var i=0; i<cells.length; i++){
        var cell = cells[i];
        cell.onclick = tileClick;
    }
}

function cellIsEmpty(cell) {
    var image = cell.firstChild;
    while (image.nodeName == '#text'){
        image = image.nextSibling;
    }
    if(image.alt == 'empty'){
        return true;
    }else{
        return false;
    }
}

function swapTiles(selectedCell,destinationCell) {
    var selectedImage = selectedCell.firstChild;
    while(selectedImage.nodeName == '#text'){
        selectedImage = selectedImage.nextSibling;
    }
    var destinationImage = destinationCell.firstChild;
    while (destinationImage.nodeName == '#text'){
        destinationImage = destinationImage.nextSibling;
    }
    selectedCell.appendChild(destinationImage);
    destinationCell.appendChild(selectedImage);
    if(isComplete()){
        alert('恭喜您,没有奖!! 哈哈哈');
    }
}

function tileClick() {
    if(cellIsEmpty(this)){
        alert('请点击带有数字的方块!');
        return;
    }
    var currentRow = this.id.charAt(4),
        currentCol = this.id.charAt(5);
    if(currentRow > 1){
        var testRow = Number(currentRow) - 1,
            testCellId = 'cell' + testRow + currentCol,
            testCell = document.getElementById(testCellId);
        if(cellIsEmpty(testCell)){
            swapTiles(this,testCell);
            return;
        }
    }
    if(currentRow < 4){
        var testRow = Number(currentRow) + 1,
            testCellId = 'cell' + testRow + currentCol,
            testCell = document.getElementById(testCellId);
        if(cellIsEmpty(testCell)){
            swapTiles(this,testCell);
            return;
        }
    }
    if(currentCol > 1){
        console.log(1);
        var testCol = Number(currentCol) - 1,
            testCellId = 'cell' + currentRow + testCol,
            testCell = document.getElementById(testCellId);
        if(cellIsEmpty(testCell)){
            swapTiles(this,testCell);
            return;
        }
    }
    if(currentCol < 4){
        var testCol = Number(currentCol) + 1,
            testCellId = 'cell' + currentRow + testCol,
            testCell = document.getElementById(testCellId);
        if(cellIsEmpty(testCell)){
            swapTiles(this,testCell);
            return;
        }
    }
    alert('请点击与空格处相邻的数字!');
}

function isComplete() {
    var tiles = document.getElementById('box').getElementsByTagName('img'),
        tileOrder = '';
    for (var i=0; i<tiles.length; i++){
        var num = tiles[i].src.substr(-6,2);
        if(num != 'ty')
            tileOrder += num;
    }
    if(tileOrder == '010203040506070809101112131415'){
        return true;
    }else{
        return false;
    }
}