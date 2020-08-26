import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-remove-user',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.sass']
})
export class DialogWindowComponent implements OnInit {
    question: string

  constructor() { }

  ngOnInit(): void {
        this.question = getContentQuestion();
  }
}

let _dialogContentQuestion: string

export function setContentQuestion(question){
    _dialogContentQuestion = question
}

export function getContentQuestion(){
    return _dialogContentQuestion
}
