import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotesService} from '../../services/notes.service';
import {ToggleService} from '../../services/toggle.service';
import {Subscription} from 'rxjs';
import {NoteInterface} from '../../models/Note.interface';

export interface OptionsInterface {
  status: boolean;
  message: string;
  type: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  notes: NoteInterface[] = [];

  options: OptionsInterface = {message: null, status: false, type: 'light'};
  statusValue = false;
  sub: Subscription;

  constructor(private notesService: NotesService, private toggle: ToggleService) {
  }

  ngOnInit(): void {
    this.toggle.setToggleValue(true);
    this.sub = this.notesService.fetchAllNotes().subscribe(
      (response) => {
        this.notes = response;
      },
      (error) => {
        this.statusValue = true;
      }
    );
  }

  closeAlertWindow(): void {
    this.options.status = false;
  }

  newNote(title: string): void {
    this.statusValue = true;
    this.notesService.create(title).subscribe((response) => {
        this.notes.unshift(response);
        this.options = {
          ...this.options, message: 'Successful created', status: true, type: 'success'
        };
        this.statusValue = false;
      },
      (error) => {
        this.options = {
          ...this.options, message: error.errors.message, status: true, type: 'warning'
        };
        this.statusValue = false;
      });
  }

  toggleEditNote(note: NoteInterface): void {
    this.statusValue = true;
    const toggleNote = this.notes.find(item => item._id === note._id);
    toggleNote.completed = !toggleNote.completed;
    this.notesService.edit(toggleNote).subscribe((response) => {
        this.statusValue = false;
      }, (error) => {
        console.log(error);
        this.options = {
          ...this.options, message: error, status: true, type: 'warning'
        };
        this.statusValue = false;
      }
    );
  }

  removeNote(note: NoteInterface): void {
    this.statusValue = true;
    const id = note._id;
    this.notesService.remove(note).subscribe((response) => {
        this.notes = this.notes.filter(item => item._id !== id);
        this.options = {
          ...this.options, message: 'Successful removed', status: true, type: 'success'
        };
        this.statusValue = false;
      }, (error) => {
        this.options = {
          ...this.options, message: error.errors.message, status: true, type: 'warning'
        };
        this.statusValue = false;
      }
    )
    ;
  }

  ngOnDestroy(): void {
    this.toggle.setToggleValue(false);
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }


}
