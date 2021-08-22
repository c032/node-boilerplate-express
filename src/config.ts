export interface IMemoryDriverConfig {
	stateDirectory: string;
	persist: boolean;
}

export interface IServerConfig {
	port: number;
}

export interface IConfig {
	server: IServerConfig;
	memoryDriver: IMemoryDriverConfig;
}
