const app = require('express')()
const server = require('http').createServer(app)
const socket = require('socket.io')
const cors = require('cors')

const PORT = process.env.PORT || 5000


app.use(cors())

const io = socket(server,  {
    cors: {
        origins: ["*"],
        handlePreflightRequest: (_, res) => {
            res.writeHead(200, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST",
                "Access-Control-Allow-Headers": "my-custom-header",
                "Access-Control-Allow-Credentials": true
            })
            res.end()
        }
    }
})


io.on('connection', socket => {
    console.log(`We have a new connection!!!${socket.id}`)
    socket.on('sent-message', (data, callback = () => {}) => {
        socket.broadcast.emit('recieve-message', {user: data.id, message: data.message})
        callback()
    })

    socket.on('disconnect', () => {
        console.log('User a had left')
    })

})


server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
