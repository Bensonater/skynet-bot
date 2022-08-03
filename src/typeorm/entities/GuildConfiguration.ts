import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "guild_configurations" })
export class GuildConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, name: "guild_id" })
  guildID: string;

  @Column({ default: "-" })
  prefix: string;
}
