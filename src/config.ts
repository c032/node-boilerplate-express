export interface IMemoryDriverConfig {
	stateDirectory: string;
}

export interface IServerConfig {
	port: number;
}

export interface IConfig {
	server: IServerConfig;
	memoryDriver: IMemoryDriverConfig;
}
