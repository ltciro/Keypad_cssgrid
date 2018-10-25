import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private socket: SocketIOClient.Socket;
  title = 'attendant';
  host = "http://localhost:8000/";
  input = '';
  keys = [
    {value:'1'},{value:'2'},{value:'3'},
    {value:'4'},{value:'5'},{value:'6'},
    {value:'7'},{value:'8'},{value:'9'},
    {value:'bkspace', icon:'back'},{value:'0'},{value:'cancel', icon:'delete'}
  ];

  constructor(private http: HttpClient) {
    this.socket = io.connect(this.host);
  }

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
    this.http.get(this.host + 'send_input?nodeId=1d3f7969.7d8d47&user_input='+key).subscribe(data => {
      console.log('hola Lau', data);
    })
    console.log(this.input); // endpoint por letra
  }

  submit(){
    this.http.get(this.host +'send_input?nodeId=12e91636.2c75ba&user_input=submit').subscribe(data => {
      console.log('hola Lau submit', data);
    })
    console.log(this.input); // endpoint por boton submit
  }


  ngOnInit() {
    this.socket.emit('connect', {data: 'data'});
      this.socket.on('90ade531.1a25f8', (data)=>{
        alert(data.msg);
    });
  }
}
