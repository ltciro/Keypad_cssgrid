import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HOST } from './configServer';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket_: io.Socket;
  constructor() { 
     this.socket_ = io.connect(HOST);
  }

  get socket(){
    return this.socket_;
  }
}
