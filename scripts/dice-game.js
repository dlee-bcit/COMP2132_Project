/*
    Author: 	Dong Sub (David) Lee
    Student #: 	A00842504
    Date:   	2024/03/07
	Notes:		BCIT COMP2132 Project
	Usage:      Dice Game
*/

/* CONSTANTS */
const DICEIMAGESPATH = "images-dice/";

const DIEFIRST = 0;
const DIESECOND = 1;
const NOWINNER = "DRAW";


/* FUNCTION: GENERATE DIE VALUE FROM 1-6 */
function generateDieValue()
{
    const dieValueMin = 1;
    const dieValueMax = 6;
    const dieValueDiff = dieValueMax - dieValueMin;

    const dieValue  = Math.round( Math.random() * dieValueDiff ) + dieValueMin;

    return dieValue;
}


/* CLASS: DIE */
class Die
{
    value;

    constructor()
    {
        this.value = generateDieValue();
    }
    
    roll()
    {
        this.value = generateDieValue();
    }
    
    getValue()
    {
        return this.value;
    }
    
    describeSelf()
    {
        const dieValue = `${this.value}`;
        return dieValue;
    }
}


/* CLASS: PLAYER */
class Player
{
    name;
    dice;
    score;

    constructor(name)
    {
        if(typeof name == "string" || value instanceof String)
        {
            this.name = name;
        }
        else
        {
            console.log("Invalid Player name - It is not a string");
            return;
        }
        
        this.dice = [];
        this.score = 0;

        const dieOne = new Die();
        const dieTwo = new Die();

        this.dice.push(dieOne);
        this.dice.push(dieTwo);
    }

    getName()
    {
        return this.name;
    }

    getDice()
    {
        return this.dice;
    }

    getScore()
    {
        return this.score;
    }
    
    rollDice()
    {
        this.dice.forEach(function(die){
            die.roll();
        })
    }

    getDiceScore()
    {
        const dice = this.dice;

        let gameScore = 0;

        const dieFirstValue = dice[DIEFIRST].getValue();
        const dieSecondValue = dice[DIESECOND].getValue();
        
        // if a 1 is rolled, score is 0
        if(dieFirstValue == 1 || dieSecondValue == 1)
        {
            gameScore = 0;
        }
        // if both dice are the same, add the values of the dice and multiply by 2
        else if(dieFirstValue == dieSecondValue)
        {
            gameScore = (dieFirstValue + dieSecondValue) * 2;
        }
        // else add the values of both dice
        else
        {
            gameScore = dieFirstValue + dieSecondValue;
        }

        return gameScore;
    }

    setScore()
    {
        this.score += this.getDiceScore();
    }

    resetScore()
    {
        this.score = 0;
    }

    describeSelf()
    {
        const dieOneValue = this.dice[DIEFIRST].describeSelf();
        const dieTwoValue = this.dice[DIESECOND].describeSelf();

        const describeSelfValues = `${this.name} - ${dieOneValue}:${dieTwoValue} - ${this.score}`;
        return describeSelfValues;
    }
}


/* FUNCTION: GET DIE IMAGE FROM PLAYER WITH THE DICE INDEX */
function getDieImageFromPlayerWithIndex(player, diceIndex)
{
    if(!(player instanceof Player))
    {
        alert(`[ERROR] Not Player`);
        return;
    }

    if(diceIndex < 0 || diceIndex > 1)
    {
        alert(`[ERROR] Player dice index can be 0 or 1`);
        return;
    }

    let html = "";

    const dice = player.getDice();
    const die = dice[diceIndex];
    const dieValue = die.getValue();

    const dieImage = `<img class="img-dice" src="${DICEIMAGESPATH}dice-${dieValue}.png" alt="dice-${dieValue}.png">`;

    html += dieImage;

    return html;
}


/* FUNCTION: GET DICE IMAGES FROM PLAYER */
function getDiceImagesFromPlayer(player)
{
    if(!(player instanceof Player))
    {
        alert(`[ERROR] Not Player`);
        return;
    }
    let diceImagesHtml = "";

    diceImagesHtml += getDieImageFromPlayerWithIndex(player, 0);
    diceImagesHtml += getDieImageFromPlayerWithIndex(player, 1);

    return diceImagesHtml;
}


/* FUNCTION: GET WINNER NAME WITH THE HIGHER SCORE */
function getWinnerName(playerOne, playerTwo)
{
    if(!(playerOne instanceof Player) || !(playerTwo instanceof Player))
    {
        alert(`[ERROR] Not Player`);
        return;
    }

    const playerOneDiceScore = playerOne.getScore();
    const playerTwoDiceScore = playerTwo.getScore();

    let winnerName = "";

    if(playerOneDiceScore > playerTwoDiceScore)
    {
        winnerName = playerOne.getName();
    }
    else if(playerOneDiceScore < playerTwoDiceScore)
    {
        winnerName = playerTwo.getName();
    }
    // if the game is tied
    else
    {
        winnerName = NOWINNER;
    }

    return winnerName;
}


