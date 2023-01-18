import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as io  from "socket.io-client";



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket!:any;
  userSocketID:any;
  constructor() {
    this.socket = io.connect("http://localhost:3000/",{transports: ['websocket', 'polling', 'flashsocket']})

  }
  getSocket(){
    return this.socket;
  }

  joinRoom(data:any){
    this.socket.emit('joinRoom',data)

  }
  newMessage(){
    let observable:any = new Observable<any>(observer =>{

      this.socket.on("new message",(data:any)=>{
        console.log("this is observable..",data);

        observer.next(data);
      })
    })
    return observable;
  }
  sendMessage(data:any){
    if(this.socket){
      this.socket.emit('message', data);
    }
  }

  disconnect(){
    if(this.socket){
      this.socket.disconnect();
    }
  }
  registerUser(data: any) {
    this.socket.emit('isUserAvailableData', data);
  }
  isUserAlreadyExist(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('isUserAvailableData', (data:any) => {
        console.log(data, 'isuseravailableService');

        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

}
