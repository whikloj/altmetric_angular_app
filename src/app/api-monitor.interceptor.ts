import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable()
export class ApiMonitorInterceptor implements HttpInterceptor {

  readonly retry_count: number = 10;
  readonly retry_wait_milliseconds: number = 2000;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({count: this.retry_count, delay: (error: any, retryCount: number) => {
        console.log({'interceptor count': retryCount, 'error': error});
        // If we get a 429 Too many requests then delay and try again.
        if (retryCount <= this.retry_count && error.status == 429) {
          return timer(this.retry_wait_milliseconds);
        }
        return of(error);
      }})
    );
  }
}
