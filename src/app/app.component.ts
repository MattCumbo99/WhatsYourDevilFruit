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

  displayFruit(): void {
    this.hideText = false;

    const name_input = this.fruitInfo.firstname;

    if (this.checkAndSetIfPreset(name_input)) return;

    const num_str = Md5.hashStr(name_input).split(/[a-zA-Z]+/).join("");
    const fruitIndex = Number.parseInt(num_str) % (this.fruitService.wordList.length-1);
    const fruit = this.fruitService.wordList[fruitIndex];

    this.fruitText = "You got: " + fruit + "-" + fruit + " fruit!";
  }

  private checkAndSetIfPreset(name: string): boolean {
    const preset_check = name.toLowerCase();
    if (this.fruitService.presets.has(preset_check)) {
      this.fruitText = "You got: " + this.fruitService.presets.get(preset_check) + "!";
      return true;
    }

    return false;
  }

  private static toCamelCase(str: string): string {
    if (str == null || str.length == 0) {
      return str;
    }

    const words = str.toLowerCase().split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }

    return words.join(" ");
  }
}

class FruitForm {
  constructor(
    public firstname: string
  ) { }
}
