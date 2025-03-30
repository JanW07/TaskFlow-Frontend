import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../board.service';
import { TaskService, CreateTaskDTO } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Board } from '../models/board';
import { Task } from '../models/task';
import { NavigationService } from '../navigation.service';


@Component({
  selector: 'app-board-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.css']
})
export class BoardViewComponent implements OnInit {
  board?: Board;
  errorMessage: string = '';

  // For task list and inline task details
  tasks: Task[] = [];
  selectedTask?: Task | null;

  // For task creation
  showTaskForm: boolean = false;
  taskForm: FormGroup;
  
  // For task editing
  editTaskId: number | null = null;
  editTaskForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder,
    private navigationService: NavigationService
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
    this.editTaskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    const boardId = Number(this.route.snapshot.paramMap.get('id'));
    this.boardService.getBoard(boardId).subscribe({
      next: (data: Board) => {
        this.board = data;
        this.loadTasks(boardId);
      },
      error: (err) => {
        console.error('Failed to load board', err);
        this.errorMessage = 'Failed to load board.';
      }
    });
  }

  loadTasks(boardId: number): void {
    this.taskService.getTasks(boardId).subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Failed to load tasks', err);
        this.errorMessage = 'Failed to load tasks.';
      }
    });
  }

  toggleTaskForm(): void {
    this.showTaskForm = !this.showTaskForm;
  }

  onCreateTask(): void {
    if (this.taskForm.valid && this.board) {
      const newTask: CreateTaskDTO = this.taskForm.value;
      this.taskService.createTask(this.board.id, newTask).subscribe({
        next: (createdTask: Task) => {
          console.log('Task created:', createdTask);
          // Ensure tasks array is defined and then push new task
          if (!this.tasks) {
            this.tasks = [];
          }
          this.tasks.push(createdTask);
          this.showTaskForm = false;
          this.taskForm.reset();
        },
        error: (err) => {
          console.error('Failed to create task', err);
          this.errorMessage = 'Failed to create task.';
        }
      });
    }
  }

  onDeleteTask(task: Task): void {
    if (this.board && confirm(`Are you sure you want to delete the task "${task.name}"?`)) {
      this.taskService.deleteTask(this.board.id, task.id).subscribe({
        next: () => {
          console.log('Task deleted successfully!');
          this.tasks = this.tasks.filter(t => t.id !== task.id);
        },
        error: (err) => {
          console.error('Failed to delete task', err);
          this.errorMessage = 'Failed to delete task.';
        }
      });
    }
  }

  onStartEditTask(task: Task): void {
    this.editTaskId = task.id;
    this.editTaskForm.patchValue({
      name: task.name,
      description: task.description
    });
  }

  onUpdateTask(): void {
    if (this.editTaskForm.valid && this.board && this.editTaskId !== null) {
      const updateData: CreateTaskDTO = this.editTaskForm.value;
      this.taskService.updateTask(this.board.id, this.editTaskId, updateData).subscribe({
        next: (updatedTask: Task) => {
          console.log('Task updated:', updatedTask);
          // Update the task in the tasks array
          this.tasks = this.tasks.map(task =>
            task.id === this.editTaskId ? updatedTask : task
          );
          this.editTaskId = null;
          this.editTaskForm.reset();
        },
        error: (err) => {
          console.error('Failed to update task', err);
          this.errorMessage = 'Failed to update task.';
        }
      });
    }
  }

  onCancelEditTask(): void {
    this.editTaskId = null;
    this.editTaskForm.reset();
  }

  goBack(): void {
    this.navigationService.goBack('/dashboard');
  }
}
