import { Component } from '@angular/core';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { HTTP_PROVIDERS, Http, Response } from '@angular/http';
import 'rxjs/Rx';

class Person {
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  moduleId: module.id,
  selector: 'demo-app',
  templateUrl: 'demo.component.html',
  styleUrls: ['demo.component.css'],
  directives: [
    PolymerElement('paper-input'),
    PolymerElement('vaadin-grid')
  ],
  providers: [ HTTP_PROVIDERS ]
})
export class DemoAppComponent {
  title = 'demo works!';
  people: Person[] = [];
  filteredPeople: Person[] = [];

  constructor(private http: Http){
    this.getPeople();
  }

  getPeople() {
    this.http.get('https://demo.vaadin.com/demo-data/1.0/people')
    .map((res: Response) => res.json().result)
    .subscribe(people => this.people = this.filteredPeople = people);
  }

  filterPeople(event){
    const filterText = event.target.value.toLowerCase();
    this.filteredPeople = this.people.filter((p: Person) => 
    !filterText || p.firstName.toLowerCase().indexOf(filterText) > -1);
  }
}
