import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-details-panel',
  templateUrl: './task-details-panel.component.html',
  styleUrls: ['./task-details-panel.component.css'],
  standalone: true
})
export class TaskDetailsPanelComponent {
  @Input() task?: Task;
  @Input() showPanel: boolean = false;
  @Output() closePanel = new EventEmitter<void>();

  close(): void {
    this.closePanel.emit();
  }
}
