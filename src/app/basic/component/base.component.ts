import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ApiService } from '../service/api.service';
import { CLASSROOM_OPTIONS, PERIOD_OPTIONS } from '../constant/basic.constant';

export abstract class BaseComponent {
  protected init: () => void;
  protected readonly classroomOptions = CLASSROOM_OPTIONS;
  protected readonly periodOptions = PERIOD_OPTIONS;

  constructor(
    protected readonly titleService: Title,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
    protected readonly authService: AuthService,
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
