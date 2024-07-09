import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { retry } from 'rxjs/operators';

/**
 * This interceptor is used to retry requests that fail with a 429 Too many requests error.
 */
@Injectable()
export class ApiMonitorInterceptor implements HttpInterceptor {
  // The number of times to retry.
  readonly retry_count: number = 10;
  // The number of milliseconds to wait between retries.
  readonly retry_wait_milliseconds: number = 2000;

  /**
   * Interceptor method.
   * @param request the current request.
   * @param next the http handler.
   * @returns a timer or the error.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({count: this.retry_count, delay: (error: any, retryCount: number) => {
        console.log({'interceptor count': retryCount, 'error': error});
        // If we get a 429 Too many requests then delay and try again.
        if (retryCount <= this.retry_count && error.status == 429) {
          return timer(this.retry_wait_milliseconds);
        }
        return throwError(() => error);
      }})
    );
  }
}
