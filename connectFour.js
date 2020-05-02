var player1 = prompt("Player 1 : Enter your name. Your color will be Blue");
var p1Color = 'rgb(86, 151, 255)';

var player2 = prompt('Player 2: Enter you name. Your color will be Red');
var p2Color = 'rgb(237, 45, 73)';

var gameOn = true;
var table = $('table tr');

//function to report win in console
function reportWin(rowNum, colNum) {
    console.log('You won starting at this row and col: ');
    console.log(rowNum);
    console.log(colNum);
}

//function to change color in clicked cell
function changeColor(rowNum, colNum, color) {
    return table.eq(rowNum).find('td').eq(colNum).find('button').css('background-color', color);
}

//function to return color
function returnColor(rowNum, colNum) {
    return table.eq(rowNum).find('td').eq(colNum).find('button').css('background-color');
}

//function to check the bottom row with no input
function checkBottom(colIndex) {
    var colorReport = returnColor(5, colIndex);
    for (var row=6; row >= 0; row--){
        colorReport = returnColor(row, colIndex);
        if (colorReport === 'rgb(128, 128, 128)'){
            return row;
        }
    }
}

//function to check the colors are matching or not
function colorMatch(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}



//function to check the vertical win
function verticalWinCheck() {
    for (var col = 0; col < 7; col++){
        for (var row = 0; row < 4; row++){
            if (colorMatch(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col), returnColor(row+3,col))){
                console.log('Vertical');
                reportWin(row,col);
                return true;
            }else{
                continue;
            }
        }
    }
}

//function to check the horizontal win
function horizontalWinCheck() {
    for (var row = 0; row < 7; row++){
        for (var col = 0; col < 4; col++){
            if (colorMatch(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2), returnColor(row,col+3))){
                console.log('Horizontal');
                reportWin(row, col);
                return true;
            }else{
                continue;
            }
        }
    }
}

//function to check the diagonal win
function diagonalWinCheck() {
    for(var col = 0; col < 5; col++){
        for(var row = 0; row < 7; row++){
            if (colorMatch(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),
                returnColor(row+3,col+3))){
                console.log('Diagonal');
                reportWin(row, col);
                return true;
            }else if(colorMatch(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),
                returnColor(row-3,col+3))){
                console.log('Diagonal');
                reportWin(row, col);
                return true;
            }else {
                continue;
            }
        }
    }
}

//Game logic
// Start with player 1

var currentPlayer = 1;
var currentName = player1;
var currentColor = p1Color;

$('h4').text(currentName+" it is your turn. Select a dot");



    $('.board button').on('click', function () {
        if (gameOn) {
            var col = $(this).closest('td').index();

            var bottomValue = checkBottom(col);

            changeColor(bottomValue, col, currentColor);

            if (verticalWinCheck() || horizontalWinCheck() || diagonalWinCheck()) {
                $('h3').text(currentName + ' you have won the game. Refresh the page to start again');
                $('h4').fadeOut('fast');
                gameOn = false;
                console.log(gameOn)
            }
            currentPlayer = currentPlayer * -1;

            if (currentPlayer === 1) {
                currentName = player1;
                $('h4').text(currentName + " it is your turn. Select a dot");
                currentColor = p1Color;
            } else {
                currentName = player2;
                $('h4').text(currentName + " it is your turn. Select a dot");
                currentColor = p2Color;
            }
        }
    });


