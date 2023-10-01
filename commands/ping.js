import { Client, SlashCommandBuilder } from "discord.js";

const NAME = "ping";
const DESCRIPTION = "Pings the bot to check online status.";

const create = () => {
    const command = new SlashCommandBuilder()
        .setName(NAME)
        .setDescription(DESCRIPTION);
    return command.toJSON();
};

const invoke = async (interaction) => {
    try {
        await interaction.reply("Pong!");
    } catch (error) {
        console.error(error);
    }
};

export { create, DESCRIPTION, invoke, NAME };
