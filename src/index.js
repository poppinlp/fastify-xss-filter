const fp = require('fastify-plugin');

const xssFilter = (app, opts = {}, next) => {
	const defaultHeader = '1; mode=block';
	const header = opts.reportUri ? `${defaultHeader}; report=${opts.reportUri}` : defaultHeader;

	app.addHook('onSend', (request, reply, payload, next) => {
		if (opts.setOnOldIE) {
			reply.header('X-XSS-Protection', header);
		} else {
			const matches = /msie\s*(\d+)/i.exec(request.headers['user-agent']);
			const value = !matches || parseFloat(matches[1]) >= 9 ? header : '0';
			reply.header('X-XSS-Protection', value);
		}

		next();
	});

	next();
};

module.exports = fp(xssFilter, {
	fastify: '^1.0.0',
	name: 'fastify-xss-filter'
});
