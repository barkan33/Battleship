var cells = document.querySelectorAll('.cell');

//Getting all data for game
/**
 * The function "Data" handles the form submission, retrieves the grid size and number of ships,
 * disables the form, generates the game board, and places the ships on the board.
 * @param event - The event parameter is an object that represents an event that has occurred, such as
 * a button click or form submission. It is used in this function to prevent the default behavior of a
 * form submission, which would cause the page to reload.
 */
function Data(event) {

    event.preventDefault();

    //getting grid size values

    let value = size.options[size.selectedIndex].value;
    console.log(value);

    //number of each different sized ships
    let shipsAmount = [shipSize2.value, shipSize3.value, shipSize4.value, shipSize5.value];


    //disableing form div
    form.disabled = true;
    form.classList.add('blur');

    Generate(value);
    //PlaceShips(value, shipsAmount);
    PlaceShipsTEST(shipsAmount, value);



    //TEST
    // let divs = document.querySelectorAll('.cell');

    // for (let i = 0; i < cells.length; i++) {

    // for (let i = 0; i < divs.length; i++) {

    //     divs[i].innerHTML = i + 1;


    // }
    // for (let i = 0; i < divs.length; i++) {
    //     if (divs[i].dataset.bool) {

    //         divs[i].classList.add('red');

    //     }
    //     console.log(`cells[${i}].dataset.bool = ${divs[i].dataset.bool}`);
    //     console.log(`cells[${i}].classList = ${divs[i].classList}`);

    // }
}

/**
 * The function generates a game grid with clickable divs and adds data attributes and a class to each
 * div.
 * @param grid - The size of the game grid, which determines the number of rows and columns in the
 * grid.
 */
function Generate(grid) {

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

        let div = document.createElement('div');

        //adding data-set  //         הוספתי 
        div.dataset.index = i + 1;
        div.dataset.bool = false;

        //adding click event
        // div.addEventListener('click', Attack);

        //adding class for background
        div.classList.add(`cell`);


        //adding div to page
        game.appendChild(div);
    }
};

//restart Func
function Restart() {
    //check is it was start
}



// function PlaceShips(grid, ships) {

//     //creating boolean grid (set to false first)
//     for (let i = 1; i < grid * grid; i++) {
//         bool[i] = false;
//         //ships of length 2
//         for (let j = 0; j < ships[0]; j++) {

//             //random row number
//             let rnd = Math.floor(Math.random() * (grid * grid));
//             for (let n = 1; n <= 2; n++) {
//                 let check = CheckPlaceShips(grid, 2, bool, rnd);
//                 while (check == true) {
//                     bool[rnd] = true;
//                     bool[rnd + 1] = true;
//                     check = false; //אחרת יש לולאה אין סופית
//                     debugger
//                 }

//             }


//         }

//         // אם הדיבים נבדקו וניתן למקם ספינות- להוסיף צבע רקע כתום 
//         // if(bool[i] == true){
//         //     divs[i].style.backgroundColor = 'orange';
//         // }
//     }
//     console.log(bool);
// }

function PlaceShips(grid, shipsAmount) {
    //creating boolean grid (set to false first)
    for (let i = 0; i < grid * grid; i++) {
        boolOfShipPlace[i] = false;
    }

    for (let i= 0; i < shipsAmount.length; i++){


        for(let j = 0 ; j < shipsAmount[i]; j++){

            switch(i){
                case 0:
                    //random start ship location
                    let rnd = Random(grid*grid);
                    //checking space availability



            }
        }

    }
























    

    //ships of length
    // console.log('shipsAmount.lenght = ' + shipsAmount.length);
    // for (let i = 0; i < shipsAmount.length; i++) {
    //     ShipOf(shipsAmount[i], shipsSizeArr[i], grid)

    // }
    // אם הדיבים נבדקו וניתן למקם ספינות- להוסיף צבע רקע כתום 
    // if(bool[i] == true){
    //     divs[i].style.backgroundColor = 'orange';
    // }


    //שייוך המערך הבוליאני לתאים
    // כנראה זמני בשביל התמצאות קלה יותר
    // let divs = document.querySelectorAll('.cell');
    // for (let i = 0; i < divs.length; i++) {
    //     divs[i].dataset.bool = boolOfShipPlace[i];
    // }
}

function CheckAvailability(rnd, ) {


    switch(i){
        case 0:
            if (bool[rnd] == false && bool[rnd + 1] == false) {
                return true;
            }
            return false;
        case 1:
            if (bool[rnd] == false && bool[rnd + 1] == false && bool[rnd + 2] == false) {
                return true;
            }
            return false;
            

    }
    if (bool[rnd] == false && bool[rnd + 1] == false) {
        return true;
    }

}
function PlaceShipsTEST(shipsAmountArr, grid) {
    /* 
        // let shipSize2Amount = document.querySelector('input[name="BS2"]').value;
        // for (let i = 0; i < shipSize2Amount; i++)
        //     ShipOf(2)
    
        // let shipSize3Amount = document.querySelector('input[name="BS2"]').value;
        // for (let i = 0; i < shipSize3Amount; i++)
        //     ShipOf(3)
    
        // let shipSize4Amount = document.querySelector('input[name="BS4"]').value;
        // for (let i = 0; i < shipSize4Amount; i++)
        //     ShipOf(4)
    
        // let shipSize5Amount = document.querySelector('input[name="BS5"]').value;
        // for (let i = 0; i < shipSize5Amount; i++)
        //     ShipOf(5)
    
        // //////////////////////
    
        for (let i = 2; i <= 5; i++) {
            let shipAmount = document.querySelector(`input[name="BS${i}"]`).value;
            for (let j = 0; j < shipAmount; j++)
                ShipOf(i)
        }
       // ShipOf(5)
    */

    // for (let i = 0; i < shipsAmountArr.length; i++) {

    //     for (let j = 0; j < shipsAmountArr[i]; j++) {

    //         ShipOf(parseInt(shipsSizeArr[i]), grid)


    //     }

    // }




}
// function ShipOf(size, grid) {

//     let cells = document.querySelectorAll('.cell');
//     let firstIndex = Random(1, grid * grid)
//     cells[firstIndex].dataset.bool = true
//     let direction = Random(4, 5)

//     switch (direction) {
//         case 1://ימינה
//             if (false) {
//                 ClearGrid();
//                 ShipOf(size, grid);
//             }

//             for (let i = 0; i < size; i++) {
//                 cells[firstIndex + i].dataset.bool = true
//             }

//             break;

//         case 2://למטה
//             if (firstIndex + size * grid > grid * (grid - 1)) {
//                 ClearGrid();
//                 ShipOf(size, grid);
//             }

//             for (let i = 0; i < size * grid; i += grid) {
//                 cells[firstIndex + size].dataset.bool = true
//             }

//             break;
//         case 3://שמאלה
//             if (false) {
//                 ClearGrid();
//                 ShipOf(size, grid);
//             }
//             else {
//                 for (let i = 0; i <= size; i++) {
//                     cells[firstIndex - i].dataset.bool = true
//                 }
//             }
//             break;
//         case 4://למעלה
//             console.log("firstIndex = " + firstIndex);
//             console.log("size = " + size);
//             console.log("firstIndex - size = " + (firstIndex - size));
//             console.log("firstIndex - size * grid = " + (firstIndex - size * grid));

//             console.log(`
//             firstIndex = ${firstIndex}
//             size = ${size}
//             firstIndex - size = ${firstIndex - size}
//             firstIndex - size * grid =  ${firstIndex - size * grid}
//             `);


//             if (firstIndex - size * grid <= 0) {
//                 ClearGrid();
//                 ShipOf(size, grid);
//             }
//             for (let i = 0; i < size * grid; i += grid) {
//                 cells[firstIndex - grid].dataset.bool = true
//             }
//             break;
//     }
// }

function Random(min, max) {
    let num = Math.floor(Math.random() * (max - min) + min);
    return num;
}


// function ClearGrid() {

//     console.log("Cleaning");
//     let cells = document.querySelectorAll('.cell');
//     for (let i = 0; i < cells.length; i++) {
//         console.log(`cells[${i}].dataset.bool = ${cells[i].dataset.bool}`);
//         cells[i].dataset.bool = false;
//         console.log(`cells[${i}].classList = ${cells[i].classList}`);
//         cells[i].classList.remove('red');
//     }
// }
