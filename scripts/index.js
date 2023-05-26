//Global vars

//turn and hit indicators
var turn_ind = document.getElementById('turn-ind');
var hit_ind = document.getElementById('hit-ind');
var win = document.getElementById('win');
//grid size
var size = document.getElementById('grid-size');
var grid;

//ships
var shipSize2 = document.getElementById('BS2');
var shipSize3 = document.getElementById('BS3');
var shipSize4 = document.getElementById('BS4');
var shipSize5 = document.getElementById('BS5');
var sum;

var shipsAmount = new Array();

// let shipsSizeArr = [2, 3, 4, 5];

var boolOfWhareCantPlace = new Array();

//launch button
var launch = document.querySelector('.launch');


//main game table
var game = document.querySelector('.table');

//form div
var form = document.querySelector('.field');
//score table
var score = document.querySelector('.score');

var reset = document.querySelector('.reset');


function Main() {
    launch.addEventListener(`click`, Data);

    score.classList.toggle('blurred');
}

Main();