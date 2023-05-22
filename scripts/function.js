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

        for (let j = 0; j < side; j++) {

            let cell = document.createElement(`td`);
            cell.dataset.index = index;
            //cell.addEventListener('click', Attack())
            // let cellText = document.createTextNode(` `);
            // cell.appendChild(cellText);
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

function ShipOf(size) {

    let cells = document.querySelectorAll('td');
    let cells2D = create2DArray(cells, side);

    let firstIndex;
    let secondIndex;
    let direction = Random(1, 5)

    switch (direction) {

        case 1://ימינה
            firstIndex = Random(0, side);
            secondIndex = Random(0, side - size);
            for (let i = 0; i < size; i++) {

                cells2D[firstIndex][secondIndex + i].dataset.ship = true;
                cells2D[firstIndex][secondIndex + i].classList.add('ship');
                // cells[firstIndex + i].style.backgroundColor = 'green';


                cells2D[firstIndex][secondIndex + i].dataset.cantPlace = true;
                try {
                    cells2D[firstIndex][secondIndex - 1].dataset.cantPlace = true;
                    cells2D[firstIndex][secondIndex + 1].dataset.cantPlace = true;
                    cells2D[firstIndex - 1][secondIndex].dataset.cantPlace = true;
                    cells2D[firstIndex + 1][secondIndex].dataset.cantPlace = true;
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
                    cells[firstIndex - i - side].dataset.cantPlace = true;
                    cells[firstIndex - i + 1].dataset.cantPlace = true;
                    cells[firstIndex - i + side].dataset.cantPlace = true;
                } catch (error) {

                }

            }
            break;
        case 3://שמאלה
            firstIndex = Random(0, side)
            secondIndex = Random(size, side);

            for (let i = 0; i < size; i++) {
                console.log(firstIndex, secondIndex);
                cells2D[firstIndex][secondIndex - i].dataset.ship = true;

                cells2D[firstIndex][secondIndex - i].classList.add('ship');
                // cells[firstIndex + i].style.backgroundColor = 'green';

                cells2D[firstIndex][secondIndex - i].dataset.cantPlace = true;

                try {
                    cells2D[firstIndex][secondIndex - 1].dataset.cantPlace = true;
                    cells2D[firstIndex][secondIndex + 1].dataset.cantPlace = true;
                    cells2D[firstIndex - 1][secondIndex].dataset.cantPlace = true;
                    cells2D[firstIndex + 1][secondIndex].dataset.cantPlace = true;
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
                    cells[firstIndex + i + side].dataset.cantPlace = true;
                    cells[firstIndex + i - 1].dataset.cantPlace = true;
                    cells[firstIndex + i - side].dataset.cantPlace = true;
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
function create2DArray(arr, side) {
    if (arr.length !== side * side) {
        throw new Error('Input array size does not match the desired 2D dimensions.');
    }

    let result = [];
    let index = 0;

    for (let i = 0; i < side; i++) {
        let row = [];

        for (let j = 0; j < side; j++) {
            row.push(arr[index]);
            index++;
        }

        result.push(row);
    }

    return result;
}


