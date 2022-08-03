// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";
import { GuildConfiguration } from "../typeorm/entities/GuildConfiguration";
import { dataSource } from "..";

export default class GuildCreateEvent extends BaseEvent {
  constructor(
    private readonly guildConfigRepository = dataSource.getRepository(
      GuildConfiguration
    )
  ) {
    super("guildCreate");
  }

  async run(client: DiscordClient, guild: Guild) {
    const config = await this.guildConfigRepository.findOne({
      where: {
        guildID: guild.id,
      },
    });
    if (config) {
      console.log("An existing configuration was found. ");
    } else {
      console.log("Configuration not found. Creating a new one...  ");
      const newConfig = this.guildConfigRepository.create({
        guildID: guild.id,
      });
      return this.guildConfigRepository.save(newConfig);
    }
  }
}
