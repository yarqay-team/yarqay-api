
var commentController = require('./controllers/commentController');
// var messageController = require('./controllers/messageController');

module.exports = function (io) {

    var chat = io.of('/chat');
    var comments = io.of('/comments');

    chat.on('connection',function (client) {
        client.on('new comment',function (comment) {

        })
        client.on('init',function (data) {
            client.join(data.room.name);

            io.to(data.room.name).emit('new user',{
                username: data.username,
                email: data.email,
                date: new Date()
            });
        });


        client.on('new message',function (data) {
            messageController.create(data);

        });

        client.on('typing',function () {

        })

        client.on('stop typing',function () {

        });

        client.on('disconnect',function () {
            console.log('Se desconecto el usuario : ');
        });

    })

    comments.on('connection',function (client) {
        client.on('new comment',function (comment) {
            client.emit('new comment',comment);
        });

        client.on('delete comment',function () {
            
        });
    })

    return io;
}
