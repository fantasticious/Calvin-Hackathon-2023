import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';


export interface Top {
  color: string;
  jeans: string[];
  joggers?: string[];
  leggings?: string[];
  shorts?: string[];
}

export interface Bottom {
  color: string; 
  tshirts: string[]; 
}

@Injectable({
  providedIn: 'root'
})
export class ClothesService {

  constructor(private db: AngularFirestore) { 

  }

  
}