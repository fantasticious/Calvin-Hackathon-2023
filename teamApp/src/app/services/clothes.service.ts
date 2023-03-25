import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

export interface Tshirt {
  color: string;
  jeans: string[];
  joggers?: string[];
  leggings?: string[];
  shorts?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ClothesService {
  private shirt: Tshirt | undefined;
  public shirt$: BehaviorSubject<Tshirt> = new BehaviorSubject({color: "", jeans: ""});

  constructor(private db: AngularFirestore) { 
    db.doc<Tshirt>("tshirts/ffffff").valueChanges().subscribe((res) => {
      if (res) {
        this.shirt = res;
        this.shirt$.next(this.shirt);
      }
    })
  }
}
