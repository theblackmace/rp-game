import {characterData} from './data.js';
import {Character} from './character.js';

let monstersArray = ["orc", "demon", "goblin"];
let isWaiting = false;

const getNewMonster = () => monstersArray.length>0 ? (new Character(characterData[monstersArray.shift()])) : {};

function render() {
   document.getElementById('hero').innerHTML = wizard.getCharacterHtml();
   document.getElementById('monster').innerHTML = monster.getCharacterHtml();
}

document.querySelector('#attack-button').addEventListener('click', attack);

function attack() {
   if(!isWaiting){
      wizard.setDiceHtml();
      monster.setDiceHtml();
      wizard.takeDamage(monster.currentDiceScore);
      monster.takeDamage(wizard.currentDiceScore);
      render();
      
      if(wizard.dead){
         document.querySelector('#attack-button').style.cursor = 'not-allowed';
         setTimeout(endGame, 1000);
      }
      else if(monster.dead){
         document.querySelector('#attack-button').style.cursor = 'not-allowed';
         isWaiting = true;
         if(monstersArray.length > 0){
            setTimeout(()=>{
               monster = getNewMonster();
               render();
               isWaiting = false;
            },1500);
            document.querySelector('#attack-button').style.cursor = 'default';
         }
         else{
            setTimeout(endGame, 1500);
         }
      }
   }
}

function endGame() {
   isWaiting = true;
   console.log('The game is over');

   const endMessage = wizard.health === 0 && monster.health === 0 ?
   "No victors - all creatures are dead" :
   wizard.health > 0 ? "The Wizard Wins" :
   "The Monsters are Victorious";

   const endEmoji = wizard.health > 0 ? '🔮' : '☠️';

   document.body.innerHTML = `
      <div class="end-game">
         <h2>Game Over</h2>
         <h3>${endMessage}</h3>
         <p class="end-emoji">${endEmoji}</p>
      </div>
   `
}

const wizard = new Character(characterData.hero);
let monster = getNewMonster();

render();