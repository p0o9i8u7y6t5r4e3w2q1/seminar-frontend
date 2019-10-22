import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { BaseComponent } from '../../basic';
import { User } from '../../../lib/api-response';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent extends BaseComponent implements OnInit {
  protected title = '個資修改';

  user: User = {} as User;

  password: any = {
    oldPwd: '',
    newPwd: '',
    newPwd2: '',
  };

  ngOnInit() {
    super.setTitle(this.title);
    this.userService
      .isLogin$.pipe(take(1))
      .subscribe((isLogin: boolean) => {
        if (isLogin) {
          this.user = this.userService.getUser();
        } else {
          alert('尚未登入，請登入再操作');
          this.router.navigate(['/']);
        }
      });
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
