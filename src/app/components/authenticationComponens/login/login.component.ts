import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'src/app/services/message.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private authenticationService:AuthenticationService,
    private messageService:MessageService,
    private routerService:RouterService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      const {email,password} = this.loginForm.value;
      this.authenticationService.login({
        email:email,
         password:password
      }).subscribe( (response) =>{
        this.routerService.route("panel");
        this.messageService.success("Hoş Geldiniz" + response.user.displayName);
      })
    } else {
      this.messageService.warning("lütfen bilgileri eksik girmediğinizi kontrol edin")
    }
  }

}
