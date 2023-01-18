import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userInfo:any={}
  loginInfo:any;
  constructor() { }

  setUserInfo(data?:any){
    this.userInfo={
      name: data.name,
      email: data.email,
      userId: this.generateUserId()

    }
    console.log(this.userInfo,'userInfo');

  }
  get getUserInfo(){
    return this.userInfo;
  }
  generateUserId(){
    const length = 4;
    const randomNumber  =Math.floor(
      Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1)
    );
    return randomNumber;
  }
  getStorage() {
    const storage: any = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }
  setStorage(data:any) {
    localStorage.setItem('chats', JSON.stringify(data));
  }
}
