import { Injectable } from '@angular/core';
import { 
  addDoc, collection,
  deleteDoc,
  doc, getDoc, getDocs,
  getFirestore, onSnapshot,
   orderBy, query, updateDoc, where 
} from "firebase/firestore"; 
import { from, of } from 'rxjs';
import { Questionnaire } from '../models/questionnaireModels/questionnaire';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private readonly collectionPath:string = "questionnaires";
  private questionnaireCollection = collection(getFirestore(),this.collectionPath);
  private readonly questionnaireTitleField = "title";

  constructor() { }

  
  async getByQuestionnaireTitle(questionnaireTitle:string){
    const getQuery = query(this.questionnaireCollection,where(this.questionnaireTitleField,"==",questionnaireTitle));
    const querySnapshot =  (await getDocs(getQuery));      
    return of(querySnapshot);
  }

  async getAll(){
    const getQuestionnaires = await getDocs(this.questionnaireCollection);
    return of(getQuestionnaires);
  }

  
  async add(questionnaire:Questionnaire){
    const addOperation = await addDoc(this.questionnaireCollection, {
      id:questionnaire.id,
      title: questionnaire.title,
      body: questionnaire.body,
      createDate:Date.now().toString()
    });
    return of(addOperation);
  }

  async update(questionnaire:Questionnaire){
    const questionnaireDocRef = doc(getFirestore(), this.collectionPath, questionnaire.id == null ? questionnaire.title : questionnaire.id);
    const updateOperation = await updateDoc(questionnaireDocRef,{
      title: questionnaire.title,
      body: questionnaire.body,
      createDate:Date.now().toString()
    });
    return of(updateOperation);
  }
  
}
