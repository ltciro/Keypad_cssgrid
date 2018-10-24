import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'attendant';
  keys = [
    [{value:'1'},{value:'2'},{value:'3'}],
    [{value:'4'},{value:'5'},{value:'6'}],
    [{value:'7'},{value:'8'},{value:'9'}],
    [{value:'back', icon:'back'},{value:'0'},{value:'delete', icon:'delete'}]
  ]
  
}
