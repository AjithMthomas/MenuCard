import { inject, Injectable } from '@angular/core';
import { AdminRepository } from '../repository/admin.repository';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminRepository = inject(AdminRepository);

  submitLeads(formData:any){
    return this.adminRepository.submitLeads(formData);
  }
}
