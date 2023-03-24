import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import characters from '../../assets/characters.json';

@Injectable({
  providedIn: 'root'
})
export class FruitService {

  private static WORD_FILE = "nounlist.txt";

  private httpClient: HttpClient;
  presets = new Map<string, string>();

  wordList: Array<string> = new Array<string>();
  initialized: boolean;

  constructor(http: HttpClient) {
    this.httpClient = http;
    this.initialized = false;

    this.initializeWordList();
    this.initializePresets();

    this.initialized = true;
  }

  private initializeWordList(): void {
    this.httpClient.get('assets/' + FruitService.WORD_FILE, { responseType: 'text' })
      .subscribe(data => {
        for (const line of data.split(/[\r\n]+/)) {
          if (line != null && line !== '') {
            this.wordList.push(line);
          }
        }
      });
  }

  private initializePresets(): void {
    characters.forEach((data: PresetFruit) => {
      data.names.forEach(name => {
        this.presets.set(name.toLowerCase(), data.fruit);
      });
    });
  }
}

export class PresetFruit {
  constructor(
    public names: Array<string>,
    public fruit: string
  ) { }
}
