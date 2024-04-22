import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpContextToken,
  HttpResponse,
} from '@angular/common/http';
import {
  catchError,
  Observable,
  throwError,
  finalize,
  tap,
  TimeoutError,
  timeout,
} from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

export const LOADING = new HttpContextToken<boolean>(() => true); //Se passar false n fará o loading padrao nessa requisição

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {
  private activeRequest = 0;
  private msgError = 'Erro Desconhecido';
  private successMessage = 'Operação realizada com sucesso';
  // timeoutValue = 180000;
  timeoutValue = 1800000;
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.activeRequest === 0 && request.context.get(LOADING)) {
      this.spinner.show();
    }

    this.activeRequest++;
    return next.handle(request).pipe(
      timeout(this.timeoutValue),
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (
            (event.status == 201 ||
              event.status == 203 ||
              event.status == 204 ||
              event.status == 210) &&
            request.context.get(LOADING)
          ) {
            this.toastr.success(
              event.body?.message || this.successMessage,
              `Informação:`
            );
          }
        }
      }),
      catchError((error: HttpErrorResponse | TimeoutError) => {
        if (error instanceof TimeoutError) {
          this.toastr.error(
            'Tempo limite excedido. Verifique sua conexão!',
            'Código: 0'
          );
        } else  {
          switch (error.status) {
            case 401:
              break;
            case 408:
              this.msgError = 'Timeout, verifique sua conexão!';
              break;
            case 0:
              this.msgError =
                'Não foi possível conectar-se ao servidor. Por favor, <b>verifique sua conexão com a internet!</b>';
              break;
            default:
              break;
          }

          if(error.status !== 404) {
            this.toastr.error(
              error.error?.message || this.msgError,
              `Error: ${error.status || 0}`
            );
          }
        }
          return throwError(() => error);
      }),
      finalize(() => {
        this.activeRequest--;
        if (this.activeRequest === 0) {
          this.spinner.hide();
        }
      })
    );
  }
}
