import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router, ParamMap } from "@angular/router";

import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

@Component({
  selector: "app-note-details",
  templateUrl: "./note-details.page.html",
  styleUrls: ["./note-details.page.scss"]
})
export class NoteDetailsPage implements OnInit {
  Notes = [];

  public noteId;
  public noteTitle;
  public noteDesc;
  public noteDate;

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    const notes = await Storage.get({ key: "notes" });

    this.Notes = JSON.parse(notes.value);

    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.noteId = id;
    for (var key in this.Notes) {
      if (this.Notes.hasOwnProperty(key)) {
        if (this.Notes[key].id == this.noteId) {
          this.noteTitle = this.Notes[key].title;
          this.noteDesc = this.Notes[key].description;
          this.noteDate = this.Notes[key].date;
        }
      }
    }
  }

  onDelete(noteId) {
    // return localStorage.clear();
    // this.Notes = JSON.parse(window.localStorage.getItem('notes'));
    for (var i = 0, max = this.Notes.length; i < max; i++) {
      var del = this.Notes[i];
      if (del.id == noteId) {
        this.Notes.splice(i, 1);
        // window.localStorage.setItem('notes', JSON.stringify(this.Notes));
        Storage.set({
          key: "notes",
          value: JSON.stringify(this.Notes)
        });
        break;
      }
    }
    this.router.navigate([""]);
  }
}
