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


function BoardCreate(side) {
    let boardArr = new Array;
    let index = 0;
    const tbl = document.createElement("table");
    for (let i = 0; i < side; i++) {
        boardArr[i] = new Array;
        let row = document.createElement("tr");


        for (let j = 0; j < side; j++) {

            let cell = document.createElement(`td`);
            cell.dataset.index = index;
            cell.dataset.ship = false;
            cell.dataset.cantPlace = false;

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

    for (let i = 5; i >= 2; i--) {
        let shipAmount = document.querySelector(`input[name="BS${i}"]`).value;// {1,1,1,1,1}
        for (let j = 0; j < shipAmount; j++) {
            ShipOf(i)
        }
    }
    // ShipOf(5)
}



function IsCanPlaceVerUp(cells2D, size, firstIndex, secondIndex) {

    for (let i = 0; i <= size; i++) {
        if (firstIndex - i > 0) {
            if (cells2D[firstIndex - i][secondIndex].dataset.cantPlace == String(true)) {
                return false;
            }
        }
    }
    return true;
}
function IsCanPlaceVerDown(cells2D, size, firstIndex, secondIndex) {
    for (let i = 0; i <= size; i++) {
        if (firstIndex + i < side) {
            if (cells2D[firstIndex + i][secondIndex].dataset.cantPlace == String(true)) {
                return false;
            }
        }
    }
    return true;
}
function IsCanPlaceHorR(cells2D, size, firstIndex, secondIndex) {

    for (let i = 0; i <= size + 1; i++) {
        if (secondIndex + i < side) {
            if (cells2D[firstIndex][secondIndex + i].dataset.cantPlace == String(true)) {
                console.log("work");
                return false;
            }
        }
    }
    return true;

}
function IsCanPlaceHorL(cells2D, size, firstIndex, secondIndex) {

    for (let i = 0; i <= size + 1; i++) {
        if (secondIndex - i >= 0) {
            if (cells2D[firstIndex][secondIndex - i].dataset.cantPlace == String(true)) {
                return false;
            }
        }
    }
    return true;

}
/**
 * The function randomly places a ship of a given size on a game board and marks the surrounding cells
 * as unavailable for future ship placement.
 * @param size - The size of the ship to be placed on the game board.
 */
function ShipOf(size) {
    let flag = false;
    let cells = document.querySelectorAll('td');
    let cells2D = create2DArray(cells, side);
    let firstIndex;
    let secondIndex;
    let direction = Random(1, 5)

    switch (direction) {

        case 1://ימינה
            while (!flag) {
                firstIndex = Random(0, side);
                secondIndex = Random(0, (side - size));
                flag = IsCanPlaceHorR(cells2D, size, firstIndex, secondIndex);

                if (flag) {
                    console.log((cells2D[firstIndex][secondIndex]), direction);
                    for (let i = 0; i < size; i++) {

                        cells2D[firstIndex][secondIndex + i].dataset.ship = true;
                        cells2D[firstIndex][secondIndex + i].classList.add('ship');
                        cells2D[firstIndex][secondIndex + i].dataset.cantPlace = true;


                        if (firstIndex - 1 >= 0) {
                            cells2D[firstIndex - 1][secondIndex + i].dataset.cantPlace = true;
                        }
                        if (firstIndex + 1 < side) {
                            cells2D[firstIndex + 1][secondIndex + i].dataset.cantPlace = true;
                        }
                        if (secondIndex + i - 1 >= 0) {
                            cells2D[firstIndex][secondIndex + i - 1].dataset.cantPlace = true;
                        }
                        if (secondIndex + i + 1 < side) {
                            cells2D[firstIndex][secondIndex + i + 1].dataset.cantPlace = true;
                        }
                    }
                }
            }

            break;
        case 2://למעלה
            while (!flag) {
                firstIndex = Random(size, side) // מהאינקס הכי קטן למיקום ספינה על פי הגודל עד האינדקב האחרון בלוח
                secondIndex = Random(0, side);
                flag = IsCanPlaceVerUp(cells2D, size, firstIndex, secondIndex)

                if (flag) {
                    console.log((cells2D[firstIndex][secondIndex]), direction);
                    for (let i = 0; i < size; i++) {
                        cells2D[firstIndex - i][secondIndex].dataset.ship = true;
                        cells2D[firstIndex - i][secondIndex].classList.add('ship');
                        cells2D[firstIndex - i][secondIndex].dataset.cantPlace = true;

                        if (firstIndex - i - 1 >= 0) {
                            cells2D[firstIndex - i - 1][secondIndex].dataset.cantPlace = true;
                        }
                        if (firstIndex - i + 1 < side) {
                            cells2D[firstIndex - i + 1][secondIndex].dataset.cantPlace = true;
                        }
                        if (secondIndex + 1 < side) {
                            cells2D[firstIndex - i][secondIndex + 1].dataset.cantPlace = true;
                        }
                        if (secondIndex - 1 >= 0) {
                            cells2D[firstIndex - i][secondIndex - 1].dataset.cantPlace = true;
                        }
                    }
                }

            }
            break;
        case 3://שמאלה
            while (!flag) {
                let cells2D = create2DArray(cells, side);
                firstIndex = Random(0, side);
                secondIndex = Random(size, side);

                flag = IsCanPlaceHorL(cells2D, size, firstIndex, secondIndex);

                if (flag) {
                    console.log((cells2D[firstIndex][secondIndex]), direction);
                    for (let i = 0; i < size; i++) {
                        cells2D[firstIndex][secondIndex - i].dataset.ship = true;
                        cells2D[firstIndex][secondIndex - i].classList.add('ship');
                        cells2D[firstIndex][secondIndex - i].dataset.cantPlace = true;

                        if (firstIndex - 1 >= 0) {
                            cells2D[firstIndex - 1][secondIndex - i].dataset.cantPlace = true;
                        }
                        if (firstIndex + 1 < side) {
                            cells2D[firstIndex + 1][secondIndex - i].dataset.cantPlace = true;
                        }
                        if (secondIndex - i - 1 >= 0) {
                            cells2D[firstIndex][secondIndex - i - 1].dataset.cantPlace = true;
                        }
                        if (secondIndex - i + 1 < side) {
                            cells2D[firstIndex][secondIndex - i + 1].dataset.cantPlace = true;
                        }

                    }
                }
            }

            break;
        case 4://למטה
            while (!flag) {
                firstIndex = Random(0, side - size) // מהאינקס הכי קטן למיקום ספינה על פי הגודל עד האינדקב האחרון בלוח
                secondIndex = Random(0, side);

                flag = IsCanPlaceVerDown(cells2D, size, firstIndex, secondIndex);

                if (flag) {
                    console.log((cells2D[firstIndex][secondIndex]), direction);
                    for (let i = 0; i < size; i++) {
                        cells2D[firstIndex + i][secondIndex].dataset.ship = true;
                        cells2D[firstIndex + i][secondIndex].classList.add('ship');
                        cells2D[firstIndex + i][secondIndex].dataset.cantPlace = true;

                        if (firstIndex + i + 1 < side) {
                            cells2D[firstIndex + i + 1][secondIndex].dataset.cantPlace = true;
                        }
                        if (firstIndex + i - 1 >= 0) {
                            cells2D[firstIndex + i - 1][secondIndex].dataset.cantPlace = true;
                        }
                        if (secondIndex + 1 < side) {
                            cells2D[firstIndex + i][secondIndex + 1].dataset.cantPlace = true;
                        }
                        if (secondIndex - 1 >= 0) {
                            cells2D[firstIndex + i][secondIndex - 1].dataset.cantPlace = true;
                        }

                    }
                }
            }

            break;
    }
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].dataset.cantPlace == String(true)) {
            cells[i].classList.add('block');
        }
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
/**
 * The function creates a 2D array from a 1D array with a specified side length.
 * @param arr - An array of values that will be used to populate the 2D array.
 * @param side - The desired side length of the 2D array to be created.
 * @returns a 2D array created from the input array and the desired side length.
 */
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


