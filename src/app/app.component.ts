import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    {value:'bkspace', icon:'back'},{value:'0'},{value:'cancel', icon:'delete'}
  ];

  constructor(private http: HttpClient) { }

  valPressed(key){
    if(key==="bkspace"){
      this.input = this.input.slice(0, - 1);
      // return;
    }else if(key==="cancel"){
       this.input = '';
       // return;
    }else{
      this.input = this.input + key;
    }
    this.http.get('http://localhost:8000/send_input?user_input='+key).subscribe(data => {
      console.log('hola Lau', data);
    })
    console.log(this.input); // endpoint por letra
  }

  submit(){
    this.http.get('http://localhost:8000/send_input?user_input=submit').subscribe(data => {
      console.log('hola Lau submit', data);
    })
    console.log(this.input); // endpoint por boton submit
  }

}
