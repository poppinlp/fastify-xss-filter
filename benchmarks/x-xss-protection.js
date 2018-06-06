const fastify = require('fastify');
const xssFilter = require('x-xss-protection');
const { host, port, path, rsp } = require('./config');

fastify()
	.use(xssFilter())
	.get(path, (request, reply) => {
		reply.send(rsp);
	})
	.listen(port, host);
