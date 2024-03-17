/*
    Author: 	Dong Sub (David) Lee
    Student #: 	A00842504
    Date:   	2024/03/07
	Notes:		BCIT COMP2132 Project
	Usage:      Dice Game Driver
*/


/* PLAYERS */
const PLAYERNAMECOMPUTER = "COMPUTER";
const PLAYERNAMEYOU = "YOU";
const PLAYERNOWINNER = "DRAW";

const playerComputer = new Player(PLAYERNAMECOMPUTER);
const playerYou = new Player(PLAYERNAMEYOU);


/* SELECTORS */
const $btnRollDice = document.getElementById("button-roll-dice");
const $btnNewGame = document.getElementById("button-new-game");

const $playerComputerDiceImageOne = document.getElementById("player-computer-dice-image-one");
const $playerComputerDiceImageTwo = document.getElementById("player-computer-dice-image-two");
const $playerComputerDiceScore = document.getElementById("player-computer-dice-score");
const $playerComputerTotalScore = document.getElementById("player-computer-total-score");

const $playerYouDiceImageOne = document.getElementById("player-you-dice-image-one");
const $playerYouDiceImageTwo = document.getElementById("player-you-dice-image-two");
const $playerYouDiceScore = document.getElementById("player-you-dice-score");
const $playerYouTotalScore = document.getElementById("player-you-total-score");

const $popupBackground = $("#pop-up-background");
const $popup = document.getElementById("pop-up");
const $popupCheckbox = document.getElementById("close-pop-up-checkbox");
const $popupDiv = document.getElementById("div-pop-up");

const $winnerName = document.getElementById("winner-name");

const $buttonInformationShowHide = $('.button-information-show-hide');
const $divInformationContent = $('.div-information-content');


/* VARIABLES */
let rollDiceClickCounter = 0;




/* BUTTON - ROLL DICE */
{
    $btnRollDice.addEventListener("click", btnRollDiceClick);

    function btnRollDiceClick(e)
    {
        // increase roll dice click by 1
        rollDiceClickCounter++;

        // roll max 3 times
        if(rollDiceClickCounter < 4)
        {
            // roll dice
            playerComputer.rollDice();
            playerYou.rollDice();

            // set game score
            playerComputer.setScore();
            playerYou.setScore();

            // get dice game score
            const playerComputerScoreValue = playerComputer.getDiceScore();
            const playerYouScoreValue = playerYou.getDiceScore();

            // get total score
            const playerComputerTotalScoreValue = playerComputer.getScore();
            const playerYouTotalScoreValue = playerYou.getScore();

            // display dice images
            $playerComputerDiceImageOne.innerHTML = getDieImageFromPlayerWithIndex(playerComputer, DIEFIRST);
            $playerComputerDiceImageTwo.innerHTML = getDieImageFromPlayerWithIndex(playerComputer, DIESECOND);

            $playerYouDiceImageOne.innerHTML = getDieImageFromPlayerWithIndex(playerYou, DIEFIRST);
            $playerYouDiceImageTwo.innerHTML = getDieImageFromPlayerWithIndex(playerYou, DIESECOND);

            // display dice game score
            $playerComputerDiceScore.innerHTML = `<p>${playerComputerScoreValue}</p>`;
            $playerYouDiceScore.innerHTML = `<p>${playerYouScoreValue}</p>`;

            // display total score
            $playerComputerTotalScore.innerHTML = `<p>${playerComputerTotalScoreValue}</p>`;
            $playerYouTotalScore.innerHTML = `<p>${playerYouTotalScoreValue}</p>`;
        }

        // if roll dice button is clicked 3 times
        if(rollDiceClickCounter === 3)
        {
            // display popup
            $popupBackground.toggle();

            // display winner name
            const winnerName = getWinnerName(playerComputer, playerYou);
            $winnerName.innerHTML = `<p>${winnerName}</p>`;

            // if computer is the winner
            if(winnerName == PLAYERNAMECOMPUTER)
            {
                $popupDiv.classList.remove("messageGreen", "messageRed", "messageYellow");
                $popupDiv.classList.add("messageRed");
            }
            // if the game is tied
            else if(winnerName === PLAYERNOWINNER)
            {
                $popupDiv.classList.remove("messageGreen", "messageRed", "messageYellow");
                $popupDiv.classList.add("messageYellow");
            }
            // if you are the winner
            else
            {
                $popupDiv.classList.remove("messageGreen", "messageRed", "messageYellow");
                $popupDiv.classList.add("messageGreen");
            }
        }

    }
}


/* BUTTON - NEW GAME */
{
    $btnNewGame.addEventListener("click", btnNewGameClick);

    function btnNewGameClick(e)
    {
        // reset player scores
        playerComputer.resetScore();
        playerYou.resetScore();

        // reset dice click counter
        rollDiceClickCounter = 0;

        // reset dice images
        $playerComputerDiceImageOne.innerHTML = ``;
        $playerComputerDiceImageTwo.innerHTML = ``;

        $playerYouDiceImageOne.innerHTML = ``;
        $playerYouDiceImageTwo.innerHTML = ``;

        // reset dice scores
        $playerComputerDiceScore.innerHTML = `<p>0</p>`;
        $playerYouDiceScore.innerHTML = `<p>0</p>`;

        // reset total scores
        $playerComputerTotalScore.innerHTML = `<p>0</p>`;
        $playerYouTotalScore.innerHTML = `<p>0</p>`;
    }
}


/* BUTTON - POPUP X */
{
    // close popup on X button click
    $popupCheckbox.addEventListener("click", closePopup)

    // close popup on X button click
    function closePopup(e)
    {
        $popupBackground.toggle();
    };
}


/* BUTTON - INFORMATION SHOW HIDE */
{
    $buttonInformationShowHide.click(clickButtonInformationShowHide);

    function clickButtonInformationShowHide(e)
    {
        // Select div-information-content
        const $divInformationContent = $(this).closest(".div-button-information-show-hide").next();

        // Slide toggle
        $divInformationContent.slideToggle(750);

        // Alternate between "Show" and "Hide"
        if($(this).text() == "[Show]")
        {
            $(this).text("[Hide]");
        }
        else
        {
            $(this).text("[Show]");
        }
    }
}