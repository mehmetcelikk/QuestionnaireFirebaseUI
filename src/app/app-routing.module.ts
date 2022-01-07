import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authenticationComponens/login/login.component';
import { RegisterComponent } from './components/authenticationComponens/register/register.component';
import { HomeComponent } from './components/environmentComponents/home/home.component';
import { NotFoundComponent } from './components/environmentComponents/not-found/not-found.component';
import { PanelComponent } from './components/panelComponents/panel/panel.component';
import { QuestionnaireAddComponent } from './components/questionnaireComponents/questionnaire-add/questionnaire-add.component';
import { QuestionnaireListComponent } from './components/questionnaireComponents/questionnaire-list/questionnaire-list.component';
import { QuestionnaireUpdateComponent } from './components/questionnaireComponents/questionnaire-update/questionnaire-update.component';


import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard'
import { AdminGuard } from './guards/admin.guard';
import { QuestionnaireReplyListComponent } from './components/panelComponents/questionnaire-reply-list/questionnaire-reply-list.component';

const redirectToLogin = () => redirectUnauthorizedTo(["account/login"]);
const redirectToPanel = () => redirectLoggedInTo(["panel"])

const routes: Routes = [
  {path:'',component:HomeComponent},

  {path:'account',...canActivate(redirectToPanel),children:[
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
  ]},

  {path:'panel',...canActivate(redirectToLogin),canActivate:[AdminGuard],children:[
    {path:'',component:PanelComponent},
    {path:'home',component:PanelComponent}
  ]},

  {path:'questionnaire',...canActivate(redirectToLogin),children:[
    {path:'list',component:QuestionnaireListComponent},
    {path:'add',canActivate:[AdminGuard],component:QuestionnaireAddComponent},
    {path:'update/:id',canActivate:[AdminGuard],component:QuestionnaireUpdateComponent}
  ]},

  {path:'questionnaireReply',...canActivate(redirectToLogin),children:[
    {path:'list',component:QuestionnaireReplyListComponent},
  ]},


  {path:'**',component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
