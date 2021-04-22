import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit, DoCheck {
  title;
  message;
  isLoading = false;
  @Input() statusValue: boolean;
  @Output() outputNewNote: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    if (this.statusValue) {
      this.isLoading = false;
    }
  }

  addNewNote(): void {
    this.isLoading = true;
    if (this.title.trim().length !== 0) {
      this.outputNewNote.emit(this.title);
    }
    this.title = '';
  }


}
