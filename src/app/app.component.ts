import { Component } from '@angular/core';
import { FruitService } from "./services/fruit.service";
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WhatsYourDevilFruit';
  fruitText: string = "";
  hideText = true;

  fruitInfo = new FruitForm("");

  constructor(private fruitService: FruitService) {}

  getFruit() {
    this.hideText = false;

    const num_str = Md5.hashStr(this.fruitInfo.firstname).split(/[a-zA-Z]+/).join("");
    const fruitIndex = Number.parseInt(num_str) % (this.fruitService.wordList.length-1);
    let fruit = this.fruitService.wordList[fruitIndex];

    this.fruitText = "Your fruit: " + fruit + "-" + fruit + " no mi!";
  }
}

class FruitForm {
  constructor(
    public firstname: string
  ) { }
}
