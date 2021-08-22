import fs from 'fs';
import path from 'path';
import util from 'util';

import {
	IDriver,

	IUser,
	UserId,
} from './types';

import {
	IConfig,
	IMemoryDriverConfig,
} from '../config';

export class MemoryDriver implements IDriver {
	private readonly config: IMemoryDriverConfig;

	private readonly FILE_USERS = 'users.json';

	private users: IUser[] = [];

	constructor(config: IConfig) {
		this.config = config.memoryDriver;
	}

	private getStateFile(filename: string): string {
		const { stateDirectory } = this.config;

		return path.join(stateDirectory, filename);
	}

	private async readStateFile(filename: string): Promise<string> {
		const file = this.getStateFile(filename);
		const content = await util.promisify(fs.readFile)(file, 'utf8');

		return content;
	}

	private writeStateFile(filename: string, rawContent: string): Promise<void> {
		const file: string = this.getStateFile(filename);
		return util.promisify(fs.writeFile)(file, rawContent, 'utf8');
	}

	private writeStateFileJson(filename: string, data: any): Promise<void> {
		const rawContent = JSON.stringify(data, null, 4);
		return this.writeStateFile(filename, rawContent);
	}

	private async readStateFileJson<T>(filename: string): Promise<T> {
		const rawData: string = await this.readStateFile(filename);

		return JSON.parse(rawData);
	}

	public async open(): Promise<void> {
		this.users = await this.readStateFileJson<IUser[]>(this.FILE_USERS);
	}

	public close(): Promise<void> {
		if (!this.config.persist) {
			return Promise.resolve();
		}

		return this.flush();
	}

	private flush(): Promise<void> {
		return this.writeStateFileJson(this.FILE_USERS, this.users);
	}

	public async getTokenUserId(token: string): Promise<UserId> {
		const user: IUser|null = this.users
			.filter((u) => u.token === token)
			.reduce((a: IUser|null, b: IUser|null) => (a || b), null);

		if (!user) {
			throw new Error('Not found.');
		}

		return user.id;
	}

	public async getAllUsers(): Promise<IUser[]> {
		return this.users;
	}
}
