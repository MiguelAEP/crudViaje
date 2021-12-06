import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject  } from 'rxjs';
import { Personal } from './personaInterface';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  person = new Subject<any>();
  sendOpenForm = new Subject<any>();
  constructor(private fireStore : AngularFirestore) { }

  createPeople( persona : Personal): Promise<any>{
    return this.fireStore.collection('Tarjetas').add(persona);
  }

  getPeoples():Observable<any>{
     return this.fireStore.collection('Tarjetas').snapshotChanges();
  }

  deletePeople(id : string):Promise<any>{
    return this.fireStore.collection('Tarjetas').doc(id).delete();
  }
  
  editPeople(id : string , people :any):Promise<any>{
   return this.fireStore.collection('Tarjetas').doc(id).update(people);
  }

  sendPeople(people : any){
    this.person.next(people)
  }

  returnPeopleForEdit(){
   return this.person;
  }

  sendOpenF( bool : boolean){
    this.sendOpenForm.next(bool);
  }

  returnOpenForm(){
    return this.sendOpenForm;
  }
}
