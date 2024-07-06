import { Injectable, inject, signal } from '@angular/core';
import { UserRepository } from '../repository/user-repository';
import { Observable } from 'rxjs';
import { IupdatedmageData } from '../../waiters/repository/waiter-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userRepository = inject(UserRepository);

  advertisements = signal<IupdatedmageData[]>([])


  fetchCategories(uid:string): Observable<any>{
    return this.userRepository.fetchCategories(uid)
  }

  fetchProducts(uid:string): Observable<any>{
    return this.userRepository.fetchProducts(uid)
  }

  getAdvertisement(uid:string){
    return this.userRepository.getAdvertisement(uid);
  }
}
