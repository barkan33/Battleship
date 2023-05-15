//Global vars

//turn and hit indicators
let turn_ind = document.getElementById('turn-ind');
let hit_ind = document.getElementById('hit-ind');

//getting grid size
let size = document.getElementById('grid-size');
let ships = document.querySelectorAll('#BS');
let shipSize = [""];
//launch button
const launch = document.querySelector('.launch');

//main game table
let game = document.getElementById('game-table');

function Main() {

    launch.addEventListener(`click`, Data);



}

Main();