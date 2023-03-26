const fastify = require('fastify')();
fastify.register(require('@fastify/websocket'))

fastify.register(async function (fastify) {
    fastify.get('/fastify', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
      connection.socket.on('message', message => {
        // message.toString() === 'hi from client'
        connection.socket.send('hi from server')
      })

      connection.socket.on('hey', message => {
        // message.toString() === 'hi from client'
        connection.socket.send('hey from server')
      })
    })
  })
  
  

fastify.listen({ port: 3000 }, (err, address) => {
    if(err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at: ${address}`);
});