import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from './socket.service'
import { touchpadIds, alertIds, inputId } from './node-ids.model'
import { HOST } from './configServer'
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

  constructor(private http: HttpClient, private socketService: SocketService) {}

  valPressed(key){
    this.http.get(HOST + 'send_input?nodeId='+touchpadIds[key]+'&user_input='+key).subscribe(data => {
      console.log('hola Lau', data);
    })
  }

  submit(){
    const nodeSubmitId = touchpadIds['submit']
    this.http.get(HOST +'send_input?nodeId='+nodeSubmitId+'&user_input=submit').subscribe(data => {
      console.log('hola Lau submit', data);
    })
    console.log(this.input); // endpoint por boton submit
  }


  ngOnInit() {
    this.socketService.socket.on(alertIds['message'], (data)=>{
      if(data.msg !== ""){alert(data.msg);}
    })
    this.socketService.socket.on(inputId, (data)=>{
      this.input = data.msg;
    })
   
  }

}
