import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ApiService } from '../service/api.service';
import { CLASSROOM_OPTIONS, PERIOD_OPTIONS } from '../constant/basic.constant';

export abstract class BaseComponent {
  protected init: () => void;
  public readonly classroomOptions = CLASSROOM_OPTIONS;
  public readonly periodOptions = PERIOD_OPTIONS;

  constructor(
    protected readonly titleService: Title,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
    protected readonly userService: UserService,
    protected readonly api: ApiService,
  ) {
    if (this.init) {
      this.init();
    }
  }

  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
