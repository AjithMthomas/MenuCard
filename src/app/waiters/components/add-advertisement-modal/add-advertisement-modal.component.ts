import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  standalone:true,
  selector: 'app-add-advertisement-modal',
  templateUrl: './add-advertisement-modal.component.html',
  styleUrls: ['./add-advertisement-modal.component.scss']
})
export class AddAdvertisementModalComponent implements OnInit {

  advCount=[1]


  ngOnInit() {
    initFlowbite();
  }

  newAddButton(){
    this.advCount.push(1);
  }

}
