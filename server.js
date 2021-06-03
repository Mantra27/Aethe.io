// MIT License

// Copyright (c) 2021 Mantra27

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const socket = require("socket.io");
const io = new Server(server);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
    socket.emit('you msg', `You Connected!`)
  })
  socket.on('get-name', vari => {
    var namehere = vari
    let tex = namelol(namehere)
    socket.broadcast.emit('sound')
    socket.broadcast.emit('chat message', tex);

    socket.on('chat message', (msg) => {
      socket.emit('you msg', `You: ` + msg)
      socket.broadcast.emit('setbg', msg)
      socket.emit('setbg', msg)
      let tex = namehere + `: ` + msg
      socket.broadcast.emit('chat message', tex);
    });
    socket.on('admin', (msg) => {
      socket.emit('you msg', `𝘴𝘦𝘳𝘷𝘦𝘳(only visible to you): You changed server setting(s) `)
      socket.broadcast.emit('setbg', msg)
      socket.emit('setbg', msg)
      let tex = '𝘴𝘦𝘳𝘷𝘦𝘳: 𝘸𝘢𝘭𝘭𝘱𝘢𝘱𝘦𝘳 𝘩𝘢𝘴 𝘣𝘦𝘦𝘯 𝘤𝘩𝘢𝘯𝘨𝘦𝘥 𝘣𝘺 '+ namehere
      socket.broadcast.emit('chat message', tex) && socket.emit('chat message', tex);
      
    })
  })

});

function namelol(here) {
  let agent = here
  let arr = [`'${agent}' just joined the server - glhf!`, `'${agent}' just joined. Everyone, look busy!`, `'${agent}' just joined. Can I get a heal?`, `'${agent}' joined your party.`, `'${agent}' joined. You must construct additional pylons.`, `Ermagherd. '${agent}' is here.`, `Welcome, '${agent}'. Stay awhile and listen`, `Welcome, '${agent}'. We were expecting you ( ͡° ͜ʖ ͡°)`, `Welcome, '${agent}'. We hope you brought pizza.`, `Welcome '${agent}'. Leave your weapons by the door.`, `A wild '${agent}' appeared.`, `Swoooosh. '${agent}' just landed.`, `Brace yourselves. '${agent}' just joined the server.`, `'${agent}' just joined. Hide your bananas.`, `'${agent}' just arrived. Seems OP - please nerf.`, `'${agent}' just slid into the server.`, `A '${agent}' has spawned in the server.`, `Big '${agent}' showed up!`, `Where’s '${agent}'? In the server!`, `'${agent}' hopped into the server. Kangaroo!!`, `'${agent}' just showed up. Hold my beer.`, `Ready player '${agent}'`, `Cheers, love! '${agent}' is here!`, `'${agent}' has joined the server! It's super effective!`, `It's dangerous to go alone, take '${agent}!'`]
  let inn = arr[Math.floor(Math.random() * arr.length)]
  return inn;
}

server.listen(3000, () => {
  console.log('listening on *:3000');
});
