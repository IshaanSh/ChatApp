import { ThisReceiver } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ChatService } from '../chat service/chat.service';
import { DataService } from '../service/data.service';
import { SnackService } from '../service/snack.service';
import {
  COMMON_EMAIL,
  COMMON_VALIDATION,
  PATTERN_EMAIL,
  PATTERN_PASS,
  PATTERN_SPACE,
} from '../validation/validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  animal: any;
  name: any;
  verify: any;
  progessbar = false;

  constructor(
    private fb: FormBuilder,


    private chatService: ChatService,
    private storeDataSetvice: DataService,
    private _snackBar:SnackService,
    private _route:Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.isUserAvailable();
    this.storeDataSetvice.loginInfo= this.loginForm

  }
  createForm() {

    this.loginForm = this.fb.group({
      name: ['', [COMMON_VALIDATION, PATTERN_SPACE, ]],
      email: ['', [COMMON_VALIDATION, PATTERN_EMAIL]],
      password: [
        '',
        [COMMON_VALIDATION, Validators.minLength(6), PATTERN_PASS],
      ],

    });

  }
  isUserAvailable(){
    this.chatService.isUserAlreadyExist().subscribe((notification:any)=>{
      console.log(notification.isPresent,'notification');

      if(notification.isPresent==false){
        this.storeDataSetvice.setUserInfo(this.loginForm.value);
        this._route.navigate(['/chatapp']);
      }else{
        console.log(notification.isPresent,'user Present');
        this._snackBar.SnackBar('User Already Exist!!');
      }
    })
  }

  onSubmit() {
    this.loginForm.controls['name'].patchValue(this.loginForm.controls['name'].value?.trim());
    // this.loginForm.controls['email'].patchValue(this.loginForm.controls['email'].value?.trim());
    // this.loginForm.controls['password'].patchValue(this.loginForm.controls['password'].value?.trim());
    const formvalue = this.loginForm.value;
    (formvalue['os_type'] = 3), (formvalue['phome_id'] = Date.now());

    this.loginForm.controls['name'].patchValue(
      this.loginForm.controls['name'].value?.trim()
    );
    if (this.loginForm.valid) {
    let data={
      name:this.loginForm.controls['name'].value,
      email:this.loginForm.controls['email'].value,
      password:this.loginForm.controls['password'].value,
    }
    this.chatService.registerUser(data);
    this.isUserAvailable();
    this._snackBar.SnackBar('Login Sucessfull !!!')
    }
  }



  }

