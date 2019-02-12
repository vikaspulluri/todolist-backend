//imprt modules
const socketio = require('socket.io');
const shortid = require('shortid');
const eventEmitter = require("../events/events");
const tokenLib = require('./token-library');
const event = eventEmitter.emitter;

let setServer=(server)=>{
  const allOnlineUsers = [];
  let io = socketio(server);
  let myIo = io.of('');

  myIo.on('connection', (socket)=>{
    //emiting event to verify user
    socket.emit('verifyUser',"");
    //listening setuser event for verifying user
    socket.on('setUser',(sentData)=>{
      tokenLib.verifyAuth(sentData.authToken, (err,user)=>{
            if(err){
                console.log('Auth failed!!!');
                socket.emit('auth-error', { status: 500, error: 'Auth failed!!!'});
                return;
            }
            let currentUser = user;
            socket.userId = currentUser.id;
            socket.room=currentUser.id;
            socket.join(currentUser.id);
            let fullName = `${currentUser.firstName} ${currentUser.lastName}`;
            let userObj = {userId:currentUser.id, fullName: fullName};
            allOnlineUsers.push(userObj);
            // allOnlineUsers.filter((obj, pos, arr) => {
            //   return arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos;
            // });

            console.log(allOnlineUsers);
            // // setting room name
            // socket.room = 'todolist';
            // // joining chat-group room.
            // socket.join('todolist')
            myIo.emit('onlineUserList', allOnlineUsers);
      });
    });//end set user part

    socket.on('setFriends', (data) => {
      console.log(socket.room);
      if(data.length > 0){
        for(let i of data){
          socket.join(i);
        }
      }
    }); // end setFriends
    // method to get online user list
    socket.on('getOnlineUsers', () => {
      socket.emit('onlineUserList', allOnlineUsers);
    }); // end getOnlineUsers

    // method to listen send friend request
    // expected reqData = {requesterId, requesterName, receiverId, receiverName}
    socket.on('sendFriendRequest', reqData => {
      // event.emit save friend request. update db values of requesterId, receiverId documents
      // emit event to receiver so that he will notified about a new request
      eventEmitter.sendRequest(reqData);
      socket.broadcast.to(reqData.receiverId).emit('receivedFriendRequest', reqData);
      socket.broadcast.to(reqData.receiverId).to(reqData.requesterId).emit('notificationAlert', '');

    });// end method to listen send friend request

    // method to listen accept friend request
    socket.on('acceptFriendRequest', reqData => {
      // event.emit update friend request. update db values of requesterId, receiverId documents
      // emit event to sender so that he will notified about acceptance
      eventEmitter.updateRequest(reqData);
      socket.broadcast.to(reqData.requesterId).emit('acceptedFriendRequest', reqData);
      socket.broadcast.to(reqData.receiverId).to(reqData.requesterId).emit('notificationAlert', '');
    });// end method to listen accept friend request

    socket.on('addList', (id, data) => {
      socket.broadcast.to(id).emit('listCreated', data);
    }); // end addList

    socket.on('editList', (id, data) => {
      socket.broadcast.to(id).emit('listEdited', data);
    }); // end editList

    socket.on('deleteList', (id, data) => {
      socket.broadcast.to(id).emit('listDeleted', data);
    }); // end deleteList


    socket.on('addItem', (roomId, data) => {
      socket.broadcast.to(roomId).emit('itemAdded', data);
    }); // end addItem

   socket.on('editItem', (roomId, data) => {
     socket.broadcast.to(roomId).emit('itemEdited', data);
   }); // end editItem

   socket.on('deleteItem', (roomId, data) => {
    socket.broadcast.to(roomId).emit('itemDeleted', data);
   }); // end deleteItem

   socket.on('updateItemStatus', (roomId, data) => {
    socket.broadcast.to(roomId).emit('itemStatusUpdated', data);
   }); // end updateItemStatus

   socket.on('trackItemHistory', (roomId, data) => {
    eventEmitter.trackItemHistory(data);
   });

   socket.on('undoLastAction', (roomId, itemId) => {
     eventEmitter.deleteLastAction(itemId);
   })

    //disconnect socket
    socket.on('disconnect', () => {
        // disconnect the user from socket
        // remove the user from online list
        // unsubscribe the user from his own channel

        console.log("user is disconnected");
        // console.log(socket.connectorName);
        console.log(socket.userId);


        //var removeIndex = allOnlineUsers.map(function(user) { return user.id; }).indexOf(socket.userId);
        let index = allOnlineUsers.findIndex((user) => socket.userId === user.userId);
        if(index >= 0) {
          allOnlineUsers.splice(index, 1)
        }
        console.log(allOnlineUsers)

        myIo.emit('onlineUserList', allOnlineUsers);
        socket.leave('todolist');
        socket.leave(socket.userId);
        socket.disconnect(0);
    }) // end of on disconnect

  });//end connection established part

}//end set Server

module.exports = {
  setServer: setServer
}
