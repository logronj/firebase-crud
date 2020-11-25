import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { Observable, Subscribable, Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  // courses$: Observable<any[]>;
  courses: any[];
  
  constructor(private db : AngularFireDatabase){

  //  this.courses$ = this.db.list('/courses').valueChanges();
   this.db.list('/courses').snapshotChanges().subscribe(data => {
      this.courses = [];
    data.forEach((item) => {
      let name = item.payload.toJSON();
      let key = item.key;
      this.courses.push({
        name,key
      })      
    })
  })
  }

  add(course: HTMLInputElement){
    this.db.list('/courses').push(course.value);
    course.value = '';
  }

  update(course){
    this.db.object('/courses/'+course).update('testes');
    
  }

  delete(course){
    this.db.object('/courses/'+course).remove()
    .then(()=>console.log('Deleted'))
    .catch(err=>throwError(err));
  }

}
