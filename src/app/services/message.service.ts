import { Injectable } from '@angular/core';

declare const alertify:any;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  alert(message:string,title?:string){
    alertify.alert(message,title);
  }

  default(message:string){
    alertify.message(message);
  }

  success(message:string){
    alertify.success(message);
  }

  error(message:string){    
    alertify.error(message);
  }

  warning(message:string){
    alertify.warning(message);
  }

}
