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

    var value = size.options[size.selectedIndex].value;
    console.log(value);

    //number of each different sized ships
    var shipsAmount = [shipSize2.value, shipSize3.value, shipSize4.value, shipSize5.value];


    //disableing form div
    form.disabled = true;
    form.classList.add('blur');

    Generate(value);
    PlaceShips(shipsAmount, value);
    //PlaceShips(value, shipsAmount);
    // PlaceShipsTEST(shipsAmount, value);

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

        var div = document.createElement('div');

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

    let divi = div.dataset.index = 28;
    console.log(divi);
}

function PlaceShips(shipAmount) {

    let count=0;

    for (let i = 2; i <= 5; i++) {

        for (let j = 0; j < shipAmount[count]; j++) {
            ShipOf(i)
            count++;
        }
    }
}

function ShipOf(size, grid) {

    let firstIndex;
    let direction = Random(1, 5);

    switch(direction){
        //right
        case 1:
            firstIndex = Random(grid, grid);

            for(let i =0 ; i < size; i++){
                
                if((CheckAvailability(size,direction, firstIndex))== true){
                    div.setAttribute('data')
                }
            }
    }


}





function Random(min, max) {
    let num = Math.floor(Math.random() * (max - min) + min);
    return num;
}


function CheckAvailability(size, direction, firstIndex) {

    let canPlace = true;
    //בדיקת כל הדיבים ההכרחיים לספינה
    for(let i = 0; i < size; i++){
        if(div.getAttribute('data-bool') == false)
            canPlace = false;
        }
        return canPlace;
}




//restart Func
function Restart() {
    //check is it was start
}