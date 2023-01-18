import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snackBar: MatSnackBar) { }
  SnackBar(message:string){
    this.snackBar.open(message,'close', {
      duration:3000,
      panelClass: ['mat-toolbar', 'mat-primary'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
