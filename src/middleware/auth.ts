import express from 'express';

import {
	IDriver,
	UserId,
} from '../drivers/types';

import { getState } from '../request';

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
interface IAuthorizationHeader {
	type: string;
	credentials: string;
}

function getRequestAuthorization(req: express.Request): IAuthorizationHeader|null {
	const headerValue = (req.get('authorization') || '').trim();
	if (!headerValue) {
		return null;
	}

	const parts = headerValue.split(' ');
	if (parts.length < 2) {
		return null;
	}

	const type = parts[0] || '';
	const credentials = parts.slice(1).join(' ') || '';

	return {
		type,
		credentials,
	};
}

export function authMiddleware(
	driver: IDriver,
): express.RequestHandler {
	return async function authMiddlewareHandler(
		req: express.Request,
		_res: express.Response,
		next: express.NextFunction,
	) {
		const authorization = getRequestAuthorization(req);
		if (!authorization) {
			next();

			return;
		}

		let userId: UserId;
		try {
			userId = await driver.getTokenUserId(authorization.credentials);
		} catch (err) {
			// TODO: Log.

			next();

			return;
		}

		const state = getState(req);
		state.userId = userId;

		next();
	};
}
