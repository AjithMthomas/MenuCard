import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpRequest,
  } from '@angular/common/http';
  import { tap } from 'rxjs';
  import { inject } from '@angular/core';
  import { Router } from '@angular/router';
  
  export function authInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
  ) {
    const router = inject(Router);
  
    let clonedRequest: HttpRequest<unknown>;
  
    const excludedUrls = ['captain/captain-login', '/master/login'];
  
    const headerWithCaptainToken = {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('captainToken')}`,
    };
  
    const headerWithMasterToken = {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('masterToken')}`
    }
    
    clonedRequest = req.clone({
      setHeaders: req.url.includes('master') ? headerWithMasterToken : headerWithCaptainToken
    });
  
    function updateUrlRequest(req: HttpRequest<unknown>): string {
      if (req.method === "GET" && !req.url.includes('captain-login') && !req.url.includes('master')) {
        const alreadyHasAParam = req.url.split("?").length > 1;
        if (alreadyHasAParam) {
          return `${req.url}&restaurant_id=${localStorage.getItem('restaurantId')}`
        }  
        return `${req.url}?restaurant_id=${localStorage.getItem('restaurantId')}`
      } else {
        return req.url;
      }
    }
    
    function appendToBody(req: HttpRequest<unknown>) {
      if ((req.method === "POST" || req.method === "PUT" || req.method === "PATCH") && (!req.url.includes('captain-login') && !req.url.includes('master'))) {
        const stringifiedObj = JSON.stringify(req.body);
        console.log(stringifiedObj,'herereeee');
        const form = { ...JSON.parse(stringifiedObj), restaurant_id: localStorage.getItem('restaurantId') }        
        console.log(form);
        
        return form
      } else {
        return req.body;
      }
    }
  
    return next(excludedUrls.includes(router.url) ? req : clonedRequest).pipe(
      tap(
        (response) => {},
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
           
           window.alert('somthing went wrong')
          }
        },
      ),
    );
  }
  