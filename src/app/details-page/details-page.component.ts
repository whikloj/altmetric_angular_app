import { Component, Input, inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, ObservableInput } from 'rxjs';

import { ResultService } from '../result.service';
import { AltmetricResult } from '../altmetric-result';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent {
  @Input() id = '';
  result!: AltmetricResult;
  private rService: ResultService;
  labels: string[][] = [
    ['title', 'Title'],
    ['score', 'Current Altmetric Attention Score'],
    ['doi', 'Relevant DOI'],
    ['pmid', 'Related Pubmed Identifier'],
    ['pmc', 'Related Pubmed Central Identifier'],
    ['uri', 'URI for a captured identifier'],
    ['url', 'URL to publication page'],
    ['isbns', 'Relevant ISBN(s)'],
    ['handles', 'Relevant Handle(s)'],
    ['issns', 'Relevant ISSN(s)'],
    ['journal', 'Name of publication journal'],
    ['pubdate', 'The print date that the publication was published.'],
    ['epubdate', 'The date that the publication was published electronically.'],
    ['abstract', 'Full abstract for the article'],
    ['abstract_source', 'Source for the abstract (e.g PUBMED)'],
    ['authors', 'Author names'],
    ['type', 'Object type'],
    ['cited_by_fbwalls_count', 'Number of walls that have mentioned the output on Facebook'],
    ['cited_by_feeds_count', 'Number of blogs that have mentioned the publication'],
    ['cited_by_gplus_count', 'Number of accounts that have shared on Google+'],
    ['cited_by_msm_count', 'Number of news sources that have mentioned the publication'],
    ['cited_by_rdts_count', 'Number of Redditors that have posted about this publication'],
    ['cited_by_qna_count', 'Number of forum and Stack Exchange based sites accounts that have mentioned this publication'],
    ['cited_by_tweeters_count', 'Number of twitter accounts that have tweeted this publication'],
    ['cited_by_wikipedia_count', 'Number of wikipedia pages that have cited this publication'],
    ['cited_by_policies_count', 'Number of policies that have mentioned this publication'],
    ['cited_by_patents_count', 'Number of patents that have mentioned this publication'],
    ['cited_by_videos_count', 'Number of Youtube channels'],
    ['cited_by_accounts_count', 'The number of unique sources referencing the research output'],
    ['cited_by_posts_count', 'The total number of individual posts for the requested research output'],
    ['last_updated', 'Last time the score changed.'],

    ['added_on', 'Date when Altmetric first captured attention.'],
    ['details_url', 'URL to relevant Altmetric Details Page'],
    ['authors_or_editors', 'Author and editor names'],
    ['attribution', 'Source of data. For example Google Books']
  ];
  date_fields: string[] = [
    'last_updated',
    'pubdate',
    'epubdate',
    'added_on'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ResultService
  ) {
    this.rService = service;
  }

  ngOnInit() {
    console.log(`id is ${this.id}`);
    let tempResult = this.rService.getRecordById(parseInt(this.id));
    if (typeof tempResult !== 'undefined') {
      this.result = tempResult;
    } else {
      throw new DOMException("WAAAAAAH");
    }
  }

  formatValue(key: string, obj: any) {
    if (this.date_fields.includes(key)) {
      let d = new Date(obj*1000);
      return d.toUTCString();
    } else {
      return obj;
    }
  }
}
