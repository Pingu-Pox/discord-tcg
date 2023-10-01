import { Client, SlashCommandBuilder } from "discord.js";
import * as loot from "../handlers/loot.js";

const NAME = "boosterpack";
const DESCRIPTION = "Rewards the user a boosterpack, with optional theme.";

const create = () => {
    const command = new SlashCommandBuilder()
        .setName(NAME)
        .setDescription(DESCRIPTION)
        .addStringOption((option) =>
            option
                .setName("theme")
                .setDescription("The special theme of the pack")
                .setRequired(false)
        );
    return command.toJSON();
};

const invoke = async (interaction) => {
    loot.boosterPack();
    interaction.reply({
        content: "You've granted a user a boosterpack!",
        ephemeral: true,
    });
};

export { create, DESCRIPTION, invoke, NAME };
