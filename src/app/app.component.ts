import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'attendant';
  input = '';
  keys = [
    {value:'1'},{value:'2'},{value:'3'},
    {value:'4'},{value:'5'},{value:'6'},
    {value:'7'},{value:'8'},{value:'9'},
    {value:'back', icon:'back'},{value:'0'},{value:'delete', icon:'delete'}
  ]
  valPressed(key){
    if(key==="back"){
      this.input = this.input.slice(0, - 1);
      return;
    }
    if(key==="delete"){
       this.input = '';
       return;
    }
    this.input = this.input + key;
    console.log(this.input); // endpoint por letra
  }

  submit(){
    console.log(this.input); // endpoint por boton submit
  }
  
}
