import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Questionnaire } from 'src/app/models/questionnaireModels/questionnaire';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'src/app/services/message.service';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  questionnaireAddForm:FormGroup;
  questions:Questionnaire[] = [];
  constructor(private questionnaireService:QuestionnaireService,
    private messageService:MessageService,
    private routerService:RouterService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.getAll();
  }

  createLoginForm(){
    this.questionnaireAddForm = this.formBuilder.group({
      title:["",Validators.required],
      body:["",Validators.required]
    })
  }

  async add(){
    if (this.questionnaireAddForm.valid) {
      const {title,body} = Object.assign({},this.questionnaireAddForm.value);
      (await this.questionnaireService.add({
        id:"fQiQrQeQ"+Date.now().toString(),
        title:title,
        body:body,
        createDate:""
      })).subscribe( (response) => {
        this.messageService.success("Başarıyla eklendi")
      })
    } else {
      this.messageService.warning("lütfen bilgileri eksik girmediğinizi kontrol edin")
    }
  }


  async getAll(){
    (await this.questionnaireService.getAll()).subscribe( (response) =>{
      response.forEach( (responseData) =>{
        this.questions.push(
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
