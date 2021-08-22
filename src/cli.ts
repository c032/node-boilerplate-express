import path from 'path';

import { IConfig } from './config';
import { MemoryDriver } from './drivers/memory';
import { getApp } from './app';

function getDefaultConfig(): IConfig {
	return {
		server: {
			port: 3000,
		},
		memoryDriver: {
			stateDirectory: path.join(__dirname, '..', 'data'),
			persist: false,
		},
	};
}

export async function main(config: IConfig = getDefaultConfig()): Promise<void> {
	const driver = new MemoryDriver(config);
	const app = getApp(driver, config);

	await driver.open();
	app.listen(app.get('port'));
}
