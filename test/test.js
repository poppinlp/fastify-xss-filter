import test from 'ava';
import fastify from 'fastify';
import plugin from '../src/index';
import ua from './ua.json';

test.beforeEach(t => {
	const app = fastify();

	app.get('/', (request, reply) => {
		reply.send('hello world');
	});

	t.context.app = app;
});

const mock = async (t, opts, useragent, expected) => {
	const rsp = await t.context.app.register(plugin, opts).inject({
		method: 'get',
		url: '/',
		headers: {
			'User-Agent': useragent
		}
	});
	const header = rsp.headers['x-xss-protection'];

	t.is(header, expected);
};

ua.enabled.forEach(browser => {
	test(`should be enabled for supported browser: ${browser}`, async t => {
		await mock(t, {}, browser, '1; mode=block');
	});
});

ua.disabled.forEach(browser => {
	test(`should be disabled for unsupported browser: ${browser}`, async t => {
		await mock(t, {}, browser, '0');
	});
});

ua.disabled.forEach(browser => {
	test(`setOnOldIE should work for ${browser}`, async t => {
		await mock(t, {
			setOnOldIE: true
		}, browser, '1; mode=block');
	});
});

ua.enabled.forEach(browser => {
	test('should support reportUri', async t => {
		await mock(t, {
			reportUri: '/report-path'
		}, browser, '1; mode=block; report=/report-path');
	});
});
