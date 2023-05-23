

//Gathering all data from field div- grid size, and number of ships of each size
function Data(event) {

    event.preventDefault();

    //getting grid size values

    grid = size.options[size.selectedIndex].value;

    //number of each different sized ships
    shipsAmount = [shipSize2.value, shipSize3.value, shipSize4.value, shipSize5.value];

    //disableing form div
    form.disabled = true;
    form.classList.add('blur');


    Generate(grid);
    console.log(grid);
}



/*function Generate(grid) {

    let row = "", column = "";
    for (let i = 0; i < grid; i++) {
        row += "1fr ";
        column += "1fr ";
    }

    //generating game grid
    game.style.gridTemplateColumns = column;
    game.style.gridTemplateRows = row;

    //generating divs with id's
    for (let i = 0; i < grid * grid; i++) {

        var div = document.createElement('div');

        div.dataset.index = i + 1;
        div.dataset.bool = false;

        //adding click event
        // div.addEventListener('click', Attack);

        //adding class for background
        div.classList.add(`cell`);


        //adding div to page
        game.appendChild(div);
    }
    placeShips();
}*/

//generating and appending table elements to the game container

function Generate(grid) {

    //boardArr- each table sqaure is an element in this array
    let boardArr = new Array;
    let index = 0;
    const tbl = document.createElement("table");

    for (let i = 0; i < grid; i++) {

        boardArr[i] = new Array;

        //creating row
        let row = document.createElement("tr");

        for (let j = 0; j < grid; j++) {

            //creating columns
            var cell = document.createElement(`td`);
            //adding numerical value to each td
            cell.dataset.index = index;
            //bool indicating presence of ship in specific td
            cell.dataset.ship = false;
            //bool preventing from placing a ship if theres one already or adjacent to it
            cell.dataset.cantPlace = false;

            //appending the ready cell to the row
            row.appendChild(cell);

            //assiging numerical index to the array specifying the cell it represents
            boardArr[i][j] = index++;

        }
        //finally appendind the ready row to the table
        tbl.appendChild(row);
    }


    //appending the final table to the container
    game.appendChild(tbl);

    placeShips(shipsAmount);
}

//activating function that places ships in cells, sending to it how many ships of each size to place
function placeShips(shipsAmount) {

    for (let i = 2; i <= 5; i++) {
        for (let j = 0; j < shipsAmount; j++) {
            ShipOf(i)
        }
    }
    console.log(shipsAmount);
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
        if (firstIndex < grid - 1) {
            if (cells2D[firstIndex + 1][secondIndex + i].dataset.ship == String(true)) {
                return false;
            }
        }
        if (secondIndex > 0) {
            if (cells2D[firstIndex][secondIndex + i - 1].dataset.ship == String(true)) {
                return false;
            }
        }
        if (secondIndex == grid - 2) {
            if (cells2D[firstIndex][secondIndex + 1].dataset.ship == String(true)) {
                return false;
            }
        }
        else if (secondIndex + i < grid) {
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
    for (let i = 0; i < size * grid; i += parseInt(grid)) {
        console.log("firstIndex: " + firstIndex);
        console.log(cells[firstIndex]);

        // if (firstIndex + size >= grid * grid || firstIndex + 1 >= grid * grid) {
        //     return false;
        // }
        // else if (firstIndex - grid < 0 || firstIndex - 1 < 0) {
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
            if (firstIndex - i - grid >= 0) {
                if (cells[firstIndex - i - grid].dataset.cantPlace == String(true)) {
                    return false;
                }
            }
        }
    }
    return true;
}

function IsCanPlaceVerDown(cells, size, firstIndex) {
    if (firstIndex + size * grid + grid > grid * grid) {
        return false;
    }

    for (let i = 0; i < size * grid; i += parseInt(grid)) {
        console.log("firstIndex: " + firstIndex);
        console.log(cells[firstIndex]);

        if (firstIndex + size >= grid * grid || firstIndex + 1 >= grid * grid) {
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
    if (cells[firstIndex + size * grid].dataset.cantPlace == String(true)) {
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
        if (firstIndex < grid - 1) {
            if (cells2D[firstIndex + 1][secondIndex - i].dataset.ship == String(true)) {
                return false;
            }
        }
        if (secondIndex == 1) {
            if (cells2D[firstIndex][secondIndex - 1].dataset.ship == String(true)) {
                return false;
            }
        }
        else if (secondIndex != grid - 1) {
            if (secondIndex + 1 % grid != 0) {
                if (cells2D[firstIndex][secondIndex + 1].dataset.ship == String(true)) {
                    return false;
                }
            }
        }
        else if (secondIndex - i > 0) {
            if ((secondIndex - i - 1) % grid != 0) {
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


function ShipOf(size) {

    //bool indicating the specific cell is available
    let flag = false;
    let cells = document.querySelectorAll('td');
    console.log(cells);


    let firstIndex;
    let secondIndex;
    let direction = Random(1, 5)

    switch (direction) {

        case 1://ימינה
            while (!flag) {

                //creating 2d array containing original array of table cells
                let cells2D = create2DArray(cells, grid);
                //random start index of ship (row)
                firstIndex = Random(0, grid);
                //random start index (column)
                secondIndex = Random(0, (grid - size));
                //checking if horizontal space sufficient for placing a ship
                flag = IsCanPlaceHorR(cells2D, size, firstIndex, secondIndex);

                if (flag) {

                    for (let i = 0; i < size; i++) {
                        //first index of array- placing a ship
                        cells2D[firstIndex][secondIndex + i].dataset.ship = true;
                        console.log(cells2D[firstIndex][secondIndex + i]);
                        //adding relevant class for css purposes
                        cells2D[firstIndex][secondIndex + i].classList.add('ship');
                        //declaring this index as unavailable for a ship
                        cells2D[firstIndex][secondIndex + i].dataset.cantPlace = true;


                        if (firstIndex != 0) {
                            //declaring the cell "beneath" the ship as unavailable
                            cells2D[firstIndex - 1][secondIndex + i].dataset.cantPlace = true;
                        }
                        //declaring the cell on the right of the ship as unavailable
                        if (firstIndex != grid - 1) {
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

                firstIndex = Random((grid * size) - grid, grid * grid) // מהאינקס הכי קטן למיקום ספינה על פי הגודל עד האינדקב האחרון בלוח
                //checking availability of cells needed to place ship vertically and "up"
                flag = IsCanPlaceVerUp(cells, size, firstIndex)
                if (flag) {
                    //this for loop "jumps" to same column, higher row
                    for (let i = 0; i < size * grid; i += parseInt(grid)) {
                        cells[firstIndex - i].dataset.ship = true;
                        cells[firstIndex - i].classList.add('ship');
                        cells[firstIndex - i].dataset.cantPlace = true;

                        if (firstIndex % grid != 0) {
                            cells[firstIndex - i - 1].dataset.cantPlace = true;

                        }
                        try {
                            cells[firstIndex - i - grid].dataset.cantPlace = true;
                            cells[firstIndex - i + 1].dataset.cantPlace = true;
                            cells[firstIndex - i + grid].dataset.cantPlace = true;

                        } catch (error) {

                        }
                    }
                }

            }
            break;
        case 3://שמאלה
            while (!flag) {
                let cells2D = create2DArray(cells, grid);
                firstIndex = Random(0, grid);
                secondIndex = Random(grid - size, grid);

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
                        if (firstIndex < grid - 1) {
                            cells2D[firstIndex + 1][secondIndex - i].dataset.cantPlace = true;
                        }
                        if (secondIndex - i >= 0) {
                            cells2D[firstIndex][secondIndex - i].dataset.cantPlace = true;
                            if (secondIndex - i > 0) {
                                cells2D[firstIndex][secondIndex - i - 1].dataset.cantPlace = true;
                            }
                        }
                        if (secondIndex + 1 < grid) {
                            cells2D[firstIndex][secondIndex - i + 1].dataset.cantPlace = true;
                        }

                    }
                }
            }

            break;
        case 4://למטה
            while (!flag) {

                firstIndex = Random(1, (grid * grid) - (grid * size) + (grid)); // מאפס עד התא האחרון שאפשר למקם ספינה לפי גודלה
                flag = IsCanPlaceVerDown(cells, size, firstIndex);

                if (flag) {
                    for (let i = 0; i < size * grid; i += grid) {
                        cells[firstIndex + i].dataset.ship = true;
                        cells[firstIndex + i].classList.add('ship');
                        cells[firstIndex + i].dataset.cantPlace = true;
                        if ((firstIndex + 1) % grid != 0) {
                            cells[firstIndex + i + 1].dataset.cantPlace = true;
                        }
                        try {
                            cells[firstIndex + i - 1].dataset.cantPlace = true;
                            cells[firstIndex + i + grid].dataset.cantPlace = true;
                            cells[firstIndex + i - grid].dataset.cantPlace = true;
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

function create2DArray(arr, grid) {
    if (arr.length !== grid * grid) {
        throw new Error('Input array size does not match the desired 2D dimensions.');
    }

    let result = [];
    let index = 0;

    for (let i = 0; i < grid; i++) {
        let row = [];

        for (let j = 0; j < grid; j++) {
            row.push(arr[index]);
            index++;
        }

        result.push(row);
    }

    return result;
}
