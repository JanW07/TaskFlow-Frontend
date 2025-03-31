import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../board.service';
import { TaskService, CreateTaskDTO } from '../task.service';
import { BoardStageService } from '../board-stage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Board } from '../models/board';
import { Task } from '../models/task';
import { NavigationService } from '../services/navigation/navigation.service';
import { BoardStageTaskService } from '../board-stage-task.service';


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
    private stageService: BoardStageService,
    private boardStageTaskService: BoardStageTaskService,
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
        this.stageService.getStages(boardId).subscribe({
          next: (stages) => {
            if(this.board){
              this.board.boardStages = stages;
              stages.forEach(stage => {
                this.loadTasksOnStage(stage.stageNumber);
              });
            }
          },
          error: (err) => {
            console.error('Failed to load stages', err);
            this.errorMessage = 'Failed to load board stages.';
          }
        });
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

  loadTasksOnStage(stageNumber: number): void {
    if (!this.board) {
      return;
    }
    this.boardStageTaskService.getTasksOnStage(this.board.id, stageNumber).subscribe({
      next: (tasks: Task[]) => {
        const stage = this.board?.boardStages?.find(s => s.stageNumber === stageNumber);
        if (stage) {
          stage.tasks = tasks;
        }
      },
      error: (err) => {
        console.error(`Failed to load tasks for stage ${stageNumber}`, err);
        this.errorMessage = `Failed to load tasks for stage ${stageNumber}.`;
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
          const defaultStage = this.board?.boardStages?.find(
            stage => stage.stageNumber === 1
          );
          if(defaultStage){
            defaultStage.tasks.push(createdTask);
          }
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
