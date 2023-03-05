const waitForPort = require('wait-for-port');

async function waitForServer(port) {
    const host = 'localhost';
    const timeout = 30000;

    await waitForPort(host, port, {timeout});
   
}

module.exports = waitForServer;

