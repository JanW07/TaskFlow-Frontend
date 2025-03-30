import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { BoardService, CreateBoardDTO } from '../board.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserMe } from '../models/user-me';
import { Board } from '../models/board';
import { Task } from '../models/task';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userMe?: UserMe;
  errorMessage: string = '';

  // Properties for board creation
  showBoardForm: boolean = false;
  boardForm: FormGroup;

  // For editing board details
  editBoardId: number | null = null;
  editBoardForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private boardService: BoardService,
    private fb: FormBuilder
  ) {
    this.boardForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
    this.editBoardForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.userService.getUserMe().subscribe({
      next: (data) => this.userMe = data,
      error: (error) => {
        console.error('Failed to load user data', error);
        this.errorMessage = 'Failed to load user data.';
      }
    });
  }

  toggleBoardForm(): void {
    this.showBoardForm = !this.showBoardForm;
  }

  // Call the backend to create a board
  onCreateBoard(): void {
    if (this.boardForm.valid) {
      const newBoard: CreateBoardDTO = this.boardForm.value;
      this.boardService.createBoard(newBoard).subscribe({
        next: (board: Board) => {
          console.log('Board created:', board);
          // If userMe is defined, add the new board to its boards list
          if (this.userMe) {
            this.userMe.boards.push(board);
          }
          // Hide the form and reset it
          this.showBoardForm = false;
          this.boardForm.reset();
        },
        error: (err) => {
          console.error('Failed to create board', err);
          this.errorMessage = 'Failed to create board.';
        }
      });
    }
  }

  onDeleteBoard(board: Board): void {
    if (confirm(`Are you sure you want to delete the board "${board.name}"?`)) {
      this.boardService.deleteBoard(board.id).subscribe({
        next: () => {
          console.log('Board deleted successfully!');
          if (this.userMe) {
            this.userMe.boards = this.userMe.boards.filter(b => b.id !== board.id);
          }
        },
        error: (err) => {
          console.error('Failed to delete board', err);
          this.errorMessage = 'Failed to delete board.';
        }
      });
    }
  }

  // Start editing a board: set editBoardId and populate the edit form
  onStartEditBoard(board: Board): void {
    this.editBoardId = board.id;
    this.editBoardForm.patchValue({
      name: board.name,
      description: board.description
    });
  }

  // Update board with PATCH request
  onUpdateBoard(): void {
    if (this.editBoardForm.valid && this.editBoardId !== null) {
      const updateData: CreateBoardDTO = this.editBoardForm.value;
      this.boardService.updateBoard(this.editBoardId, updateData).subscribe({
        next: (updatedBoardDto: Board) => {
          console.log('Board updated:', updatedBoardDto);
          if (this.userMe) {
            const index = this.userMe.boards.findIndex(b => b.id === this.editBoardId);
            if (index !== -1) {
              const updatedBoard: Board = updatedBoardDto;
              this.userMe.boards[index] = updatedBoard;
            }
          }
          this.editBoardId = null;
          this.editBoardForm.reset();
        },
        error: (err) => {
          console.error('Failed to update board', err);
          this.errorMessage = 'Failed to update board.';
        }
      });
    }
  }

  openBoard(boardId: number): void {
    this.router.navigate(['/board-view', boardId]);
  }
}
