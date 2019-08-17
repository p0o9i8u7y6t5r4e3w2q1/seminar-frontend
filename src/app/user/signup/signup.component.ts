import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent extends BaseComponent implements OnInit {
  protected title = '註冊';

  ngOnInit() {
    super.setTitle(this.title);
  }
}
