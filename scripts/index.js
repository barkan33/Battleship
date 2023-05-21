// let side = parseInt(document.querySelector('input[name="board_Size"]:checked').value);
let side;

//let side = 10;

function Main() {
    let submit = document.querySelector(`#submit_btn`)
    submit.addEventListener('click', StartGame)
    console.log(side);
}
Main();