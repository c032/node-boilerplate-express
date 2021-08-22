export type UserId = string;

export interface IUser {
	id: UserId;

	token?: string;
}

export interface IDriver {
	open(): Promise<void>;
	close(): Promise<void>;

	getTokenUserId(token: string): Promise<UserId>;

	getAllUsers(): Promise<IUser[]>;
}
