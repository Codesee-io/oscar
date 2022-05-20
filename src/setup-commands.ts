const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

import "dotenv/config";

// Register the slash commands available to users
const commands = [
  new SlashCommandBuilder()
    .setName("verify")
    .setDescription(
      "Grants the Maintainer role for maintainers of repositories listed on opensourcehub.io"
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_BOT_TOKEN);

// Upload the commands to the Discord server
rest
  .put(
    Routes.applicationGuildCommands(
      process.env.DISCORD_CLIENT_ID,
      process.env.DISCORD_GUILD_ID
    ),
    { body: commands }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
