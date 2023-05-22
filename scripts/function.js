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
    let index = 0;
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

    for (let i = 2; i <= 5; i++) {
        let shipAmount = document.querySelector(`input[name="BS${i}"]`).value;// {1,1,1,1,1}
        for (let j = 0; j < shipAmount; j++) {
            ShipOf(i)
        }
    }
    // ShipOf(5)
}
function IsCanPlaceHorR(cells2D, size, firstIndex, secondIndex) {

    for (let i = 0; i < size; i++) {
        console.log("firstIndex: " + firstIndex + "\n" + "secondIndex: " + secondIndex);
        console.log(cells2D[firstIndex][secondIndex]);
        if (firstIndex > 0) {
            if (cells2D[firstIndex - 1][secondIndex + i].dataset.ship == String(true)) {
                return false;
            }
        }
        if (firstIndex < side - 1) {
            if (cells2D[firstIndex + 1][secondIndex + i].dataset.ship == String(true)) {
                return false;
            }
        }
        if (secondIndex > 0) {
            if (cells2D[firstIndex][secondIndex + i - 1].dataset.ship == String(true)) {
                return false;
            }
        }
        if (secondIndex == side - 2) {
            if (cells2D[firstIndex][secondIndex + 1].dataset.ship == String(true)) {
                return false;
            }
        }
        else if (secondIndex + i < side) {
            if (cells2D[firstIndex][secondIndex + i + 1].dataset.ship == String(true)) {
                return false;
            }
        }

        if (cells2D[firstIndex][secondIndex].dataset.ship == String(true) || cells2D[firstIndex][secondIndex].dataset.cantPlace == String(true)) {
            return false;
        }
    }
    return true;

}

function IsCanPlaceVerUp(cells, size, firstIndex) {
    for (let i = 0; i < size * side; i += parseInt(side)) {
        console.log("firstIndex: " + firstIndex);
        console.log(cells[firstIndex]);

        // if (firstIndex + size >= side * side || firstIndex + 1 >= side * side) {
        //     return false;
        // }
        // else if (firstIndex - side < 0 || firstIndex - 1 < 0) {
        //     return false;
        // }
        if (firstIndex - i >= 0) {
            if (cells[firstIndex - i].dataset.cantPlace == String(true)) {
                return false;
            }
            if (cells[firstIndex - i + 1].dataset.ship == String(true)) {
                return false;
            }
            if (firstIndex - i - 1 >= 0) {
                if (cells[firstIndex - i - 1].dataset.ship == String(true)) {
                    return false;
                }
            }
            if (firstIndex - i - side >= 0) {
                if (cells[firstIndex - i - side].dataset.cantPlace == String(true)) {
                    return false;
                }
            }
        }




    }
    return true;
}
function IsCanPlaceVerDown(cells, size, firstIndex) {
    if (firstIndex + size * side + side > side * side) {
        return false;
    }

    for (let i = 0; i < size * side; i += parseInt(side)) {
        console.log("firstIndex: " + firstIndex);
        console.log(cells[firstIndex]);

        if (firstIndex + size >= side * side || firstIndex + 1 >= side * side) {
            return false;
        }
        if (cells[firstIndex + i].dataset.cantPlace == String(true)) {
            return false;
        }
        else if (cells[firstIndex + i - 1].dataset.ship == String(true)) {
            return false;
        }

        else if (cells[firstIndex + i + 1].dataset.ship == String(true)) {
            return false;
        }

    }
    if (cells[firstIndex + size * side].dataset.cantPlace == String(true)) {
        return false;
    }
    return true;
}
function IsCanPlaceHorL(cells2D, size, firstIndex, secondIndex) {

    for (let i = 0; i < size; i++) {
        console.log("firstIndex: " + firstIndex + "\n" + "secondIndex: " + secondIndex);
        console.log(cells2D[firstIndex][secondIndex]);

        if (firstIndex > 0) {
            if (cells2D[firstIndex - 1][secondIndex - i].dataset.ship == String(true)) {
                return false;
            }
        }
        if (firstIndex < side - 1) {
            if (cells2D[firstIndex + 1][secondIndex - i].dataset.ship == String(true)) {
                return false;
            }
        }
        if (secondIndex == 1) {
            if (cells2D[firstIndex][secondIndex - 1].dataset.ship == String(true)) {
                return false;
            }
        }
        else if (secondIndex != side - 1) {
            if (secondIndex + 1 % side != 0) {
                if (cells2D[firstIndex][secondIndex + 1].dataset.ship == String(true)) {
                    return false;
                }
            }
        }
        else if (secondIndex - i > 0) {
            if ((secondIndex - i - 1) % side != 0) {
                if (cells2D[firstIndex][secondIndex - i - 1].dataset.ship == String(true)) {
                    return false;
                }
            }
        }

        if (cells2D[firstIndex][secondIndex].dataset.ship == String(true) || cells2D[firstIndex][secondIndex].dataset.cantPlace == String(true)) {
            return false;
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

    let firstIndex;
    let secondIndex;
    let direction = Random(1, 5)

    switch (direction) {

        case 1://ימינה
            while (!flag) {
                let cells2D = create2DArray(cells, side);
                firstIndex = Random(0, side);
                secondIndex = Random(0, (side - size));
                flag = IsCanPlaceHorR(cells2D, size, firstIndex, secondIndex);

                if (flag) {

                    for (let i = 0; i < size; i++) {

                        cells2D[firstIndex][secondIndex + i].dataset.ship = true;
                        console.log(cells2D[firstIndex][secondIndex + i]);
                        cells2D[firstIndex][secondIndex + i].classList.add('ship');

                        cells2D[firstIndex][secondIndex + i].dataset.cantPlace = true;
                        if (firstIndex != 0) {
                            cells2D[firstIndex - 1][secondIndex + i].dataset.cantPlace = true;
                        }
                        if (firstIndex != side - 1) {
                            cells2D[firstIndex + 1][secondIndex + i].dataset.cantPlace = true;
                        }
                        try {
                            cells2D[firstIndex][secondIndex + i - 1].dataset.cantPlace = true;
                            cells2D[firstIndex][secondIndex + i + 1].dataset.cantPlace = true;
                            cells2D[firstIndex][secondIndex + i].dataset.cantPlace = true;
                            cells2D[firstIndex][secondIndex + i].dataset.cantPlace = true;
                        } catch (error) {

                        }
                    }
                }
            }

            break;
        case 2://למעלה
            while (!flag) {

                firstIndex = Random((side * size) - side, side * side) // מהאינקס הכי קטן למיקום ספינה על פי הגודל עד האינדקב האחרון בלוח
                flag = IsCanPlaceVerUp(cells, size, firstIndex)
                if (flag) {
                    for (let i = 0; i < size * side; i += parseInt(side)) {
                        cells[firstIndex - i].dataset.ship = true;
                        cells[firstIndex - i].classList.add('ship');
                        cells[firstIndex - i].dataset.cantPlace = true;

                        if (firstIndex % side != 0) {
                            cells[firstIndex - i - 1].dataset.cantPlace = true;

                        }
                        try {
                            cells[firstIndex - i - side].dataset.cantPlace = true;
                            cells[firstIndex - i + 1].dataset.cantPlace = true;
                            cells[firstIndex - i + side].dataset.cantPlace = true;

                        } catch (error) {

                        }
                    }
                }

            }
            break;
        case 3://שמאלה
            while (!flag) {
                let cells2D = create2DArray(cells, side);
                firstIndex = Random(0, side);
                secondIndex = Random(side - size, side);

                flag = IsCanPlaceHorL(cells2D, size, firstIndex, secondIndex);

                if (flag) {

                    for (let i = 0; i < size; i++) {
                        console.log(firstIndex, secondIndex);
                        cells2D[firstIndex][secondIndex - i].dataset.ship = true;

                        cells2D[firstIndex][secondIndex - i].classList.add('ship');

                        cells2D[firstIndex][secondIndex - i].dataset.cantPlace = true;

                        if (firstIndex > 0) {
                            cells2D[firstIndex - 1][secondIndex - i].dataset.cantPlace = true;
                        }
                        if (firstIndex < side - 1) {
                            cells2D[firstIndex + 1][secondIndex - i].dataset.cantPlace = true;
                        }
                        if (secondIndex - i >= 0) {
                            cells2D[firstIndex][secondIndex - i].dataset.cantPlace = true;
                            if (secondIndex - i > 0) {
                                cells2D[firstIndex][secondIndex - i - 1].dataset.cantPlace = true;
                            }
                        }
                        if (secondIndex + 1 < side) {
                            cells2D[firstIndex][secondIndex - i + 1].dataset.cantPlace = true;
                        }

                    }
                }
            }

            break;
        case 4://למטה
            while (!flag) {

                firstIndex = Random(1, (side * side) - (side * size) + (side)); // מאפס עד התא האחרון שאפשר למקם ספינה לפי גודלה
                flag = IsCanPlaceVerDown(cells, size, firstIndex);

                if (flag) {
                    for (let i = 0; i < size * side; i += side) {
                        cells[firstIndex + i].dataset.ship = true;
                        cells[firstIndex + i].classList.add('ship');
                        cells[firstIndex + i].dataset.cantPlace = true;
                        if ((firstIndex + 1) % side != 0) {
                            cells[firstIndex + i + 1].dataset.cantPlace = true;
                        }
                        try {
                            cells[firstIndex + i - 1].dataset.cantPlace = true;
                            cells[firstIndex + i + side].dataset.cantPlace = true;
                            cells[firstIndex + i - side].dataset.cantPlace = true;
                        } catch (error) {

                        }
                    }
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


