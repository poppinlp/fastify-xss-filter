import test from 'ava';
import fastify from 'fastify';
import plugin from '../src/index';

const MODERN_UA =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36';
const OLD_IE_UA = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)';
const NEW_IE_UA = 'Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/4.0)';

test.beforeEach(t => {
	const app = fastify();

	app.get('/', (request, reply) => {
		reply.send('hello world');
	});

	t.context.app = app;
});

const testHandler = (t, opts, ua, expectedHeader) => {
	const { app } = t.context;

	t.plan(3);
	app.register(plugin, opts);
	app.inject(
		{
			method: 'GET',
			url: '/',
			headers: {
				'user-agent': ua
			}
		},
		(err, res) => {
			const expected = {
				payload: 'hello world',
				header: expectedHeader
			};
			const target = {
				payload: res.payload,
				header: res.headers['x-xss-protection']
			};

			t.is(err, null, 'should throw no error');
			t.is(target.payload, expected.payload, 'should have expected response payload');
			t.is(target.header, expected.header, 'should have expected response header');
			t.end();
		}
	);
};

test.cb('default on modern browser', t => {
	testHandler(t, {}, MODERN_UA, '1; mode=block');
});

test.cb('default on old IE', t => {
	testHandler(t, {}, OLD_IE_UA, '0');
});

test.cb('default on new IE', t => {
	testHandler(t, {}, NEW_IE_UA, '1; mode=block');
});

test.cb('setOnOldIE on old IE', t => {
	testHandler(t, { setOnOldIE: true }, OLD_IE_UA, '1; mode=block');
});

test.cb('reportUri on modern browser', t => {
	testHandler(
		t,
		{ reportUri: 'https://sample.com' },
		MODERN_UA,
		'1; mode=block; report=https://sample.com'
	);
});

test.cb('reportUri on old IE', t => {
	testHandler(t, { reportUri: 'https://sample.com' }, OLD_IE_UA, '0');
});

test.cb('reportUri on new IE', t => {
	testHandler(
		t,
		{ reportUri: 'https://sample.com' },
		NEW_IE_UA,
		'1; mode=block; report=https://sample.com'
	);
});

test.cb('reportUri and setOnOldIE on old IE', t => {
	testHandler(
		t,
		{ reportUri: 'https://sample.com', setOnOldIE: true },
		OLD_IE_UA,
		'1; mode=block; report=https://sample.com'
	);
});
