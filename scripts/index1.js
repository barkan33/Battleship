//Global vars

//turn and hit indicators
let turn_ind = document.getElementById('turn-ind');
let hit_ind = document.getElementById('hit-ind');

//grid size
let size = document.getElementById('grid-size');

//ships

let shipSize2 = document.getElementById('BS2');
let shipSize3 = document.getElementById('BS3');
let shipSize4 = document.getElementById('BS4');
let shipSize5 = document.getElementById('BS5');

let bool = new Array();

//launch button
const launch = document.querySelector('.launch');


//main game table
let game = document.getElementById('game-table');

//form div
let form = document.querySelector('.field');

function Main() {

    launch.addEventListener(`click`, Data);

    let rnd =  Math.floor(Math.random() * 100);
    console.log(rnd);



}

Main();