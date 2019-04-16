import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  public user: firebase.User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.state.subscribe(authData => {
      this.user = authData;
    });
  }
}
