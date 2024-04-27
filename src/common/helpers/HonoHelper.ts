import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { QuickResponse } from "../QuickResponse";
import { cors } from "hono/cors";
import { Bindings } from "../..";

export const app = new Hono<{ Bindings: Bindings }>();
app.use(
	'*',
	bodyLimit({
		maxSize: 1 * 1024, // 50kb
		onError: (c) => {
			return new QuickResponse(c).error("too heavy",413);
		},
	})
);
app.use('*', async (c, next) => {
	const start = Date.now();
	await next();
	const end = Date.now();
	c.res.headers.set('X-Response-Time', `${end - start}`);
});
app.use('*', cors({ allowHeaders: ['Content-Type'], allowMethods: ['POST', 'GET', 'PUT', 'DELETE'], origin: '*' }));

app.onError(async (err, c) => {
	return new QuickResponse(c).error(`Internal Server Error: ${err}`, 500);
});
app.notFound((request) => {
	return new QuickResponse(request).error('Not Found', 404);
});