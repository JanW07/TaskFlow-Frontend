import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../board.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Board } from '../models/board';


@Component({
  selector: 'app-board-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.css']
})
export class BoardViewComponent implements OnInit {
  board?: Board;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const boardId = Number(this.route.snapshot.paramMap.get('id'));
    this.boardService.getBoard(boardId).subscribe({
      next: (data) => this.board = data,
      error: (err) => {
        console.error('Failed to load board', err);
        this.errorMessage = 'Failed to load board.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
