require("dotenv").config();

import "reflect-metadata";
import { registerCommands, registerEvents } from "./utils/registry";
import DiscordClient from "./client/client";
import { Collection, GatewayIntentBits } from "discord.js";
import { DataSource } from "typeorm";
import { GuildConfiguration } from "./typeorm/entities/GuildConfiguration";
const client = new DiscordClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

export const db = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_DB_HOST,
  port: 3306,
  username: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_DATABASE,
  synchronize: true,
  entities: [GuildConfiguration],
});

(async () => {
  await db.initialize();

  const configRepo = db.getRepository(GuildConfiguration);
  const guildConfigs = await configRepo.find();

  const configs = new Collection<string, GuildConfiguration>();
  guildConfigs.forEach((config) => configs.set(config.guildID, config));

  client.configs = configs;

  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  await client.login(process.env.SKYNET_TOKEN);
})();
