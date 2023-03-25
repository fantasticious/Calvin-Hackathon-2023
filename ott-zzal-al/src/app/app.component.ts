import { Component } from '@angular/core';
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

interface possibleBottoms {
  jeans: string[];
  joggers: string[];
  leggings: string[];
  shorts: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  top: Top | unknown;
  bottom: Bottom | unknown;
  chosenTopColor: string = '';
  topColors: string[] = [];
  possibleBottoms: possibleBottoms | any = [];
  possibleBottomTypes: string[] = [];
  possibleBottomsAvailable: boolean = false;
  possibleBottomColors: string[] = [];
  bottomColorScheme: string[] = [];
  rand6BottomColorScheme: string[] = [];
  chosenBottomColor: string = '';
  bottomColors: string[] = [];
  bottomButtonPressed: boolean = false;
  chosenBottomType: string = "";

  /* functions to manipulate state */
  constructor(private db: AngularFirestore) {}

  getTopColors = (top: string) => {
    this.top = top;
    this.db
      .collection<Top>(`${top}`)
      .valueChanges()
      .subscribe((res) => {
        if (res) {
          this.topColors = res.map(elem => {
            return elem.color
          });
        }
      });
  };

  getBottomColors = (bottom: string) => {
    this.bottom = bottom;
    this.db
      .collection<Bottom>(`${bottom}`)
      .valueChanges()
      .subscribe((res) => {
        if (res) {
          this.bottomColors = res.map((elem) => elem.color);
        }
      });
  };

  getTop = (top: string, color: string) => {
    this.db
      .doc<Top>(`${top}/${color}`)
      .valueChanges()
      .subscribe((res) => {
        if (res) {
          this.top = res;
        }
      });
  };

  getBottom = (bottom: string, color: string) => {
    this.db
      .doc<Bottom>(`${bottom}/${color}`)
      .valueChanges()
      .subscribe((res) => {
        if (res) {
          this.bottom = res;
        }
      });
  };

  onChooseTopColor(color: string) {
    this.chosenTopColor = color;
    this.db
      .doc<Top>(`${this.top}/${this.chosenTopColor}`)
      .valueChanges()
      .subscribe((matchList) => {
        if (matchList) {
          const {color, ...rest} = matchList;
          this.possibleBottoms = rest;
          this.possibleBottomTypes = Object.keys(this.possibleBottoms)
          this.possibleBottomsAvailable = true;
        }
        // if bottom type already selected
        if (this.bottomButtonPressed) {
          this.possibleBottoms[this.chosenBottomType];
          this.bottomColorScheme = this.possibleBottoms[this.chosenBottomType];
          this.rand6BottomColorScheme = this.bottomColorScheme.slice(0, 6);
        }
      });
  }

  onChooseBottomType = (bottomType: string): void =>  {
    this.chosenBottomType = bottomType;
    this.bottomButtonPressed = true;
    this.possibleBottoms[bottomType];
    this.bottomColorScheme = this.possibleBottoms[bottomType];
    this.rand6BottomColorScheme = this.bottomColorScheme.slice(0, 6);
  }

  regenerateCombo = () => {
    // keep track of the generated random numbers 
    let arr: number[] = [];
    // construct a new group of 6 colors
    this.rand6BottomColorScheme = [];
    // generate 6 unique random numbers
    while(this.rand6BottomColorScheme.length < 6) {
      const randIdx = Math.floor(Math.random() * this.bottomColorScheme.length);
      if (arr.indexOf(randIdx) === -1) {
        arr.push(randIdx);
        this.rand6BottomColorScheme.push(this.bottomColorScheme[randIdx]);
      }
    }
    for (let i=0; i < 6; i++){
      const randIdx = Math.floor(Math.random() * this.bottomColorScheme.length);
      this.rand6BottomColorScheme.push(this.bottomColorScheme[randIdx]);
    }
  }
}

