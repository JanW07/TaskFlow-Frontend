import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-details-panel',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './task-details-panel.component.html',
  styleUrls: ['./task-details-panel.component.css']
})
export class TaskDetailsPanelComponent implements OnInit {
  @Input() task!: Task;
  @Input() showPanel = false;
  @Output() closePanel = new EventEmitter<void>();
  @Output() updateTask = new EventEmitter<Task>();

  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.task?.name || '', Validators.required],
      description: [this.task?.description || '', Validators.required]
    });
  }

  submitEdit(): void {
    if (this.editForm.valid) {
      const updatedTask: Task = {
        ...this.task,
        ...this.editForm.value
      };
      this.updateTask.emit(updatedTask);
      this.closePanel.emit();
    }
  }

  close(): void {
    this.closePanel.emit();
  }
}
