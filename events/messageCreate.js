const name = "messageCreate";
const once = false;
import * as loot from "../handlers/loot.js";

const rate = 33; // Drop rate 1 in x ; Default is 33, or ~3%

// This listener is for messages
async function invoke(message) {
    console.log(
        `${message.author.tag} posted a message with contents \"${message.content}\"`
    );
    loot.cardDropRandom(rate);
}

export { invoke, name, once };
