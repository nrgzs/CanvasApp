import { Request, Response } from 'express';

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const port = 3001;

import { Server } from 'socket.io';

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

type Point = { x: number; y: number };

type DrawLine = {
  prevPoint: Point | null;
  currentPoint: Point;
  color: string;
};

io.on('connection', (socket) => {
  console.log('connection');
  console.log(socket.id);

  socket.on('client-ready', () => {
    socket.broadcast.emit('get-canvas-state');
  });

  socket.on('canvas-state', (state) => {
    socket.broadcast.emit('canvas-state-server', state);
  });

  socket.on('draw-line', ({ prevPoint, currentPoint, color }: DrawLine) => {
    socket.broadcast.emit('draw-line', { prevPoint, currentPoint, color });
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
