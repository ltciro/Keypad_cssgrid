import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Key } from "src/app/key/key.interface";
import { HOST } from '../configServer'
import { ChangeDetectorRef } from "@angular/core";
// let html = `<button mat-button  color="primary"  [ngStyle]="cssParse()" (click)="keyPress()">Nopoo  </button>
// `;
@Component({
  selector: 'app-key',
  template: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  @Input() key: Key ;
  @Output() valPressed = new EventEmitter<string>();

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
     
     console.log((<any>KeyComponent).__annotations__);
   }

  ngOnInit() {
     this.http.get(HOST + 'getNodeProp?nodeId='+this.key[1]+'&').subscribe((data)=>{
      Object.assign(this, data) 
     });
  }

  keyPress(){
    this.http.get(HOST + 'send_input?nodeId='+this.key[1]+'&user_input='+this.key[0]).subscribe(data => {
      console.log('hola Lau', data);
    })
//      html = `<button mat-button  color="primary"  [ngStyle]="cssParse()" (click)="keyPress()">Siiii  </button>
// `;
// (<any>KeyComponent).__annotations__[0].template = html
//     this.cdr.detectChanges();
  }
  cssParse(){
    return this['css'] && JSON.parse(this['css']) 
  }

}
