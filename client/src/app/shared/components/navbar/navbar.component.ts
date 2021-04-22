import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Location} from "@angular/common";
import {ToggleService} from "../../../services/toggle.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService, public toggle: ToggleService) {
  }

  ngOnInit(): void {
  }

  logOut(): void {
    this.auth.logOut();
    this.router.navigate(['/admin/login']);
    this.toggle.setToggleValue(false);
  }

}
