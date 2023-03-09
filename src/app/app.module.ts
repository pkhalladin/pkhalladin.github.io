import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from './button/button.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { BoardPageComponent } from './board-page/board-page.component';
import { ColumnPageComponent } from './column-page/column-page.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { FilePageComponent } from './file-page/file-page.component';
import { PointPageComponent } from './point-page/point-page.component';
import { SortByOrderPipe } from './sort-by-order.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    BoardPageComponent,
    ColumnPageComponent,
    TaskPageComponent,
    FilePageComponent,
    PointPageComponent,
    SortByOrderPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
