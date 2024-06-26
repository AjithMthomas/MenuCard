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
      }


    })
  }

  getQRBlob(){
    if (this.captainDetails?.qr_code) {
      this.http.get(this.captainDetails?.qr_code, { responseType: 'blob' }).subscribe(
        (response) => {          
          this.imageUrl = window.URL.createObjectURL(response);
          this.downloadQR()
        },
        (error) => {
          console.error('Error fetching QR image:', error);
        }
      );
    }
  }

  downloadQR() {
    if (this.captainDetails?.qr_code) {      
      const a = document.createElement('a');
      a.href = this.captainDetails?.qr_code;
      // a.download = `${this.captainDetails?.name}_qr_code.png`; 
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
      // window.URL.revokeObjectURL(this.imageUrl);
      a.setAttribute('download', `${this.captainDetails?.name}_qr_code.png`);

      if(typeof a.download === 'undefined'){
        window.open(this.captainDetails?.qr_code, '_blank')
      }else{
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/captain/captain-login'])
  }


  navigateToProducts(){
    this.router.navigate(['/captain/products'])
  }
  navigateToCategory(){    
    this.router.navigate(['/captain/category'])
  }
}
