import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupComponent {

  text: string;

  constructor() {
    console.log('Hello SignupComponent Component');
    this.text = 'Hello World';
  }

  langs: string[] = [
    'English',
    'French',
    'German',
  ];


  myform: FormGroup;

  ngOnInit() {
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
      }),
      email: new FormControl(),
      password: new FormControl(),
      language: new FormControl()
    });
  }

}
