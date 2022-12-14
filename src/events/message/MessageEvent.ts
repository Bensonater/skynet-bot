import BaseEvent from "../../utils/structures/BaseEvent";
import { Message } from "discord.js";
import DiscordClient from "../../client/client";

export default class MessageEvent extends BaseEvent {
  constructor() {
    super("messageCreate");
  }

  async run(client: DiscordClient, message: Message) {
    const config = client.configs.get(message.guildId!);

    if (message.author.bot || !message || !config) return;

    if (message.content.startsWith(config.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(config.prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
}
