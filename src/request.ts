import express from 'express';

import { UserId } from './drivers/types';

export class RequestState {
	public userId: UserId|null = null;

	public isLoggedIn(): boolean {
		const { userId } = this;

		if (userId === null) {
			return false;
		}

		if (userId.trim() === '') {
			return false;
		}

		return true;
	}
}

export function getState(req: express.Request): RequestState {
	let { state } = req;

	if (!state) {
		state = new RequestState();
		req.state = state;
	}

	return state;
}

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		interface Request {
			state?: RequestState;
		}
	}
}
