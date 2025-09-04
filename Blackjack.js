let cards = [] // array initialization...
let sum = 0
let jacked = false
let ingame = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.querySelector("#sum-el") // more dynamic method
let cardEl = document.querySelector("#card-el")

let player = {
    name: "Naina",
    chips: 500
}

let bet = 20 // fixed bet per game

let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + " : $" + player.chips

// Get the restart button from HTML
let restartBtn = document.getElementById("restart-btn")

function getRandomCard() {
    let rCard = Math.floor(Math.random() * 13) + 1
    if (rCard === 1) {
        return 11
    } else if (rCard > 10) {
        return 10
    } else {
        return rCard
    }
}

function startGame() {
    if (player.chips >= bet) {
        player.chips -= bet // subtract bet at start
        playerEl.textContent = player.name + " : $" + player.chips

        let first = getRandomCard()
        let second = getRandomCard()
        cards = [first, second]
        sum = cards[0] + cards[1]
        ingame = true
        jacked = false
        restartBtn.style.display = "none" // hide restart button at start
        renderGame()
    } else {
        messageEl.textContent = "NOT ENOUGH CHIPS TO PLAY!"
    }
}

function renderGame() {
    cardEl.textContent = "Cards : "
    for (let i = 0; i < cards.length; i++) {
        cardEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "SUM : " + sum

    if (sum < 21) {
        message = "DO YOU WANT TO DRAW A NEW CARD...?"
        restartBtn.style.display = "none" // hide restart button
    } else if (sum === 21) {
        message = "YOU GOT BLACKJACK!!!"
        jacked = true
        player.chips += bet * 2.5 // Blackjack payout
        ingame = false
        restartBtn.style.display = "block" // show restart button
    } else {
        message = "GAME OVER!! YOU ARE OUT OF THE GAME..."
        ingame = false
        restartBtn.style.display = "block" // show restart button
    }

    playerEl.textContent = player.name + " : $" + player.chips
    messageEl.textContent = message
}

function newCard() {
    if (!jacked && ingame) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    } else {
        message = "CAN'T CONTINUE...YOU ARE OUT..."
        messageEl.textContent = message
        restartBtn.style.display = "block" // show restart button if trying after game over
    }
}

function restartGame() {
    cards = []
    sum = 0
    jacked = false
    ingame = false
    message = ""
    cardEl.textContent = "Cards : "
    sumEl.textContent = "SUM : "
    messageEl.textContent = ""
    restartBtn.style.display = "none" // hide button after reset
}
