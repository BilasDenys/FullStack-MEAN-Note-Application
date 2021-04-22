import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NoteInterface} from "../../models/Note.interface";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  editStatus = false;
  @Input() noteProps: NoteInterface;
  @Output() removeNote: EventEmitter<NoteInterface> = new EventEmitter<NoteInterface>();
  @Output() editNoteChange: EventEmitter<NoteInterface> = new EventEmitter<NoteInterface>();

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleEditStatus(): void {
    this.editStatus = !this.editStatus;
  }

  edit(note: NoteInterface): void {
    this.editStatus = true;
    if (note) {
      note = {
        ...note, completed: note.completed, title: note.title
      };
      this.editNoteChange.emit(note);
      this.editStatus = false;
    }
  }

  remove(note: NoteInterface): void {
    if (note) {
      this.removeNote.emit(note);
    }
  }

}
