import { WorkerEntrypoint } from 'cloudflare:workers';
import { Context } from 'hono';
import { Bindings } from '../..';
import getExample from '../../apps/ExampleApp/functions/getExample';


export class ExampleWorker extends WorkerEntrypoint {
	async getExample(context: Context<{ Bindings: Bindings }>) {
		return await getExample(context);
	}
}
