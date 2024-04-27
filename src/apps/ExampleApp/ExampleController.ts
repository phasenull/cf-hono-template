import { Hono } from 'hono';
import { Bindings } from '../..';
import getExample from './functions/getExample';
export const ExampleController = new Hono<{ Bindings: Bindings }>();

ExampleController.post('/get', getExample);
