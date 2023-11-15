import i18nextXHRBackend from 'i18next-xhr-backend';
import i18nextLanguageDetector from 'i18next-browser-languagedetector';

import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  defaultInterpolationFormat,
  I18NEXT_SERVICE,
  I18NextLoadResult,
  I18NextModule,
  I18NextTitle,
  ITranslationService
} from 'angular-i18next';
import * as i18n from 'i18next';

const INIT_OPTIONS: i18n.InitOptions = {
  // @ts-ignore
  whitelist: ['en', 'gr'],
  fallbackLng: 'en',
  debug: true,
  returnEmptyString: false,
  ns: [
    'translations'
  ],
  interpolation: {
    format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
  },
  backend: {
    loadPath: '../assets/locales/{{lng}}.{{ns}}.json'
  },
  // lang detection plugin options
  detection: {
    // order and from where user language should be detected
    order: ['querystring', 'cookie'],
    // keys or params to lookup language from
    lookupCookie: 'lang',
    lookupQuerystring: 'lng',
    // cache user language on
    caches: ['localStorage', 'cookie'],
    // optional expire and domain for set cookie
    cookieMinutes: 10080, // 7 days
  }
};

export function i18nInit(i18next: ITranslationService): () => Promise<I18NextLoadResult> {
  return () =>
    i18next
      .use(i18nextXHRBackend)
      .use(i18nextLanguageDetector)
      .init(INIT_OPTIONS);
}

function localeIdFactory(i18next: ITranslationService): string {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: i18nInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: Title,
    useClass: I18NextTitle
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  }
];
