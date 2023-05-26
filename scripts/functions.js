let gameWasLunched = false;

//Gathering all data from field div- grid size, and number of ships of each size
function Data(event) {
    event.preventDefault();
    if (gameWasLunched) {
        //משהו לרענון או מחיקה
    }
    gameWasLunched = true;
    //getting grid size values

    grid = parseInt(size.options[size.selectedIndex].value);

    //number of each different sized ships
    shipsAmount = [shipSize5.value, shipSize4.value, shipSize3.value, shipSize2.value];

    //disableing form div
    // form.disabled = true;
    form.classList.add('after');
    // score.classList.add('shown')


    Generate(grid);
    console.log(grid);
}


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
            let cell = document.createElement(`td`);
            //adding numerical value to each td
            cell.dataset.index = index;
            //bool indicating presence of ship in specific td
            cell.dataset.ship = false;
            //bool preventing from placing a ship if theres one already or adjacent to it
            cell.dataset.cantPlace = false;
            cell.classList.add('titi');
            cell.addEventListener('click', Attack);

            //appending the ready cell to the row
            row.appendChild(cell);

            //assiging numerical index to the array specifying the cell it represents
            boardArr[i][j] = index++;

        }
        //finally appendind the ready row to the table
        tbl.appendChild(row);
    }

    console.log(tbl);

    //appending the final table to the container
    game.appendChild(tbl);


    //console.log(amount_score);
    //ScoreTable(shipsAmount);
    placeShips(shipsAmount);

}

//activating function that places ships in cells, sending to it how many ships of each size to place
function placeShips(shipsAmount) {

    let counter = 0;
    for (let shipSize = 5; shipSize >= 2; shipSize--) {
        for (let j = 0; j < shipsAmount[counter]; j++) {
            ShipOf(shipSize);
            UpdateScore(shipSize)
        }
        counter++;
    }
    console.log(shipsAmount);
}
//פונקציה הנותנת ללוח התוצאות את כמות הספינות מכל סוג
function UpdateScore(size) {
    let remaining = document.querySelector(`#amount${size}`);
    let value = parseInt(remaining.innerHTML);
    remaining.innerHTML = value + 1;
}
// function ScoreTable(value) {

//     for (let i = 0; i < value.length; i++) {
//         amount_score[i] += `${value[i]}`;
//     }

// }

//פונקציה לבדיקה אנחי למעלה
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
//פונקציה לבדיקה אנחי למטה
function IsCanPlaceVerDown(cells2D, size, firstIndex, secondIndex) {
    for (let i = 0; i <= size; i++) {
        if (firstIndex + i < grid) {
            if (cells2D[firstIndex + i][secondIndex].dataset.cantPlace == String(true)) {
                return false;
            }
        }
    }
    return true;
}
//פונקציה לבדיקה אופקי ימינה
function IsCanPlaceHorR(cells2D, size, firstIndex, secondIndex) {
    for (let i = 0; i <= size + 1; i++) {
        if (secondIndex + i < grid) {
            if (cells2D[firstIndex][secondIndex + i].dataset.cantPlace == String(true)) {
                return false;
            }
        }
    }
    return true;
}
//פונקציה לבדיקה אופקי שמאלה
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


function ShipOf(size) {
    let flag = false;
    let cells = document.querySelectorAll('.titi');
    console.log(cells);
    let cells2D = create2DArray(cells, grid);
    let firstIndex;
    let secondIndex;
    let direction = Random(1, 5)

    switch (direction) {

        case 1://ימינה
            while (!flag) {
                firstIndex = Random(0, grid);
                secondIndex = Random(0, (grid - size));
                flag = IsCanPlaceHorR(cells2D, size, firstIndex, secondIndex);

                if (flag) {
                    console.log((cells2D[firstIndex][secondIndex]), direction);
                    for (let i = 0; i < size; i++) {

                        cells2D[firstIndex][secondIndex + i].dataset.ship = true;
                        cells2D[firstIndex][secondIndex + i].dataset.size = size;
                        cells2D[firstIndex][secondIndex + i].classList.add('ship');
                        cells2D[firstIndex][secondIndex + i].dataset.cantPlace = true;


                        if (firstIndex - 1 >= 0) {
                            cells2D[firstIndex - 1][secondIndex + i].dataset.cantPlace = true;
                        }
                        if (firstIndex + 1 < grid) {
                            cells2D[firstIndex + 1][secondIndex + i].dataset.cantPlace = true;
                        }
                        if (secondIndex + i - 1 >= 0) {
                            cells2D[firstIndex][secondIndex + i - 1].dataset.cantPlace = true;
                        }
                        if (secondIndex + i + 1 < grid) {
                            cells2D[firstIndex][secondIndex + i + 1].dataset.cantPlace = true;
                        }
                    }
                }
            }

            break;
        case 2://למעלה
            while (!flag) {
                firstIndex = Random(size, grid) // מהאינקס הכי קטן למיקום ספינה על פי הגודל עד האינדקב האחרון בלוח
                secondIndex = Random(0, grid);
                flag = IsCanPlaceVerUp(cells2D, size, firstIndex, secondIndex)

                if (flag) {
                    console.log((cells2D[firstIndex][secondIndex]), direction);
                    for (let i = 0; i < size; i++) {
                        cells2D[firstIndex - i][secondIndex].dataset.ship = true;
                        cells2D[firstIndex - i][secondIndex].dataset.size = size;
                        cells2D[firstIndex - i][secondIndex].classList.add('ship');
                        cells2D[firstIndex - i][secondIndex].dataset.cantPlace = true;

                        if (firstIndex - i - 1 >= 0) {
                            cells2D[firstIndex - i - 1][secondIndex].dataset.cantPlace = true;
                        }
                        if (firstIndex - i + 1 < grid) {
                            cells2D[firstIndex - i + 1][secondIndex].dataset.cantPlace = true;
                        }
                        if (secondIndex + 1 < grid) {
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
                firstIndex = Random(0, grid);
                secondIndex = Random(size, grid);

                flag = IsCanPlaceHorL(cells2D, size, firstIndex, secondIndex);

                if (flag) {
                    console.log((cells2D[firstIndex][secondIndex]), direction);
                    for (let i = 0; i < size; i++) {
                        cells2D[firstIndex][secondIndex - i].dataset.ship = true;
                        cells2D[firstIndex][secondIndex - i].dataset.size = size;
                        cells2D[firstIndex][secondIndex - i].classList.add('ship');
                        cells2D[firstIndex][secondIndex - i].dataset.cantPlace = true;

                        if (firstIndex - 1 >= 0) {
                            cells2D[firstIndex - 1][secondIndex - i].dataset.cantPlace = true;
                        }
                        if (firstIndex + 1 < grid) {
                            cells2D[firstIndex + 1][secondIndex - i].dataset.cantPlace = true;
                        }
                        if (secondIndex - i - 1 >= 0) {
                            cells2D[firstIndex][secondIndex - i - 1].dataset.cantPlace = true;
                        }
                        if (secondIndex - i + 1 < grid) {
                            cells2D[firstIndex][secondIndex - i + 1].dataset.cantPlace = true;
                        }

                    }
                }
            }

            break;
        case 4://למטה
            while (!flag) {
                firstIndex = Random(0, grid - size) // מהאינקס הכי קטן למיקום ספינה על פי הגודל עד האינדקב האחרון בלוח
                secondIndex = Random(0, grid);

                flag = IsCanPlaceVerDown(cells2D, size, firstIndex, secondIndex);

                if (flag) {
                    console.log((cells2D[firstIndex][secondIndex]), direction);
                    for (let i = 0; i < size; i++) {
                        cells2D[firstIndex + i][secondIndex].dataset.ship = true;
                        cells2D[firstIndex + i][secondIndex].dataset.size = size;
                        cells2D[firstIndex + i][secondIndex].classList.add('ship');
                        cells2D[firstIndex + i][secondIndex].dataset.cantPlace = true;

                        if (firstIndex + i + 1 < grid) {
                            cells2D[firstIndex + i + 1][secondIndex].dataset.cantPlace = true;
                        }
                        if (firstIndex + i - 1 >= 0) {
                            cells2D[firstIndex + i - 1][secondIndex].dataset.cantPlace = true;
                        }
                        if (secondIndex + 1 < grid) {
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

}


function Random(min, max) {
    let num = Math.floor(Math.random() * (max - min) + min);
    return num;
}



function create2DArray(arr, grid) {
    if (arr.length !== grid * grid) {
        console.log("invalid arr");
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


function Attack() {
    const rocket_whistle = new Audio('/styles/Assets/rocket_whistle.mp3');
    const splash = new Audio('/styles/Assets/splash.mp3');
    const boom = new Audio('/styles/Assets/boom.mp3');
    rocket_whistle.play();

    setTimeout(() => {
        if (this.classList.contains('wasBoom')) {

        }
        else if (this.dataset.ship == String(true)) {
            this.classList.add('wasBoom');
            boom.play();
            CheckWholeShip(this);
        }
        else {
            this.classList.add('hited');
            splash.play();
        }
    }, 600)



}
function CheckWholeShip(cell) {
    let index = parseInt(cell.dataset.index)
    let x = parseInt(index / 10);
    let y = parseInt(index % 10);

    let cells = document.querySelectorAll('.titi');
    let cells2D = create2DArray(cells, grid);
    let r = 0;
    let l = 0;
    let d = 0;
    let u = 0;

    for (let i = 0; i < cells2D.length - x; i++) {
        if (cells2D[x + i][y].classList.contains('wasBoom')) {
            r++;
        }

    }
    for (let i = 0; i <= x; i++) {
        if (cells2D[x - i][y].classList.contains('wasBoom')) {
            l++;
        }

    } for (let i = 0; i < cells2D.length - y; i++) {
        if (cells2D[x][y + i].classList.contains('wasBoom')) {
            d++;
        }

    } for (let i = 0; i <= y; i++) {
        if (cells2D[x][y - i].classList.contains('wasBoom')) {
            console.log("fuck");
            u++;
        }
    }
    if (parseInt(r) == parseInt(cells2D[x][y].dataset.size) || parseInt(l) == parseInt(cells2D[x][y].dataset.size) || parseInt(d) == parseInt(cells2D[x][y].dataset.size) || parseInt(u) == parseInt(cells2D[x][y].dataset.size)) {
        ChangeScore(parseInt(cells2D[x][y].dataset.size));
    }
    console.log(`r = ${r}, l = ${l}, d = ${d}, u = ${u}`);
}

//פונקציה לעדכון לוח התוצאות
function ChangeScore(size) {
    //תפיסה של התגית שמייצגת את הגודל של הספינה שצריך לשנות
    let remaining = document.querySelector(`#amount${size}`);
    //שמירת הערך שבתגית וחיסור של 1
    let value = parseInt(remaining.innerHTML) - 1;
    //השמה של הערך החדש בתגית
    remaining.innerHTML = value
}
