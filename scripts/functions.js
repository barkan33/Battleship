//Getting all data for game
function Data(event){

    event.preventDefault();

    //getting grid size values
    let value = size.options[size.selectedIndex].value;
    for(let i=0; i < ships.length; i++){
        shipSize[i] = ships[i].value;
    }

    // clearGrid();
    Generate(value);
}

function Generate(grid){

    console.log(grid);
    //generating game grid
    for (let rows = 0; rows < grid; rows++) {
        for (let columns = 0; columns < grid; columns++) {
            game.append(`<div class="grid"></div>`);
        };
    };
};
