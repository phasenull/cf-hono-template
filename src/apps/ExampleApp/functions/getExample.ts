import { Context } from "hono";
import { Bindings } from "../../..";
import { QuickResponse } from "../../../common/QuickResponse";

export default async function getExample(context: Context<{ Bindings: Bindings }>) {
	
	return new QuickResponse(context).data({
		success:true
	})
}