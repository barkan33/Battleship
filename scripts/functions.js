//Getting all data for game
function Data(event){

    event.preventDefault();

    //getting grid size values
    let value = size.options[size.selectedIndex].value;
    for(let i=0; i < ships.length; i++){
        shipSize[i] = ships[i].value;
    }

    // clearGrid();

    //disableing form div

    Generate(value);
}

function Generate(grid){

    let row = "", column= "";
    for(let i =0; i < grid;i++){
        row += "1fr ";
        column +="1fr ";
    }

    //generating game grid
    game.style.gridTemplateColumns = column;
    game.style.gridTemplateRows = row;

    //generating divs with id's
    for(let i =0; i < grid * grid; i++){

        const div = document.createElement('div');

        //adding class
        div.classList.add('div');
        div.classList.add('' +i);

        //adding click event
        // div.addEventListener('click', Attack);

        //adding background
        div.style.backgroundColor = '#11270B';
        div.style.outline = '1px solid #fcfcfc';

        //adding div to page
        game.appendChild(div);
    }
};
