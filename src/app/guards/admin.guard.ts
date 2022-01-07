import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { MessageService } from '../services/message.service';
import { RouterService } from '../services/router.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  
  private isActive:boolean = false;

  //admin id
  private readonly userId:string = "Ybi8duhRwIXe1T6ivjHjIRi8z5q2";
  constructor(private authenticationService:AuthenticationService,
    private messageService:MessageService,
    private routerService:RouterService) {
    this.getUser();
  }

  getUser(){
    
    this.authenticationService.currentUser$.subscribe( (response) =>{
      if (response.uid === this.userId) {        
        this.isActive = true;
        this.routerService.route("panel")
        this.messageService.success("Yönlendiriyorsunuz")  
      } else {
        this.isActive = false;
        this.messageService.error("Lütfen Yönetici olduğunuzu doğrulayın!")
      }
    })

  }
  
  
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      return this.isActive;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.isActive;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.isActive;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.isActive;
  }
}
