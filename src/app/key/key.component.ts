import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Key } from "src/app/key/key.interface";
import { HOST } from '../configServer'
import { ChangeDetectorRef } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  @Input() key: Key ;
  @Output() valPressed = new EventEmitter<string>();
  private template = '';
  private cssB = '';
  private modulesI = MatButtonModule;
  private setFunctions: String = 'a5f2d777.18b7c8';
  private customizedNode: String = '68d88b02.e0ffe4';
  private host = HOST;
  constructor(private http: HttpClient) {
   
   }

  ngOnInit() {
    this.http.get(this.host + 'getNodeProp?nodeId=' + this.setFunctions).subscribe(data => {
      Object.assign(this, data);
      this.loadFuntions();
      console.log(this)
      this.template = this['html']
      this.cssB = '';

    });
  }

  loadFuntions() {
    console.log(this['json']);
    let global_this = this;
    JSON.parse(this['json']).forEach(function(f_info) {
      let function_definition = new Function(f_info.params, f_info.logic);
      global_this[f_info.name] = function_definition;
    });
  }



  cssParse(){
    return this['css'] && JSON.parse(this['css']) 
  }

}
