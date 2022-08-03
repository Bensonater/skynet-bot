import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "guild_configurations" })
export class GuildConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, name: "guild_id" })
  guildID: string;

  @Column({ default: "-" })
  prefix: string;
}
