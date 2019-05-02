import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {auth} from 'firebase';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.getAdmin();
  }

}
