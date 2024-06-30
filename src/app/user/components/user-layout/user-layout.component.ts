import { Component, OnInit } from '@angular/core';
import { UsersHomeComponent } from '../users-home/users-home.component';
import { RouterModule } from '@angular/router';
import { AdvertismentSliderComponent } from '../../../shared/components/advertisment-slider/advertisment-slider.component';
import { initFlowbite } from 'flowbite';

@Component({
  standalone:true,
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  imports:[
    UsersHomeComponent,
    RouterModule,
    AdvertismentSliderComponent
  ]
})
export class UserLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    initFlowbite();
  }

}
