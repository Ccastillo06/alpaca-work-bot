import Fastify from 'fastify'
import cors from 'fastify-cors'

const fastify = Fastify({ logger: true })

fastify.register(cors, { origin: true })

fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          data: { type: 'string' }
        }
      }
    }
  },
  handler: (_request, reply) => {
    reply.send({ data: 'Alpaca Work Bot is Alive!' })
  }
})

const PORT = process.env.PORT || 3000
const start = async () => {
  try {
    await fastify.listen(PORT)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
