import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from '../common/api';
import { AuthManager } from '../common/auth.manager';
import { Message } from '../common/message';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent {
  boards: any[] = [];
  users: any[] = [];
  message: Message = new Message();
  title: string = "";

  constructor(private router: Router) { }

  async ngOnInit() {
    try {
      this.boards = await Api.getInstance().get("/boards");
      this.users = await Api.getInstance().get("/users");
      for (let board of this.boards) {
        board.user = null;
      }
    } catch (e: any) {
      if (e.message === "Invalid token") {
        AuthManager.getInstance().logout();
        this.router.navigate(["/login"]);
      }
    }
  }

  async onCreate() {
    try {
      const board = await Api.getInstance().post("/boards", {
        title: this.title,
        users: [AuthManager.getInstance().getUserId()],
        owner: AuthManager.getInstance().getUserId()
      });
      this.boards.push(board);
      this.title = "";
    } catch (e: any) {
      this.message.error(e.message || e + "")
    }
  }



  async onUpdate(board: any) {
    try {
      await Api.getInstance().put(`/boards/${board._id}`, {
        title: board.title,
        users: board.users.map((user: any) => user._id),
        owner: board.owner
      });
    } catch (e: any) {
      this.message.error(e.message || e + "")
    }
  }

  async onDelete(board: any) {
    try {
      await Api.getInstance().delete(`/boards/${board._id}`);
      this.boards = this.boards.filter(b => b._id !== board._id);
    } catch (e: any) {
      this.message.error(e.message || e + "")
    }
  }

  async onAddUser(board: any) {
    board.users.push(await Api.getInstance().get(`/users/${board.user}`));
  }
}
