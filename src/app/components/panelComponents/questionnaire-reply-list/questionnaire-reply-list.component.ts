import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuestionnaireReply } from 'src/app/models/questionnaireModels/questionnaireReply';
import { MessageService } from 'src/app/services/message.service';
import { QuestionnaireReplieService } from 'src/app/services/questionnaire-replie.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-questionnaire-reply-list',
  templateUrl: './questionnaire-reply-list.component.html',
  styleUrls: ['./questionnaire-reply-list.component.css']
})
export class QuestionnaireReplyListComponent implements OnInit {

  questionnaireReplies:QuestionnaireReply[] = [];
  constructor(private questionnaireReplieService:QuestionnaireReplieService,
    private messageService:MessageService,
    private routerService:RouterService,
    private formBuilder:FormBuilder,  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll(){
    (await this.questionnaireReplieService.getAll()).subscribe( (response) =>{
      response.forEach( (responseData) =>{
        this.questionnaireReplies.push(
          {
            id:responseData.get("id"),
            userId:responseData.get("userId"),
            userEmail:responseData.get("userEmail"),
            createDate:responseData.get("createDate"),
            answer:responseData.get("answer"),
            questionnaireId:responseData.get("questionnaireId"),
          }
        )
      })
    })
  }

}
