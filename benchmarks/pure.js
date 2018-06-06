const fastify = require('fastify');
const { host, port, path, rsp } = require('./config');

fastify()
	.get(path, (request, reply) => {
		reply.send(rsp);
	})
	.listen(port, host);
