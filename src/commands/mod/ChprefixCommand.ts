import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class ChprefixCommand extends BaseCommand {
  constructor() {
    super('chprefix', 'mod', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.channel.send('chprefix command works');
  }
}