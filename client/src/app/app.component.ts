import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    const keyName = 'token';
    const potentialToken = this.auth.getLocalStorage(keyName);
    if (potentialToken) {
      this.auth.setToken(potentialToken);
    }
  }
}
