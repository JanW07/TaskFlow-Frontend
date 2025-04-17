import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Task } from '../../models/task';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-task-details-panel',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  standalone: true,
  templateUrl: './task-details-panel.component.html',
  styleUrls: ['./task-details-panel.component.css']
})
export class TaskDetailsPanelComponent implements OnInit {
  @Input() task!: Task;
  @Input() showPanel = false;
  @Output() closePanel = new EventEmitter<void>();
  @Output() updateTask = new EventEmitter<Task>();

  @ViewChild('titleTextarea') titleTA!: ElementRef<HTMLTextAreaElement>;
  isEditingName = false;

  @ViewChild('descTextarea') descTA!: ElementRef<HTMLTextAreaElement>;
  isEditingDescription = false;

  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.task?.name || '', Validators.required],
      description: [this.task?.description || '', Validators.required]
    });
  }

  enterNameEdit() {
    this.isEditingName = true;

    setTimeout(() => {
      const ta = this.titleTA.nativeElement;
      this.autoGrowOnInit(ta);
      ta.focus();
    }, 0);
  }
  enterDescriptionEdit() {
    this.isEditingDescription = true;
    setTimeout(() => {
      const ta = this.descTA.nativeElement;
      this.autoGrowOnInit(ta);
      ta.focus();
    }, 0);
  }
  exitNameEdit() {
    this.isEditingName = false;
  }
  exitDescriptionEdit() {
    this.isEditingDescription = false;
  }
  
  autoGrowOnInit(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  autoGrow(event: Event) {
    const textarea = (event.target as HTMLTextAreaElement);
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  close(): void {
    this.closePanel.emit();
  }
}
