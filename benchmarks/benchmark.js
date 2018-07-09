const { writeFileSync } = require('fs');
const { EOL, platform, cpus } = require('os');
const { fork } = require('child_process');
const autocannon = require('autocannon');
const { host, port, path } = require('./config');

const caseMap = {
	pure: {
		mod: 'pure',
		desc: 'with no plugin'
	},
	middleware: {
		mod: 'x-xss-protection',
		desc: 'with x-xss-protection middleware'
	},
	plugin: {
		mod: 'fastify-xss-filter',
		desc: 'with fastify-xss-filter plugin'
	}
};

const test = name =>
	new Promise((resolve, reject) => {
		const { mod } = caseMap[name];
		const server = fork(`./benchmarks/${mod}`);

		autocannon(
			{
				url: `http://${host}:${port}${path}`,
				connections: 1000,
				pipelining: 1,
				duration: 10
			},
			(err, results) => {
				if (err) {
					return reject(err);
				}

				server.kill();
				resolve(results.requests.average);
			}
		);
	});

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const doCase = async name => {
	const COUNT = 3;
	const SLEEP = 3000;
	const { desc } = caseMap[name];

	let reqAmount = 0;

	for (let i = 0; i < COUNT; i++) {
		reqAmount += await test(name);
		sleep(SLEEP);
	}

	return `${desc}: ${(reqAmount / COUNT).toFixed(2)}`;
};

(async () => {
	const txt = [
		`node version: ${process.version}`,
		`platform: ${platform()}`,
		`cpus: ${JSON.stringify(cpus())}`,
		'',
		'Average req/sec in 3 times 10s test',
		await doCase('pure'),
		await doCase('middleware'),
		await doCase('plugin')
	].join(EOL);

	writeFileSync('./benchmarks/benchmark.txt', txt);
	console.log(txt);
})();
