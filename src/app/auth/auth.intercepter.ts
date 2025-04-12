import {HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';
import {BehaviorSubject, catchError, filter, switchMap, tap, throwError} from 'rxjs';
let isRefreshing$ = new BehaviorSubject<boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next:HttpHandlerFn ) => {
  const authService = inject(AuthService)
  const token = authService.token
  if(!token) return next(request);
  if(isRefreshing$.value){
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
  if(!isRefreshing$.value){
    isRefreshing$.next(true);
    return authService.refreshAuthToken().pipe(
      switchMap(token => {
        return next(addToken(request,token.access_token)).pipe(
          tap(res => {
            isRefreshing$.next(false);
          })
        )
      })
    )

  }

  if(request.url.includes('refresh')){
    return next(addToken(request, authService.token!))
  }

  return isRefreshing$.pipe(
    filter(isRefreshing => !isRefreshing),
    switchMap(res => {
      return next(addToken(request, authService.token!))
    })
  )


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
