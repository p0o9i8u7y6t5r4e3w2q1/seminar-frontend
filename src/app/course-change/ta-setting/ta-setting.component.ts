import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-ta-setting',
  templateUrl: './ta-setting.component.html',
  styleUrls: ['./ta-setting.component.css'],
})
export class TaSettingComponent extends BaseComponent implements OnInit {
  protected title = '助教管理';
  courseName: string;

  
  taTestList = [
    {id: 'H31234567' , name: '王一明'},
    {id: 'H31234575' , name: '王二明'},
    {id: 'H31234583' , name: '王三明'},
    {id: 'H31234591' , name: '王四明'},
  ]

  TAs: any[];

  ngOnInit() {
    super.setTitle(this.title);
    this.courseName=this.route.snapshot.params['course'];
    this.api.getStatusAfterInit((work: boolean, hasToken: boolean) => {
      if (work) {
        this.TAs = this.taTestList;
      } else {
        this.TAs = this.taTestList;
      }
    });
  }
}
