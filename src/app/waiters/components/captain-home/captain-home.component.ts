import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { WaiterServiceService } from '../../services/waiter-service.service';
import { CaptainDetail } from '../../repository/waiter-model';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone:true,
  selector: 'app-captain-home',
  templateUrl: './captain-home.component.html',
  styleUrls: ['./captain-home.component.css']
})
export class CaptainHomeComponent implements OnInit {

  router = inject(Router)
  waiterService = inject(WaiterServiceService);
  http = inject(HttpClient);

  captainDetails : CaptainDetail | undefined;
  imageUrl : string | undefined;
  
  ngOnInit() {
    this.fetchDetails();
  }
    
  fetchDetails(){
    this.waiterService.fetchCaptainDetails().subscribe((res)=>{
      if(res){
        this.captainDetails = res.data
        this.getQRBlob();
      }


    })
  }

  getQRBlob(){
    if (this.captainDetails?.qr_code) {
      this.http.get(this.captainDetails?.qr_code, { responseType: 'blob' }).subscribe(
        (response) => {
          console.log('qr');
          
          this.imageUrl = window.URL.createObjectURL(response);
        },
        (error) => {
          console.error('Error fetching QR image:', error);
        }
      );
    }
  }

  downloadQR() {
    if (this.imageUrl) {
      console.log('new');
      
      const a = document.createElement('a');
      a.href = this.imageUrl;
      a.download = `${this.captainDetails?.name}_qr_code.png`; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(this.imageUrl);
    }
  }


  navigateToProducts(){
    this.router.navigate(['/captain/products'])
  }
  navigateToCategory(){    
    this.router.navigate(['/captain/category'])
  }
}
