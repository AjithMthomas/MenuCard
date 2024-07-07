import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../user/services/user.service';
import { initFlowbite } from 'flowbite';
import { IupdatedmageData } from '../../../waiters/repository/waiter-model';

@Component({
  standalone:true,
  selector: 'app-advertisment-slider',
  templateUrl: './advertisment-slider.component.html',
  styleUrls: ['./advertisment-slider.component.scss']
})
export class AdvertismentSliderComponent implements OnInit {

  userService = inject(UserService);
 
  adv: IupdatedmageData[] =[]
  
  ngOnInit() {
    this.userService.adv.subscribe((res: IupdatedmageData[]) => {
      res.forEach(item => this.adv.push(item));
      initFlowbite();
    });
  }

}