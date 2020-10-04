import http from 'http'

const requestHandler = (req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(200)
    res.end('Alpaca Work Bot is alive!')
  }
}

const PORT = process.env.PORT || 3000
const server = http.createServer(requestHandler)

server.listen(PORT, () => {
  console.log(`Server started in http://localhost:${PORT}`)
})
