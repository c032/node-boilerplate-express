import express from 'express';

export interface IErrorResponseError {
	message: string;
}

export interface IErrorResponse {
	error: IErrorResponseError,
}

export function errorMiddleware(): express.ErrorRequestHandler {
	return function errorMiddlewareHandler(
		routeError: Error|undefined,
		_req: express.Request,
		res: express.Response,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		_next: express.NextFunction,
	) {
		let err: Error|undefined = routeError;
		if (!err) {
			err = new Error('Not found.');
			err.status = 404;
		}
		let { status } = err;
		if (typeof status !== 'number') {
			status = 500;
		}

		let errorResponse: IErrorResponse;
		if (status >= 400 && status <= 499) {
			errorResponse = {
				error: {
					message: err.message,
				},
			};
		} else {
			status = 500;

			errorResponse = {
				error: {
					message: 'Internal server error.',
				},
			};
		}

		res.status(status);
		res.send(errorResponse);
	};
}
