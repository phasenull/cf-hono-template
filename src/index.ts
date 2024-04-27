import { app } from './common/helpers/HonoHelper';
import { ExampleWorker } from './common/helpers/MicroServiceConnectionHelper';
export type Bindings = {
	ExampleDB:D1Database
};

export default {
	ExampleWorker:ExampleWorker,
	fetch: app.fetch,
	scheduled: async (event: ScheduledEvent, env: Bindings, ctx: ScheduledEvent) => {
		const promise = new Promise((r)=>r(true))
		return ctx.waitUntil(promise);
	},
};
