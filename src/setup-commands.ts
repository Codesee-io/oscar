const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const yargs = require("yargs");

const options = yargs
  .usage("Usage: -t <token> -a <application_id> -g <guild_id>")
  .option("t", {
    alias: "token",
    describe: "Discord bot token",
    type: "string",
    demandOption: true,
  })
  .option("a", {
    alias: "application_id",
    describe: "Discord application/client id",
    type: "string",
    demandOption: true,
  })
  .option("g", {
    alias: "guild_id",
    describe: "Discord guild/server id",
    type: "string",
    demandOption: true,
  }).argv;

// Register the slash commands available to users
const commands = [
  new SlashCommandBuilder()
    .setName("verify")
    .setDescription(
      "Grants the Maintainer role for maintainers of repositories listed on opensourcehub.io"
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(options.token);

// Upload the commands to the Discord server
rest
  .put(
    Routes.applicationGuildCommands(options.application_id, options.guild_id),
    {
      body: commands,
    }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
