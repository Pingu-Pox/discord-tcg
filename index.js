import {} from "dotenv/config";
import fs from "fs";
import { Client, Events, GatewayIntentBits, Partials } from "discord.js";
import { Sequelize } from "sequelize";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const sequelize = new Sequelize("database", "user", "password", {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    // SQLite only
    storage: "database.sqlite",
});

const Tags = sequelize.define("tags", {
    card_id: {
        type: Sequelize.STRING,
        unique: true,
    },
    rarity: Sequelize.INTEGER,
    user_id: Sequelize.STRING,
    user_name: Sequelize.STRING,
    user_image: Sequelize.STRING,
    population: Sequelize.INTEGER,
});

Tags.sync();

const events = fs
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));

for (let event of events) {
    const eventFile = await import(`#events/${event}`);
    if (eventFile.once)
        client.once(eventFile.name, (...args) => {
            eventFile.invoke(...args, client, Tags);
        });
    else
        client.on(eventFile.name, (...args) => {
            eventFile.invoke(...args, client, Tags);
        });
}

client.login(process.env.TOKEN);
