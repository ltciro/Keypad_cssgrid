import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { Key } from "src/app/key/key.interface";

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  @Input() key: Key ;
  constructor() { }

  ngOnInit() {
  }
  keyPress(){
    console.log(this.key)
  }

}
