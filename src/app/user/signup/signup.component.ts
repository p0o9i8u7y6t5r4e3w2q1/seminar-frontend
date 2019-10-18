import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';
import { CreateUserDto } from '../../../lib/api-request';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent extends BaseComponent implements OnInit {
  protected title = '註冊';

  form: CreateUserDto = {
    userID: '',
    name: '',
    password: '',
    email: '',
  };

  pwdCheck: '';

  ngOnInit() {
    super.setTitle(this.title);
  }

  onSubmit() {
    this.api.post('users/TA', this.form).subscribe(() => {
      alert('您現在可以登入');
      this.router.navigate(['/login']);
    });
  }
}
