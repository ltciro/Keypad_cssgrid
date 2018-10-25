import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from './socket.service'
import { touchpadIds, alertIds, inputId, submitId } from './node-ids.model'
import { HOST } from './configServer'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'attendant';
  input = '';
  keys;
  constructor(private http: HttpClient, private socketService: SocketService) {
    this.keys = Object.entries(touchpadIds);
    console.log(this.keys)
  }

  submit(){
    const nodeSubmitId = submitId
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
