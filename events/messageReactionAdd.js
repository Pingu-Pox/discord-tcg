import * as loot from "../handlers/loot.js";

const name = "messageReactionAdd";
const once = false;

const rate = 33; // Drop rate 1 in x ; Default is 33, or ~3%

// This listener is for message reactions
async function invoke(reaction, user) {
    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
        // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
        try {
            await reaction.fetch();
        } catch (error) {
            console.error(
                "Something went wrong when fetching the message:",
                error
            );
            // Return as `reaction.message.author` may be undefined/null
            return;
        }
    }

    // Now the message has been cached and is fully available
    console.log(
        `${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`
    );
    loot.cardDropRandom(rate);
}

export { invoke, name, once };
