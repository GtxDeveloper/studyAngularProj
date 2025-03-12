import {HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';
import {catchError, switchMap, throwError} from 'rxjs';
let isRefreshing = false;
export const authTokenInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next:HttpHandlerFn ) => {
  const authService = inject(AuthService)
  const token = authService.token
  if(!token) return next(request);
  if(isRefreshing){
    return refreshAndProceed(authService, request, next)
  }

  return next(addToken(request,token)).pipe(
    catchError(error => {
      if (error.status === 403){
       return refreshAndProceed(authService, request, next)
      }
      return throwError(error);
    })
  )
}

const refreshAndProceed = (authService: AuthService, request:HttpRequest<any>, next:HttpHandlerFn) => {
  if(!isRefreshing){
    isRefreshing = true;
    return authService.refreshAuthToken().pipe(
      switchMap(token => {
        isRefreshing = false;
        return next(addToken(request,token.access_token))
      })
    )

  }

  return  next(addToken(request,authService.token!))
}
const addToken = (req:HttpRequest<any>,token:string) => {
   return  req = req.clone(
    {
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}
