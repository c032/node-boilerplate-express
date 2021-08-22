import express from 'express';

export function notFoundMiddleware(): express.RequestHandler {
	return function notFoundMiddlewareHandler(
		_req: express.Request,
		_res: express.Response,
		next: express.NextFunction,
	) {
		const err = new Error('Not found.');
		err.status = 404;

		next(err);
	};
}
