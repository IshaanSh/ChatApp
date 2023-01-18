import { ThisReceiver } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChatService } from '../chat service/chat.service';
import { DailogComponent } from '../dailog/dailog.component';
import { DataService } from '../service/data.service';
import { SnackService } from '../service/snack.service';

@Component({
  selector: 'app-chatapp',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.scss'],
})
export class ChatappComponent implements OnInit {
  chatForm!: FormGroup;
  newUserName = this.storeService.getUserInfo.name;
  logInUserName = this.storeService.getUserInfo.name;
  numberOfOnlineUsers: any;
  contactList: any = [];
  chatData: any;
  UserData: any = [];
  messageArray: Array<any> = [];
  groupMessage: any = {};
  socket: any;
  user_Id: any;
  activeUserArray = [];
  userDetails: any=[];
  userInfo: any;
  privateMessage: any = {};
  show=false;
display= false;
displayUser=false
readMore=false;

  constructor(
    private _fb: FormBuilder,
    public socketService: ChatService,
    public storeService: DataService,
    private dialog: MatDialog,
    private _route: Router,
    private snackBar:SnackService,

  ) {}

  ngOnInit() {
    this.createForm();
    this.recieveMessage();
    // this.socketService.setupSocketConnection();
    this.socket = this.socketService.getSocket();
    console.log(this.socket.id, 'oooo');
    this.privateChat();

  }
  createForm() {
    this.chatForm = this._fb.group({
      message: [''],
    });
  }


  submitMessage() {
    console.log("submit message call.....");

    const message = this.chatForm.controls.message.value;
    if(message.trim().length!=0){
      console.log(message, 'Message');
      let data = {
        message: message,
        name: this.storeService.getUserInfo.name,
        roomName: this.chatData?.roomName,
        userId: this.storeService.getUserInfo.userId,
        socketId: this.chatData?.socketId,
      };

      console.log(data, 'Data');
      // if (this.messageForm.valid) {
      this.socketService.sendMessage(data);
      if (!data.roomName) {
        this.privateMessage[this.chatData.name].push(data);
        // this.messageArray.push(data)
      }
      // }
      this.chatForm.reset();
    }else{
      this.snackBar.SnackBar('Please enter message first or valid message...')
    }


  }
  onSelect(data: any) {

    this.chatData = data;
    console.log(this.chatData, 'onSelectData(group)');
    this.messageArray = this.groupMessage[data.roomName];
  }

  selectUserHandler(data: any) {

    this.show=true;
    console.log('data...............', data);
    this.chatData = data;
    if (!this.privateMessage[data.name]) {
      this.privateMessage[data.name] = [];
    }
    this.messageArray = this.privateMessage[data.name];
    console.log(this.messageArray, 'messageArray');
    console.log(this.chatData, 'usd');

  }
  privateChat() {
    console.log("data... ",new Date());



    this.user_Id = this.socket.id;
    this.socket.emit('ehlo', this.storeService.getUserInfo.name);
    console.log(this.storeService.getUserInfo.name, 'user');

    this.socket.on('array', (userData: any) => {
      console.log('userdata', userData);


      this.activeUserArray = userData.filter((data: any) => {
        console.log(data,'activeUSerArray');

        return this.socket.id != data.socketId;
      });
      console.log(this.activeUserArray, 'activeUser');


      this.userDetails = this.activeUserArray;

      if(this.userDetails.length>0){
        this.displayUser=true

      }
      console.log('this', this.userDetails);
    });
  }

  recieveMessage() {
    this.socketService.newMessage().subscribe((data: any) => {
      console.log(data, 'lolo');

      if (data.roomName) {
        this.groupMessage[data.roomName].push(data);
      } else if (data.socketId) {
        this.privateMessage[data.name].push(data);
      }
      console.log(data, 'receive message');
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DailogComponent,{ disableClose: true });
    dialogRef.afterClosed().subscribe((res) => {
      if(res){
        this.display=true;
        this.contactList.push(res);
        console.log(res, 'res');
        this.groupMessage[res.roomName] = [];
      }

    });
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  login(){
    this._route.navigate(['/login']);
  }

}
