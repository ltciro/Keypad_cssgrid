import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Key } from "src/app/key/key.interface";


@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  @Input() key: Key ;
  @Output() valPressed = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  keyPress(val){
    this.valPressed.emit(val)
  }

}
