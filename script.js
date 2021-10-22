const box = document.querySelectorAll('.box')
var win = document.getElementById("winner");
let o = document.querySelector("img:nth-child(1)");
let x = document.querySelector("img:nth-child(2)");
var bool = true;

// To show next player's turn 
function turn1(){
  x.style.border = "2px solid green";
  o.style.border = " none";
  bool = false;
}
function turn2(){
  o.style.border = "2px solid green";
  x.style.border = "none";
  bool = true;
}

// Adding event listner to every element using foreach 
box.forEach(element => {
    element.addEventListener("click", function(){
      // adding cross and o images 
      bool?(this.classList.add("o"), turn1()) : (this.classList.add("x"), turn2());
      // This one is for selecting the parent i.e container
      var parent = element.parentNode;
      // This one is to know the inedex of selected box 
      // so that we can add values to respective position in gamestate.
      var index = Array.prototype.indexOf.call(parent.children, element);
      bool? gameState[index] = "t": gameState[index] = "f";
      // stoping from changing values of already declared box 
      element.style.pointerEvents = "none";
      check();
    });
});

const gameState = ["","","","","","","","",""];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
function check() {
  for (let i = 0; i <= 7; i++) {
      // To try respective number of element in the array winningconditions
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      // if  any of the three a,b,c's are empty then continue
      if (a === "" || b === "" || c === "") {
          continue;
      }
      // checking conditions for winning
      else if (a === b && b === c){
        a === "t" ? win.innerText = "Winner is: Player 2" : win.innerText = "Winner is: Player 1";
        // disabling  the rest of the boxes after someone won the game
        box.forEach(e => {e.style.pointerEvents = "none"}); 
        break
      }
      // checking for tie( using reduce that if every box is filled or not.)
      else if (gameState.reduce((arg1 ,arg2) => arg1 && arg2)){
        win.innerText = "Match Tied";
      }
  }
}
