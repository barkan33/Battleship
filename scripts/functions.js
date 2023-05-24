

//Gathering all data from field div- grid size, and number of ships of each size
function Data(event) {

    event.preventDefault();

    //getting grid size values

    grid = parseInt(size.options[size.selectedIndex].value);

    //number of each different sized ships
    shipsAmount = [shipSize2.value, shipSize3.value, shipSize4.value, shipSize5.value];

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
            cell.style.cursor = "pointer";

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


    console.log(amount_score);
    ScoreTable(shipsAmount);
    placeShips(shipsAmount);
    
}

//activating function that places ships in cells, sending to it how many ships of each size to place
function placeShips(shipsAmount) {

    let counter = 0;
    for (let i = 5; i >= 2; i--) {
        for (let j = 0; j < shipsAmount[counter]; j++) {
            ShipOf(i);
        }
        counter++;
    }
    console.log(shipsAmount);
}

function ScoreTable(value){

    for (let i =0; i < value.length;i++){
        amount_score[i] += `${value[i]}`;
    }

}

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


function Random(min,max){
    let num = Math.floor(Math.random()* (max-min) + min);
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


function Attack(){

    if (this.dataset.ship == String(true)){
        this.style.backgroundColor = "red";
        
    }


}