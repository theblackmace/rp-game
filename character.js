import {getDicePlaceholderHtml, getDiceRollArray, getPercentage} from './utils.js';

function Character(data) {
    Object.assign(this, data);
    this.diceHtml = getDicePlaceholderHtml(this.diceCount);
    this.maxHealth = data.health;


    this.getCharacterHtml = function() {
        const {name, avatar, health, diceHtml} = this;
        const healthBar = this.getHealthBarHtml();

        return `
        <div class="character-card">
        <h4 class="name"> ${name} </h4>
        <img class="avatar" src="${avatar}"/>
        <p class="health">health: <b> ${health} </b></p>
        <div class="dice-container">${diceHtml}</div>
        ${healthBar} 
        </div>
        `;
    }

    this.setDiceHtml = function() {
        this.currentDiceScore = getDiceRollArray(this.diceCount);
        this.diceHtml = this.currentDiceScore.map(num => `<div class="dice">${num}</div>`).join('');
    }

    this.takeDamage = attackScoreArray => {
        let totalAttackScore = 0;
        totalAttackScore = attackScoreArray.reduce((total, currentElement) => total + currentElement);
        this.health -= totalAttackScore;
        if(this.health <= 0){
            this.health = 0;
            this.dead = true;
        }
    }

    this.getHealthBarHtml = () => {
        const percent = getPercentage(this.health, this.maxHealth);
        const dangerClass = percent <= 25 ? 'danger' : '';
        return `<div class="health-bar-outer">
                    <div class="health-bar-inner ${dangerClass} " 
                        style="width: ${percent}%;">
                    </div>
                </div>`
    }
}

export {Character};