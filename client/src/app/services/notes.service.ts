import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NoteInterface} from '../models/Note.interface';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) {
  }

  fetchAllNotes(): Observable<any> {
    return this.http.get('/api/notes');
  }

  create(note: string): Observable<any> {
    return this.http.post('/api/notes/', {note});
  }

  edit(note: NoteInterface): Observable<any> {
    return this.http.patch(`/api/notes/${note._id}`, note);
  }

  remove(note: NoteInterface): Observable<any> {
    return this.http.delete(`/api/notes/${note._id}`);
  }
}

