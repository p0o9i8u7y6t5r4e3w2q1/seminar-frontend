import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  protected title = '登入';

  userID: string;
  password: string;

  ngOnInit() {
    super.setTitle(this.title);
  }

  login() {
    this.authService.login(this.userID, this.password).subscribe({
      next: () => {
        alert('登入成功');
        this.router.navigate(['/course-change']);
      },
      error: () => alert('帳號或密碼錯誤'),
    });
  }
}
