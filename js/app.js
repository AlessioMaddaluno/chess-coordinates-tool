const ranks = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const colors = ['white', 'black'];
let selectedColor = 0;
const delay = 1000;


// Render the board and set the event listener on the cells
const renderBoard = function(board) {

    board.innerHTML = '';

    for (let i = 0; i < 8; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 8; j++) {
            let cell = document.createElement('td');
            cell.className = 'tile';

            let coords_label = document.createElement('span');

            coords_label.style.display = 'none';
            coords_label.classList.add('coord', 'badge', 'rounded-pill', 'bg-dark');

            coords_label.innerHTML = coordsToAN(j, i);
            cell.appendChild(coords_label);

            cell.addEventListener('click', readCoordinates);

            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}


// Check if the selected cell has the correct coordinates
const readCoordinates = function(e) {

    const selectedCoordinates = e.target.childNodes[0].innerHTML;
    const coordsToFind = document.getElementById('toFind').innerHTML;

    if (selectedCoordinates == coordsToFind) {
        e.target.classList.add('correct');
        setTimeout(main, delay);
    } else {
        e.target.classList.add('wrong');

    }
}

/*
    Converts (x,y) table coordinates to Algebraic notation
*/

const coordsToAN = function(x, y) {
    color = colors[selectedColor];
    return (color === 'white') ? (ranks[x] + (7 - y + 1)) : (ranks[7 - x] + (y + 1));
}

/*
    When 'coordVisibilityBtn' is pressed, toggle the coordinates visbility on the board
*/

const toggleCoordinatesBtn = document.getElementById('coordVisibilityBtn');
toggleCoordinatesBtn.addEventListener('click', (e) => {

    const tiles = document.getElementsByClassName('coord');

    e.target.innerHTML = (tiles[0].style.display === 'block') ? '<i class="far fa-eye"></i> Show Coordinates' : '<i class="far fa-eye-slash"></i> Hide Coordinates';

    Array.from(tiles).forEach((t) => {
        if (t.style.display === "none")
            t.style.display = "block";
        else
            t.style.display = "none";
    });


});

/*
    When the button 'toggleColorBtn' is pressend switch the color chosen from
    the player and change the board according to it
*/
const toggleColorBtn = document.getElementById('toggleColorBtn');
toggleColorBtn.addEventListener('click', (e) => {

    if (e.target.innerHTML.includes('Black')) {
        e.target.innerHTML = '<i class="fas fa-chess-pawn"></i> Play as White';
        e.target.classList.remove('btn-dark');
        e.target.classList.add('btn-secondary');

    } else {
        e.target.innerHTML = '<i class="fas fa-chess-pawn"></i> Play as Black';
        e.target.classList.remove('btn-secondary');
        e.target.classList.add('btn-dark');
    }

    selectedColor = 1 - selectedColor;

    main(); //reset the board 
});


function main() {
    // Display the board and add the event listeners on the cells
    renderBoard(document.getElementById('chessBoard'));
    // Generates a new coordinate to find
    document.getElementById('toFind').innerHTML = ranks[Math.floor(Math.random() * 7)] + (Math.floor(Math.random() * 7) + 1);
}

main();