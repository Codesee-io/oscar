import { Client, GuildMemberRoleManager, Intents } from "discord.js";
import "dotenv/config";
import { getUserByDiscordId, isUserMaintainer } from "./src/api";
import { verifyEnvironmentVariables } from "./src/verify-env";

verifyEnvironmentVariables();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
  console.log("Startup sequence complete. OSCAR is watching.");
});

/**
 * Event triggered when someone attempts to interact with OSCAR
 */
client.on("interactionCreate", async (interaction) => {
  // We only care about commands like /verify. We ignore everything else
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  const rolesForThisUser = (
    interaction.member.roles as GuildMemberRoleManager
  ).cache.map((role) => ({ label: role.name, value: role.id }));

  const maintainerRole = interaction.guild.roles.cache.get(
    process.env.VERIFIED_ROLE_ID
  );
  const userHasMaintainerRole = rolesForThisUser.some(
    (role) => role.value === process.env.VERIFIED_ROLE_ID
  );

  if (commandName === "verify") {
    const logText = `User ${interaction.user.username} (${interaction.user.id}) called /verify... `;

    if (userHasMaintainerRole) {
      console.log(
        logText + `They already have the "${maintainerRole.name}" role.`
      );
      await interaction.reply({
        content: `You already have the **${maintainerRole.name}** role!`,
        ephemeral: true,
      });
    } else {
      // Check whether we've registered on OSH
      const discordUser = await getUserByDiscordId(interaction.user.id);

      // If there's no matching user in OSH, we require verification first
      if (!discordUser) {
        console.log(
          logText + `They haven't linked their OSH and Discord accounts.`
        );
        await interaction.reply({
          content:
            "Please [log in to your Open-Source Hub account](https://opensourcehub.io/login) and click **Verify with Discord**, then try again.",
          ephemeral: true,
        });

        return;
      }

      const userIsMaintainer = await isUserMaintainer(discordUser);
      if (!userIsMaintainer) {
        console.log(
          logText + `OSCAR granted them the "${maintainerRole.name}" role.`
        );

        await (interaction.member.roles as any).add(maintainerRole);

        await interaction.reply({
          content: `You have been granted the role of **${maintainerRole.name}** :tada:`,
          ephemeral: true,
        });
      } else {
        console.log(
          logText +
            `Role note granted because they are not a maintainer on OSH.`
        );
        await interaction.reply({
          content:
            "You are not the maintainer of any project on Open-Source Hub... yet. Want to list your project? [**Learn how to contribute!**](https://github.com/codesee-io/opensourcehub#readme)",
          ephemeral: true,
        });
      }
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
