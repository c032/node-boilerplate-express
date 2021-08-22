import express from 'express';

import { UserId } from './drivers/types';

export class RequestState {
	userId: UserId|null = null;

	public isLoggedIn(): boolean {
		return this.userId !== null;
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
