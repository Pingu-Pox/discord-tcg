async function boosterPack() {
    for (let i = 0; i < 10; i++) {
        cardDrop();
    }
}

async function cardDrop() {
    console.log("You got a card!");
}

async function cardDropRandom(chance) {
    const roll = Math.floor(Math.random() * chance);
    console.log("Rolled a " + roll + ".");
    if (roll === 1) {
        cardDrop();
    } else {
        // No drop
    }
}

export { boosterPack, cardDropRandom };
