import { Injectable } from '@angular/core';
import { 
  addDoc, collection,
  deleteDoc,
  doc, getDoc, getDocs,
  getFirestore, onSnapshot,
   orderBy, query, updateDoc, where 
} from "firebase/firestore"; 
import { of } from 'rxjs';
import { QuestionnaireReply } from '../models/questionnaireModels/questionnaireReply';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireReplieService {

  private readonly collectionPath:string = "questionnaireReplies";
  private questionnaireReplyCollection = collection(getFirestore(),this.collectionPath);
  private readonly questionnaireIdField = "id";

  constructor() { }

  
  async getByQuestionnaireReplieId(questionnaireReplieId:string){
    const getQuery = query(this.questionnaireReplyCollection,where(this.questionnaireIdField,"==",questionnaireReplieId));
    const querySnapshot =  (await getDocs(getQuery));      
    return of(querySnapshot);
  }

  async getAll(){
    const getAll = await getDocs(this.questionnaireReplyCollection);
    return of(getAll);
  }

 
  
  async add(questionnaireReply:QuestionnaireReply){
    const addOperation = await addDoc(this.questionnaireReplyCollection, {
      id:questionnaireReply.id,
      userId: questionnaireReply.userId,
      questionnaireId: questionnaireReply.questionnaireId,
      userEmail:questionnaireReply.userEmail,
      answer:questionnaireReply.answer,
      createDate:questionnaireReply.createDate
    });
    return of(addOperation);
  }

  async update(questionnaireReply:QuestionnaireReply){
    const questionnaireDocRef = doc(getFirestore(), this.collectionPath, questionnaireReply.id == null ? questionnaireReply.createDate : questionnaireReply.id);
    const updateOperation = await updateDoc(questionnaireDocRef,{
      userId: questionnaireReply.userId,
      questionnaireId: questionnaireReply.userEmail,
      userEmail:questionnaireReply.userEmail,
      answer:questionnaireReply.answer,
      createDate:questionnaireReply.createDate
    });
    return of(updateOperation);
  }
  
}
