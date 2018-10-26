import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { status } from '../node-ids.model';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  color = 'grey';
  constructor(private socketService: SocketService) { }

  ngOnInit() {
     this.socketService.socket.on(status['fromTouchpad'], (data)=>{
      console.log('data.msg.node ', data.node);
      this.color = data.msg.color;
    });
  }

}
