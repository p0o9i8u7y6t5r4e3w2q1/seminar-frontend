import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent extends BaseComponent implements OnInit {
  protected title = '忘記密碼';

  ngOnInit() {
    super.setTitle(this.title);
  }
}
