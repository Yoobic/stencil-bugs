import { IEntity } from '../entity/entity.interface';

export class ITranslation extends IEntity {
  language: string;
  key: string;
  value: string;
  translateButton?: any;
  resetButton?: any;

  en: string;
  us: string;
  fr: string;
  es: string;
  pl: string;
  nl: string;
  de: string;
  it: string;
  ru: string;
  zhs: string;
  zht: string;
  pt: string;
  kr: string;
  ja: string;
  ua: string;
  he: string;
  ar: string;
  cz: string;
  th: string;
  tr: string;
  bg: string;
  el: string;
  sl: string;
  sk: string;
  isReject: boolean;
  group: string | Array<string>;
  isPhotoAnnotation: boolean;
}