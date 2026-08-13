import { TemplateId } from './invoice';

export type TemplateCategory =
  | 'All'
  | 'Corporate'
  | 'Freelancer'
  | 'Services'
  | 'Agency'
  | 'IT & Software'
  | 'Retail'
  | 'Creative';

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  category: TemplateCategory;
  description: string;
  accentColor: string;
}
