import { Context } from 'hono';

export class QuickResponse {
	private _request: Context;
	private _status: number = 500;
	private _error: string = 'Uknown Internal Server Error';
	private _data: any;
	private _success: boolean = false;
	constructor(request: Context) {
		this._request = request;
	}
	private asObject() {
		return {
			result: {
				cmd: this._request.req.path,
				time: Date.now(),
				status: this._status,
				success: this._success,
				error: this._success ? undefined : this._error,
			},
			...this._data,
		};
	}

	public error(message: string, status?: number) {
		this._status = status || this._status;
		this._error = message || this._error;
		this._success = false;
		return this._request.json(this.asObject(), { status: this._status });
	}
	public data(data: any, status?: number) {
		this._status = status || 200;
		this._data = data || [];
		this._success = true;
		return this._request.json(this.asObject(), { status: this._status });
	}
	public securityPolicy(policy:string) {
		return this.error(`Request blocked due to security policy: ${policy}`, 400);
	}
	public missingParameter(parameter: string = ':undefined') {
		return this.error(`Missing parameter :${parameter}`, 400);
	}
}
