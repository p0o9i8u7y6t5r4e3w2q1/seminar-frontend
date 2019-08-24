import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent extends BaseComponent implements OnInit {
  protected title = '個資修改';

  user: any = {
    id: '',
    name: '',
    email: '',
  };

  password: any = {
    oldPwd: '',
    newPwd: '',
    newPwd2: '',
  };

  ngOnInit() {
    super.setTitle(this.title);
    this.authService.getUserAfterInit((user: any) => this.initUser(user));
  }

  initUser(user: any) {
    if (user) {
      this.user.id = user.id;
      this.user.name = user.name;
      this.user.email = user.email;
    } else {
      alert('尚未登入，請登入再操作');
      this.router.navigate(['/']);
    }
  }

  updateUser() {}

  updatePassword() {
    this.api.post('/user/updatePassword', this.password);
  }
}
