// /*
//  * @file: socket.js
//  * @description: It Contain Socket connection for application.
//  * @date: 03.09.2020
//  * @author: Megha Sethi
//  */

// //import { SOCKET_URL } from './Routes';
// import io from 'socket.io-client';
// import * as SOCKET_TYPE from '../../constants/actionTypes/socket';
// import * as USER_TYPE from '../../constants/actionTypes/user';
// import { REACT_APP_SOCKET_URL } from './connection';
// import _ from 'underscore';
// import { message } from 'antd';
// const SOCKET_URL = REACT_APP_SOCKET_URL
// let socketClient = null;

// class SocketClient {
//   constructor(endpoint, store) {
//     this.endpoint = endpoint;
//     this.store = store;
//     this.connection = io.connect(`${endpoint}`);
//   }

//   /**************** Return login user ************/
//   getUser() {
//     return this.store.getState().user;
//   }

  
//   /**************** Check Authentication ************/
//   authenticate(user) {
//     console.log(user)
//     console.log(this.connection)
//     //getting connection again once it is disconnected
//     // if(_.isEmpty(user.socketObj) && !user.socketConnected){
//     //   this.getConnection();
//     // }
//     if(!this.connection){
//       this.getConnection();
//     }

//     if(this.connection && this.connection.connected == false && _.isEmpty(user.socketObj)){
//       this.getConnection();
//     }
    
//     if(!_.isEmpty(user.currentUser) && this.connection && (_.isEmpty(user.socketObj) || (!user.socketObj.connected || this.connection.id !== user.socketObj.id))){
//       /** Socket connection **/
//       let obj = {
//         userId: user.currentUser.userProfile.id,
//         role: 'user'
//       };
      
//       console.log("obj",obj)
//       this.connection.emit('authenticate', obj, (res) => {
//         console.log('authenticate=>', res);
//         if (res) {
//           console.log('authenticate=>', res);
//           this.store.dispatch({
//             type: USER_TYPE.SOCKET_CONNECTED,
//             data: {status: true, socketObj: this.connection}
//           });
//         }else{
//           message.error(`Socket is not connected, Please refresh your browser & try again!`);
//           this.store.dispatch({
//             type: USER_TYPE.SOCKET_CONNECTED,
//             data: {status: false, socketObj: this.connection}
//           });
//         }
//       });
//     }    
//   }

//   /**************** Disconnect Socket************/
//   logOut() {
//     console.log('****disconnect socket******');
//     this.connection.disconnect();
//   }

  

//   /*********** Handle socket emiters *********/
//   handleActions(action) {
//     switch (action.type) {
//       case SOCKET_TYPE.AUTH:
//         this.authenticate(action.data);
//         break;
//       case SOCKET_TYPE.LOGOUT:
//         this.logOut();
//         break;
//     }
//   }

//   getConnection(){
//     this.connection = io.connect(`${SOCKET_URL}`);
//   }
// }

// export default function configureClient(store) {
//   if (!socketClient) socketClient = new SocketClient(SOCKET_URL, store);
//   return socketClient;
// }

// export const getActionHandler = data => socketClient.handleActions(data);
