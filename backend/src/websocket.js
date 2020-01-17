const socketio = require('socket.io');
const calculateDistance = require('./utils/calculateDistance');

let connections = [];
let io;

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query;

        connections = [...connections, { 
            id: socket.id, 
            coordinates: {
                latitude: Number(latitude), 
                longitude: Number(longitude), 
            },
            techs: techs.split(',').map(tech => tech.trim()),
        }]
    });
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => calculateDistance(coordinates, connection.coordinates) < 10 && connection.techs.some(tech => techs.includes(tech)));
}

exports.sendMessage = (to, message, data) => {
    return to.forEach(connection => io.to(connection.id)).emit(message, data);
}