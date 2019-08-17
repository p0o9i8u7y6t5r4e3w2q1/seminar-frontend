import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

export class BaseComponent {
  constructor(
    protected readonly titleService: Title,
    protected readonly route: ActivatedRoute,
  ) {}

  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
