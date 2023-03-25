import { Component } from '@angular/core';
import { Top, Bottom } from './services/clothes.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
          this.topColors = res.map((elem) => {
            console.log(elem)
            return elem.color
          });
          console.log('top colors: ', this.topColors);
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
          console.log('bottom colors: ', this.bottomColors);
        }
      });
  };

  getTop = (top: string, color: string) => {
    if (top === 'tshirts' && color === 'ffffff') {
      color = 'white';
    }
    this.db
      .doc<Top>(`${top}/${color}`)
      .valueChanges()
      .subscribe((res) => {
        if (res) {
          this.top = res;
          console.log('t: ', this.top);
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
          console.log('b: ', this.top);
        }
      });
  };

  onChooseTopColor(color: string) {
    this.chosenTopColor = color;
    // console.log(this.chosenTopColor);
    this.db
      .doc<Top>(`${this.top}/${this.chosenTopColor}`)
      .valueChanges()
      .subscribe((matchList) => {
        if (matchList) {
          console.log(matchList);
          const {color, ...rest} = matchList;
          this.possibleBottoms = rest;
          this.possibleBottomTypes = Object.keys(this.possibleBottoms)
          this.possibleBottomsAvailable = true;
        }
        // if bottom type already selected
        if (this.bottomButtonPressed) {
          console.log("bottom already selected")
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
    console.log(this.rand6BottomColorScheme)
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

