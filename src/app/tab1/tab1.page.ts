import { Component, OnInit } from "@angular/core";

import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  public myNotes;

  constructor() {}

  async ngOnInit() {
    const notes = await Storage.get({ key: "notes" });
    this.myNotes = JSON.parse(notes.value);
  }
}
