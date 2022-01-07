import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { randomInt } from 'crypto';
import { title } from 'process';
import { Questionnaire } from 'src/app/models/questionnaireModels/questionnaire';
import { UserModel } from 'src/app/models/userModels/userModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'src/app/services/message.service';
import { QuestionnaireReplieService } from 'src/app/services/questionnaire-replie.service';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.css']
})
export class QuestionnaireListComponent implements OnInit {

  questionnaireReplieAddForm:FormGroup;
  questionnaires:Questionnaire[] = [];
  
  userModel:UserModel = {id:"",email:"",displayName:""};
  
  constructor(private questionnaireService:QuestionnaireService,
    private questionnaireReplieService:QuestionnaireReplieService,
    private messageService:MessageService,
    private routerService:RouterService,
    private formBuilder:FormBuilder,    
    private authenticationService:AuthenticationService) { }

    ngOnInit(): void {
      this.createLoginForm();
      this.getAll();
    }
  
    createLoginForm(){
      this.questionnaireReplieAddForm = this.formBuilder.group({
        answer:["",Validators.required]
      
      })
    }

     
  getUser(){
    this.authenticationService.currentUser$.subscribe( (response) =>{
      this.userModel.id = response.uid;
      this.userModel.email = response.email;
      this.userModel.displayName = response.displayName;
    })
  }
  
  
    async reply(getQuestionnaireId:string){
      console.log(getQuestionnaireId)
      if (this.questionnaireReplieAddForm.valid) {
        const {answer} = Object.assign({},this.questionnaireReplieAddForm.value);
        (await this.questionnaireReplieService.add(
          {
            id:"sdasa"+ Date.now().toString(),
            createDate:"",
            questionnaireId:getQuestionnaireId,
            answer:answer,
            userId:this.userModel.id,
            userEmail:this.userModel.email
          }
        )).subscribe( () =>{
          this.messageService.alert("Anket dolduruldu","Başarılı")
        })
      } else {
        this.messageService.warning("lütfen bilgileri eksik girmediğinizi kontrol edin")
      }
    }

  async getAll(){
    (await this.questionnaireService.getAll()).subscribe( (response) =>{
      response.forEach( (responseData) =>{
        this.questionnaires.push(
          {
            id:responseData.get("id"),
            title:responseData.get("title"),
            body:responseData.get("body"),
            createDate:responseData.get("createDate")
          }
        )
      })
    })
  }
}
