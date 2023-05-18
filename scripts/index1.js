//Global vars

//turn and hit indicators
let turn_ind = document.getElementById('turn-ind');
let hit_ind = document.getElementById('hit-ind');

//getting grid size
// let shipSize = new Array();
// for (let i = 2; i<6;i++ ){
//     shipSize[i]=
// }

let size = document.getElementById('grid-size');
//launch button
const launch = document.querySelector('.launch');


//main game table
let game = document.getElementById('game-table');

//form div
let form = document.querySelector('.field');

function Main() {

    launch.addEventListener(`click`, Data);



}

Main();