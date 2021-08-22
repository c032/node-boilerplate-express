import express from 'express';

import { IDriver } from '../drivers/types';

import { getState } from '../request';

export function usersRouter(driver: IDriver): express.Router {
	const router = express.Router();

	router.get(
		'/',
		async (req: express.Request, res: express.Response, next: express.NextFunction) => {
			const state = getState(req);
			if (!state.isLoggedIn()) {
				const err = new Error('Unauthorized.');
				err.status = 401;

				next(err);

				return;
			}

			const users = await driver.getAllUsers();

			res.send({
				users,
			});
		},
	);

	return router;
}
