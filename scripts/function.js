function StartGame(event) {
    event.preventDefault();
    let form = document.querySelector('form');
    let BG = document.querySelector('#BG');
    form.classList.add('hide');
    // BG.classList.add('hide');
    side = parseInt(document.getElementById('grid-size').value);
    console.log(`side: ${side}`)
    BoardCreate(side);

}

/**
 * The function creates a table-based game board with a specified number of rows and columns, and
 * populates it with cells containing unique index values.
 * @param side - The size of the square game board to be created. It will have `side` number of rows
 * and `side` number of columns.
 */
function BoardCreate(side) {
    let boardArr = new Array;
    let index = 1;
    const tbl = document.createElement("table");
    for (let i = 0; i < side; i++) {
        boardArr[i] = new Array;
        let row = document.createElement("tr");

        /* This code block is creating a row of cells for the game board. It is using a nested for loop
        to create `side` number of cells in each row. For each cell, it creates a new `td` element,
        sets its `dataset.index` property to a unique index value, adds a text node with a space
        character as its content, appends the cell to the current row, and increments the `index`
        variable. Finally, it adds the array of index values for the current row to the `boardArr`
        array. */
        for (let j = 0; j < side; j++) {

            let cell = document.createElement(`td`);
            cell.dataset.index = index;
            let cellText = document.createTextNode(` `);
            cell.appendChild(cellText);
            row.appendChild(cell);

            boardArr[i][j] = index++;

        }
        tbl.appendChild(row);
    }


    let board = document.querySelector('#main_board')
    board.appendChild(tbl);
    placeShips()
}
function placeShips() {

    for (let i = 2; i <= 5; i++) {
        let shipAmount = document.querySelector(`input[name="BS${i}"]`).value;// {1,1,1,1,1}
        for (let j = 0; j < shipAmount; j++) {
            ShipOf(i)
        }
    }
    // ShipOf(5)
}

/**
 * The function randomly places a ship of a given size on a game board and marks the surrounding cells
 * as unavailable for future ship placement.
 * @param size - The size of the ship to be placed on the game board.
 */
function ShipOf(size) {

    let cells = document.querySelectorAll('td');
    let firstIndex;
    let direction = Random(1, 5)

    switch (direction) {

        case 1://ימינה
            firstIndex = Random(0, (side * side) - size);

            for (let i = 0; i < size; i++) {

                /* These lines of code are marking a cell on the game board as containing a ship by
                setting the `ship` property of the cell's `dataset` object to `true`. They are also
                adding the CSS class `ship` to the cell's class list, which likely applies some
                visual styling to indicate that the cell contains a ship. */
                cells[firstIndex + i].dataset.ship = true;
                cells[firstIndex + i].classList.add('ship');
                // cells[firstIndex + i].style.backgroundColor = 'green';

                cells[firstIndex + i].dataset.cantPlace = true;

                try {
                    cells[firstIndex + i - 1].dataset.cantPlace = true;
                    cells[firstIndex + i - 10].dataset.cantPlace = true;
                    cells[firstIndex + i + 1].dataset.cantPlace = true;
                    cells[firstIndex + i + 10].dataset.cantPlace = true;
                } catch (error) {

                }
            }

            break;
        case 2://למעלה
            firstIndex = Random((side * side) - (side * size) + side, side * side)

            for (let i = 1; i < size * side; i += parseInt(side)) {


                cells[firstIndex - i].dataset.ship = true;
                cells[firstIndex - i].classList.add('ship');
                // cells[firstIndex - i].style.backgroundColor = 'green';

                cells[firstIndex - i].dataset.cantPlace = true;

                try {
                    cells[firstIndex - i - 1].dataset.cantPlace = true;
                    cells[firstIndex - i - 10].dataset.cantPlace = true;
                    cells[firstIndex - i + 1].dataset.cantPlace = true;
                    cells[firstIndex - i + 10].dataset.cantPlace = true;
                } catch (error) {

                }

            }
            break;
        case 3://שמאלה
            firstIndex = Random(size, side * side)

            for (let i = 0; i < size; i++) {

                cells[firstIndex + i].dataset.ship = true;

                cells[firstIndex + i].classList.add('ship');
                // cells[firstIndex + i].style.backgroundColor = 'green';

                cells[firstIndex + i].dataset.cantPlace = true;

                try {
                    cells[firstIndex + i - 1].dataset.cantPlace = true;
                    cells[firstIndex + i - 10].dataset.cantPlace = true;
                    cells[firstIndex + i + 1].dataset.cantPlace = true;
                    cells[firstIndex + i + 10].dataset.cantPlace = true;
                } catch (error) {

                }
            }

            break;
        case 4://למטה
            // if (cells[firstIndex + i].dataset.cantPlace) {
            //     ShipOf(size)
            // }
            firstIndex = Random(0, (size * side - side + 1) - side);

            for (let i = 0; i < size * side; i += side) {

                cells[firstIndex + i].dataset.ship = true;
                cells[firstIndex + i].classList.add('ship');
                // cells[firstIndex + i].style.backgroundColor = 'green';



                cells[firstIndex + i].dataset.cantPlace = true;

                try {
                    cells[firstIndex + i + 1].dataset.cantPlace = true;
                    cells[firstIndex + i + 10].dataset.cantPlace = true;
                    cells[firstIndex + i - 1].dataset.cantPlace = true;
                    cells[firstIndex + i - 10].dataset.cantPlace = true;
                } catch (error) {

                }
            }

            break;
    }

}

function Random(min, max) {
    let num = Math.floor(Math.random() * (max - min) + min);
    return num;
}
function Clear() {
    let cells = document.querySelectorAll('td');
    for (let i = 0; i < cells.length; i++) {
        cells[i].dataset.ship = false;
        cells[i].dataset.cantPlace = false;
        cells[i].classList.remove('ship');


    }
}

