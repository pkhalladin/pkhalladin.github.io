import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './board-page/board-page.component';
import { ColumnPageComponent } from './column-page/column-page.component';
import { FilePageComponent } from './file-page/file-page.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PointPageComponent } from './point-page/point-page.component';
import { RegisterComponent } from './register/register.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome-page', pathMatch: 'full' },
  { path: 'welcome-page', component: WelcomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'board-page', component: BoardPageComponent },
  { path: 'column-page/:id', component: ColumnPageComponent },
  { path: 'task-page/:id', component: TaskPageComponent },
  { path: 'file-page', component: FilePageComponent },
  { path: 'point-page', component: PointPageComponent },
  { path: '**', redirectTo: '/welcome-page' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
