//Getting all data for game
function Data(event) {

    event.preventDefault();

    //getting grid size values
    
    let value = size.options[size.selectedIndex].value;
    console.log(value);
    // for (let i = 0; i < ships.length; i++) {
    //     shipSize[i] = ships[i].value;
    // }

    // clearGrid();

    //disableing form div
    form.disabled = true;
    form.classList.add('blur');

    Generate(value);
    PlaceShips(value);
}

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

        const div = document.createElement('div');

        //adding class
        //div.classList.add(i);//       היה

        //adding data-set  //         הוספתי 
        div.dataset.index = i;

        //adding click event
        // div.addEventListener('click', Attack);

        //adding background
        //div.style.backgroundColor = '#11270B';//       היה

        //adding class for background //              הוספתי 
        div.classList.add(`cell`);


        //adding div to page
        game.appendChild(div);
    }
};

//restart Func
function Restart() {
    //chack is it was start
}

function PlaceShips(grid){

    let ships = new Array();
    for (let i=0; i<grid*grid;i++){
        ships[i] = false;
        
    } 
    console.log(ships);


}