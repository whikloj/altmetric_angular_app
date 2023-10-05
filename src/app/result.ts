import { AltmetricImages } from './altmetric-images';

/**
 * An altmetric count api query object
 */
interface AltmetricResult {
  [key: string]: string | number | string[] | AltmetricImages | Date;
  title: string;
  altmetric_id: number;
  doi: string;
  pmid: string;
  pmc: string;
  uri: string;
  url: string;
  isbns: string[];
  altmetric_jid: string;
  handles: string[];
  issns: string[];
  journal: string;
  pubdate: number;
  epubdate: number;
  published_on: number;
  abstract: string;
  abstract_source: string;
  authors: string[];
  type: string;
  cited_by_fbwalls_count: number;
  cited_by_feeds_count: number;
  cited_by_gplus_count: number;
  cited_by_msm_count: number;
  cited_by_rdts_count: number;
  cited_by_qna_count: number;
  cited_by_tweeters_count: number;
  cited_by_wikipedia_count: number;
  cited_by_policies_count: number;
  cited_by_patents_count: number;
  cited_by_videos_count: number;
  cited_by_accounts_count: number;
  cited_by_posts_count: number;
  last_updated: number;
  score: number;
  added_on: number;
  scopus_subjects: string[];
  subjects: string[];
  readers_count: number;
  images: AltmetricImages;
  details_url: string;
  authors_or_editors: string[];
  attribution: string;
}

/**
 * An OpenAlex Works object.
 */
interface OpenAlexResult {
  [key: string]: string | number | string[] | Object | Object[] | Date;
  abstract_inverted_index: Object[];
  authorships: Authorship[];
  apc_list: Object;
  apc_paid: Object;
  best_oa_location: Object;
  biblio: Object;
  cited_by_api_url: string;
  cited_by_count: number;
  concepts: Object[];
  corresponding_author_ids: string[];
  corresponding_institution_ids: string[];
  countries_distinct_count: number;
  counts_by_year: Object[];
  created_date: Date;
  display_name: string;
  doi: string;
  grants: Object[];
  id: string;
  ids: Object;
  institutions_distinct_count: number;
  is_oa: boolean;
  is_paratext: boolean;
  is_retracted: boolean;
  language: string;
  license: string;
  locations: Object[];
  locations_count: number;
  mesh: Object[];
  ngrams_url: string;
  open_access: Object;
  primary_location: Object;
  publication_date: Date;
  publication_year: number;
  referenced_works: string[];
  related_works: string[];
  sustainable_development_goals: Object[];
  title: string;
  type: string;
  type_crossref: string;
  updated_date: Date;
}

/**
 * An OpenAlex authorship object.
 */
interface Authorship {
  author: string;
  author_position: string;
  countries: string[];
  institutions: Object[];
  is_corresponding: boolean;
  raw_affiliation_name: string;
  raw_author_name: string;
}

/**
 * A result object storing one or both of the Altmetric and OpenAlex information.
 */
class Result {
  [key: string]: string | number[] | string[] | Object | Date | AltmetricResult | OpenAlexResult;
  ids: string[] = [];
  dois: string[] = [];
  title: string[] = [];
  type: string[] = [];
  publication_date!: Date;
  author_names: string[] = [];
  scores: number[] = [];
  cited_by_counts: Map<string, number> = new Map();
  altmetric_details!: AltmetricResult;
  openalex_details!: OpenAlexResult;

  constructor() {
    this.cited_by_counts.set('altmetric', 0);
    this.cited_by_counts.set('openalex', 0);
  }

  /**
   * Set the object common properties from an Altmetric object.
   * @param {AltmetricResult | null} obj - An altmetric object or null if none.
   */
  setFromAltmetric(obj: AltmetricResult | null): void {
    if (obj !== null) {
      this.altmetric_details = obj;
      this.ids.push(obj.altmetric_id.toString());
      this.dois.push(this._formatDoi(obj.doi));
      this.title.push(obj.title);
      this.type.push(obj.type);
      if (typeof(this.publication_date) === 'undefined') {
          this.publication_date = new Date(parseInt(obj.published_on.toString())*1000);
      }
      this.author_names = this.author_names.concat(obj.authors);
      this.scores.push(obj.score);
      this.cited_by_counts.set('altmetric', obj.cited_by_posts_count);
      this._dedupMainProps();
    }
  }

  /**
   * Set the object common properties from an OpenAlex object.
   * @param {OpenAlexResult} obj - An openalex object.
   */
  setFromOpenAlex(obj: OpenAlexResult): void {
    this.openalex_details = obj;
    this.ids.push(obj.id);
    this.dois.push(this._formatDoi(obj.doi));
    this.title.push(obj.title);
    this.type.push(obj.type);
    if (typeof(this.publication_date) === 'undefined') {
      this.publication_date = obj.publication_date;
    }
    obj.authorships.map(e => e.author).forEach((ele: string) => this.author_names.push(ele));
    this.cited_by_counts.set('openalex', obj.cited_by_count);
    this._dedupMainProps();
  }

  /**
   * Deduplicate common fields incase of duplicate information from both APIs.
   */
  private _dedupMainProps(): void {
    this.dois = [...new Set(this.dois)];
    this.ids = [...new Set(this.ids)];
    this.title = [...new Set(this.title)];
    this.type = [...new Set(this.type)];
    this.author_names = [...new Set(this.author_names)];
  }

  /**
   * Remove the default DOI base URI.
   * @param {string} new_doi - The DOI URI to alter.
   */
  private _formatDoi(new_doi: string): string {
    return new_doi.replace('https://doi.org/', '').toLowerCase()
  }
}

export { Result, AltmetricResult, OpenAlexResult };
