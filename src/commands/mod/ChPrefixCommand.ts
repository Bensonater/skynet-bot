import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { db } from "../..";
import { GuildConfiguration } from "../../typeorm/entities/GuildConfiguration";

export default class ChPrefixCommand extends BaseCommand {
  constructor(
    private readonly guildConfigRepository = db.getRepository(
      GuildConfiguration
    )
  ) {
    super("chPrefix", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const [newPrefix] = args;
    if (!args.length) {
      message.channel.send("You need to provide an argument.");
      return;
    }
    try {
      const config = client.configs.get(message.guildId!);

      const newConfig = await this.guildConfigRepository.save({
        ...config,
        prefix: newPrefix,
      });
      client.configs.set(message.guildId!, newConfig);
      message.channel.send("Prefix updates successfully");
    } catch (error) {
      message.channel.send("Something went wrong.");
    }
  }
}
