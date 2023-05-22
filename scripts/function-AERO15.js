function StartGame(event) {
    event.preventDefault();
    let form = document.querySelector('form');
    let BG = document.querySelector('#BG');
    form.classList.add('hide');
    // BG.classList.add('hide');
    console.log(`side: ${side}`)
    BoardCreate(side);

}

function BoardCreate(side) {
    let boardArr = new Array;
    let index = 0;
    const tbl = document.createElement("table");
    for (let i = 0; i < side; i++) {
        boardArr[i] = new Array;
        let row = document.createElement("tr");

        for (let j = 0; j < side; j++) {

            let cell = document.createElement(`td`);
            cell.dataset.index = index;
            cell.addEventListener('click',Attack());
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


}
function ShipOf(size) {
    let cells = document.querySelectorAll('td');
    // let firstIndex = Random(0, side * side)
    let firstIndex;
    // cells[firstIndex].innerHTML = "S"
    let direction = Random(4, 5)
    switch (direction) {
        case 1://ימינה
            // if (firstIndex + size) { ////////////////////////////////////////////////
            //     cells[firstIndex].innerHTML = " "
            //     alert('over')
            // }
            firstIndex = Random(0, side * side)


            for (let i = 0; i < size; i++) {
                cells[firstIndex + i].innerHTML = "S"
            }

            break;
        case 2://למטה
            firstIndex = Random(0, 60)

            for (let i = 0; i < size * 10; i += 10) {
                cells[firstIndex + i].innerHTML = "S"
            }

            break;
        case 3://שמאלה
            firstIndex = Random(0, side * side)

            if (firstIndex - size < 0) {
                firstIndex = Random(0, side * side)
            }
            else {
                for (let i = 0; i <= size; i++) {
                    cells[firstIndex - i].innerHTML = "S"
                }
            }
            break;
        case 4://למעלה
            firstIndex = Random(40, side * side)
            for (let i = 0; i < size * 10; i += 10) {
                cells[firstIndex - i].innerHTML = "S"
            }
            break;
    }
}

function Random(min, max) {
    let num = Math.floor(Math.random() * (max - min) + min);
    return num;
}

