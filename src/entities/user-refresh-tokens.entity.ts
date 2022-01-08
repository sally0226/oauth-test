import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserRefreshTokens {
	@PrimaryGeneratedColumn()
	refresh_token_id: number;

	@Column()
	user_id: string;

	@Column()
	refresh_token: string;
	
}