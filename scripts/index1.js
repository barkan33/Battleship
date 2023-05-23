//Global vars

//turn and hit indicators
var turn_ind = document.getElementById('turn-ind');
var hit_ind = document.getElementById('hit-ind');

//grid size
var size = document.getElementById('grid-size');
var grid;

//ships
var shipSize2 = document.getElementById('BS2');
var shipSize3 = document.getElementById('BS3');
var shipSize4 = document.getElementById('BS4');
var shipSize5 = document.getElementById('BS5');

var shipsAmount = new Array();

// let shipsSizeArr = [2, 3, 4, 5];

var boolOfWhareCantPlace = new Array();

//launch button
var launch = document.querySelector('.launch');


//main game table
var game = document.getElementById('game-table');

//form div
var form = document.querySelector('.field');

function Main() {
    
    launch.addEventListener(`click`, Data);
    
    let rnd = Math.floor(Math.random() * 100);
    
    console.log('let rnd =  Math.floor(Math.random() * 100) = ' + rnd);



}

Main();