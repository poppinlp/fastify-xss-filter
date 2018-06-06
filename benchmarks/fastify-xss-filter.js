const fastify = require('fastify');
const xssFilter = require('../src/index');
const { host, port, path, rsp } = require('./config');

fastify()
	.register(xssFilter)
	.get(path, (request, reply) => {
		reply.send(rsp);
	})
	.listen(port, host);
