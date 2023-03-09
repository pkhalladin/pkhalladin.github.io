import { ApplicationRef, ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../common/api';
import { AuthManager } from '../common/auth.manager';
import { Message } from '../common/message';

@Component({
  selector: 'app-column-page',
  templateUrl: './column-page.component.html',
  styleUrls: ['./column-page.component.css']
})
export class ColumnPageComponent {
  columns: any[] = [];
  users: any[] = [];
  title: string = "";
  order: number = 0;
  boardId: string = "";
  board: any = {};
  message: Message = new Message();

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  async ngOnInit() {
    try {
      this.boardId = this.route.snapshot.paramMap.get('id') || "";
      this.board = await Api.getInstance().get(`boards/${this.boardId}`);
      this.columns = this.sortByOrder(await Api.getInstance().get(`boards/${this.boardId}/columns`));
      this.columns.forEach(async (column: any) => {
        column.tasks =  this.sortByOrder(await Api.getInstance().get(`boards/${this.boardId}/columns/${column._id}/tasks`)) || [];
      });
      this.users = await Api.getInstance().get("/users");
    } catch (e: any) {
      if (e.message === "Invalid token") {
        AuthManager.getInstance().logout();
        this.router.navigate(["/login"]);
      }
    }
  }

  async onColumnCreate() {
    try {
      const column = await Api.getInstance().post(`boards/${this.boardId}/columns`, {
        title: this.title,
        order: this.order
      });
      this.columns.push(column);
      this.title = "";
      this.order = 0;
    } catch (e: any) {
      this.message.error(e.message || e + "")
    }
  }

  async onColumnUpdate(column: any) {
    try {
      await Api.getInstance().put(`boards/${this.boardId}/columns/${column._id}`, {
        title: column.title,
        order: column.order
      });
    } catch (e: any) {
      this.message.error(e.message || e + "");
    }
  }

  async onColumnDelete(column: any) {
    try {
      await Api.getInstance().delete(`boards/${this.boardId}/columns/${column._id}`);
      this.columns = this.columns.filter(c => c._id !== column._id);
    } catch (e: any) {
      this.message.error(e.message || e + "");
    }
  }

  async onColumnIncrementOrder(column: any) {
    this.swapOrderWithNextItem(this.columns, column);
    this.columns.forEach(async c => await this.onColumnUpdate(c)); 
    this.columns = this.sortByOrder(this.columns);
  }

  async onColumnDecrementOrder(column: any) {
    this.swapOrderWithPreviousItem(this.columns, column);
    this.columns.forEach(async c => await this.onColumnUpdate(c)); 
    this.columns = this.sortByOrder(this.columns);
  }

  async onTaskCreate(column: any) {
    try {
      const task = await Api.getInstance().post(`boards/${this.boardId}/columns/${column._id}/tasks`, {
        title: "---",
        description: "---",
        order: 0,
        userId: AuthManager.getInstance().getUserId(),
        users: [
          AuthManager.getInstance().getUserId()
        ]
      });
      column.tasks.push(task);
    } catch (e: any) {
      this.message.error(e.message || e + "")
    }
  }

  async onTaskUpdate(task: any) {
    try {
      await Api.getInstance().put(`boards/${this.boardId}/columns/${task.columnId}/tasks/${task._id}`, {
        title: task.title,
        description: task.description,
        order: task.order,
        columnId: task.columnId,
        userId: task.userId,
        users: task.users
      });
    } catch (e: any) {
      this.message.error(e.message || e + "")
    }
  }

  async onTaskDelete(task: any) {
    try {
      await Api.getInstance().delete(`boards/${this.boardId}/columns/${task.columnId}/tasks/${task._id}`);
      const column = this.findColumnByTask(task);
      column.tasks = (column.tasks as any[]).filter(t => t._id !== task._id);
    } catch (e: any) {
      this.message.error(e.message || e + "")
    }
  }

  async onTaskIncrementOrder(task: any) {
    const column = this.findColumnByTask(task);
    const tasks = column.tasks as any[];
    this.swapOrderWithNextItem(column.tasks, task);
    tasks.forEach(async t => await this.onTaskUpdate(t));
    column.tasks = this.sortByOrder(column.tasks);
  }

  async onTaskDecrementOrder(task: any) {
    const column = this.findColumnByTask(task);
    const tasks = column.tasks as any[];
    this.swapOrderWithPreviousItem(column.tasks, task);
    tasks.forEach(async t => await this.onTaskUpdate(t));
    column.tasks = this.sortByOrder(column.tasks);
  }

  async onTaskMoveToLeft(task: any) {
    const currentColumn = this.findColumnByTask(task);
    const currentColumnIndex = this.columns.indexOf(currentColumn);
    if (currentColumnIndex === 0) {
      return;
    }
    const previousColumn = this.columns[currentColumnIndex - 1];
    task.columnId = previousColumn._id;
    await this.onTaskUpdate(task);
    currentColumn.tasks = (currentColumn.tasks as any[]).filter(t => t._id !== task._id);
    previousColumn.tasks.push(task);
  }

  async onTaskMoveToRight(task: any) {
    const currentColumn = this.findColumnByTask(task);
    const currentColumnIndex = this.columns.indexOf(currentColumn);
    if (currentColumnIndex === this.columns.length - 1) {
      return;
    }
    const nextColumn = this.columns[currentColumnIndex + 1];
    task.columnId = nextColumn._id;
    await this.onTaskUpdate(task);
    currentColumn.tasks = (currentColumn.tasks as any[]).filter(t => t._id !== task._id);
    nextColumn.tasks.push(task);
  }

  private findColumnByTask(task: any) {
    return this.columns.find(column => column._id === task.columnId);
  }

  private swapOrderWithNextItem(items: any[], currentItem: any) {
    const currentIndex = items.indexOf(currentItem);
    if (currentIndex === items.length - 1) {
      return;
    }
    for (let i = 0; i < items.length; i++) {
      items[i].order = i;
    }
    const nextItem = items[currentIndex + 1];
    currentItem.order++;
    nextItem.order--;
  }

  private swapOrderWithPreviousItem(items: any[], currentItem: any) {
    const currentIndex = items.indexOf(currentItem);
    if (currentIndex === 0) {
      return;
    }
    for (let i = 0; i < items.length; i++) {
      items[i].order = i;
    }
    const previousItem = items[currentIndex - 1];
    currentItem.order--;
    previousItem.order++;
  }

  private sortByOrder(items: any[]) {
    items.sort((a: any, b: any) => a.order - b.order);
    return items;
  }
}
