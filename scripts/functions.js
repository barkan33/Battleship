//Getting all data for game
function Data(event) {

    event.preventDefault();

    //getting grid size values
    
    let value = size.options[size.selectedIndex].value;
    console.log(value);

    //number of each different sized ships
    let ships = [shipSize2.value, shipSize3.value, shipSize4.value, shipSize5.value];
    



    //disableing form div
    form.disabled = true;
    form.classList.add('blur');

    Generate(value);
    PlaceShips(value, ships);
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

        //adding data-set  //         הוספתי 
        div.dataset.index = i+1;

        //adding click event
        // div.addEventListener('click', Attack);

        //adding class for background //              הוספתי 
        div.classList.add(`cell`);

        //adding div to page
        game.appendChild(div);
    }
    let divs = document.querySelectorAll('.cell');
    console.log(divs);
};

//restart Func
function Restart() {
    //chack is it was start
}

function PlaceShips(grid, ships){

    
    

    //creating boolean grid (set to false first)
    for (let i=1; i < grid*grid;i++){
        bool[i] = false;
        //ships of length 2
        for (let j = 0; j < ships[0];j++ ){

            //random row number
            let rnd =  Math.floor(Math.random() * (grid*grid));
            for (let n = 1; n <= 2; n++){
                let check = CheckPlaceShips(grid, 2, bool, rnd);
                while(check = true){
                    bool[rnd] = true;
                    bool[rnd + 1] = true; 
                }

            }

    
        }

        // אם הדיבים נבדקו וניתן למקם ספינות- להוסיף צבע רקע כתום 
        // if(bool[i] == true){
        //     divs[i].style.backgroundColor = 'orange';
        // }
    } 
    console.log(bool);
}

function CheckPlaceShips(grid, shipSize, bool, rnd){
    

    //פה צריך לעשות את התנאי הבא לפי איזה גודל ספינה בודקים
    if(bool[rnd] == false && bool[rnd+1] == false){
        return true;
    }

    //לדוגמא פה תהיה בדיקה לגודל 3 עם אותו התנאי והוספת סעיף בדיקה

}