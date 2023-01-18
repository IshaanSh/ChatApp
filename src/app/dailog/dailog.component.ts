import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChatService } from '../chat service/chat.service';
import { DataService } from '../service/data.service';
import { SnackService } from '../service/snack.service';
import { PATTERN_SPACE } from '../validation/validation';

@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.scss']
})
export class DailogComponent implements OnInit {

  roomForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private storeData: DataService,
    private socketService: ChatService,
    private snack:SnackService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.roomForm = this._fb.group({
      roomName: ['',[Validators.required, PATTERN_SPACE]],
    });
  }
  crossClick() {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.roomForm.controls['roomName'].patchValue(this.roomForm.controls['roomName'].value?.trim());

    console.log(this.roomForm);
    if (this.roomForm.valid ) {
      let data = {
        name: this.storeData.getUserInfo.name,
        userId: this.storeData.getUserInfo.userId,
        roomName: this.roomForm.controls.roomName.value,
      };

      this.snack.SnackBar('New Group Created')
      console.log(data);
      this.socketService.joinRoom(data);
      this.dialogRef.close(data);
    }
  }

 
}
