import { Message } from "discord.js";
import BaseCommand from "../utils/structures/BaseCommand";
import DiscordClient from "../client/client";

export default class RemindCommand extends BaseCommand {
  constructor() {
    super("remind", "", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (args.length === 0) {
      message.channel.send(
        "You need to specify the time duration for the reminder."
      );
      return;
    }
    const duration = parseInt(args.shift()!);
    setTimeout(
      () => message.channel.send("This is your reminder:\n" + args.join(" ")),
      duration * 1000
    );
  }
}
