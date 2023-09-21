import { AltmetricImages } from './altmetric-images';

export interface AltmetricResult {
  title: string;
  altmetric_id: number;
  doi: string;
  pmid: string;
  pmc: string;
  uri: string;
  url: string;
  cited_by_policies_count: number;
  cited_by_patents_count: number;
  cited_by_accounts_count: number;
  published_on: number;
  abstract: string;
  authors: string[];
  type: string;
  score: number;
  last_updated: number;
  images: AltmetricImages;
  details_url: string;
}
