import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../user/services/user.service';

@Component({
  standalone:true,
  selector: 'app-advertisment-slider',
  templateUrl: './advertisment-slider.component.html',
  styleUrls: ['./advertisment-slider.component.scss']
})
export class AdvertismentSliderComponent implements OnInit {

  userService = inject(UserService);
  
  ngOnInit() {
  }

}
