import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatappRoutingModule } from './chatapp-routing.module';
import { ChatappComponent } from './chatapp.component';
import {  MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DailogComponent } from '../dailog/dailog.component';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { SanckbarComponent } from './sanckbar/sanckbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReadMoreComponent } from './read-more/read-more.component';

@NgModule({
  declarations: [
    ChatappComponent,
    DailogComponent,
    SanckbarComponent,
    ReadMoreComponent
  ],
  imports: [
    CommonModule,
    ChatappRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule

  ]
})
export class ChatappModule { }
