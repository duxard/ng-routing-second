import { Component, Inject, OnInit } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styles: []
})
export class LanguageSwitchComponent implements OnInit {
  language = 'en';
  languages: string[] = ['en', 'gr'];

  constructor(
    @Inject(I18NEXT_SERVICE) private readonly i18NextService: ITranslationService
  ) {}

  ngOnInit(): void {
    this.i18NextService.events.initialized.pipe(untilDestroyed(this)).subscribe((e) => {
      if (e) {
        this.updateState(this.i18NextService.language);
      }
    });
  }

  changeLanguage(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (value !== this.i18NextService.language) {
      this.i18NextService.changeLanguage(value).then(x => {
        this.updateState(value);
        document.location.reload();
      });
    }
  }

  private updateState(lang: string): void {
    this.language = lang;
  }
}
