import express from 'express';

import { IConfig } from './config';

import { IDriver } from './drivers/types';

import { authMiddleware } from './middleware/auth';
import { errorMiddleware } from './middleware/error';
import { notFoundMiddleware } from './middleware/notfound';

import { usersRouter } from './routes/users';

export function getApp(driver: IDriver, config: IConfig): express.Express {
	const app = express();

	app.use(authMiddleware(driver));
	app.use('/users', usersRouter(driver));
	app.use(notFoundMiddleware());
	app.use(errorMiddleware());

	app.set('port', config.server.port);

	return app;
}
