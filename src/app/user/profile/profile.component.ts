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
    oldPassword: '',
    newPassword: '',
  };
  newPassword2: '';

  ngOnInit() {
    super.setTitle(this.title);
    this.userService.isLogin$.pipe(take(1)).subscribe((isLogin: boolean) => {
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

  updateInfo() {
    this.api.put('/user/info', { email: this.user.email }).subscribe({
      next: () => alert('更新成功'),
      error: error => alert('更新失敗'),
    });
  }

  updatePassword() {
    if (this.password.newPassword !== this.newPassword2) {
      alert('新密碼輸入必須相同');
      return;
    }

    this.api.put('/user/password', this.password).subscribe({
      next: () => alert('更新成功'),
      error: error => alert('更新失敗'),
    });
  }
}
