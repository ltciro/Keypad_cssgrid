import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Key } from "src/app/key/key.interface";
import { HOST } from '../configServer'

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  @Input() key: Key ;
  @Output() valPressed = new EventEmitter<string>();

  constructor(private http: HttpClient) {

   }

  ngOnInit() {
  }

  keyPress(){
    this.http.get(HOST + 'send_input?nodeId='+this.key[1]+'&user_input='+this.key[0]).subscribe(data => {
      console.log('hola Lau', data);
    })
  }

}
