import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Note } from "../note";
import { Plugins } from "@capacitor/core";
import { NgForm } from "@angular/forms";
import { ToastController } from "@ionic/angular";

const { Storage } = Plugins;

@Component({
  selector: "app-edit-note",
  templateUrl: "./edit-note.page.html",
  styleUrls: ["./edit-note.page.scss"]
})
export class EditNotePage implements OnInit {
  myNotes;
  noteId;
  noteTitle;
  noteDesc;
  noteDate;

  today = new Date().toLocaleString();
  Notes = [];
  noteModel = new Note("", "");

  constructor(
    private route: ActivatedRoute,
    public toastController: ToastController,
    private router: Router
  ) {}

  async presentToast(successMessage) {
    const toast = await this.toastController.create({
      message: successMessage,
      position: "bottom",
      color: "success",
      duration: 3000
    });
    toast.present();
  }

  async ngOnInit() {
    // this.Notes = JSON.parse(window.localStorage.getItem("notes"));
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

          this.noteModel = new Note(this.noteTitle, this.noteDesc);
        }
      }
    }
  }

  editNote(noteId) {
    // console.log(noteForm.value);

    var addNote: Notes = {
      id: noteId,
      title: this.noteModel.title,
      description: this.noteModel.description,
      date: this.today
    };

    let my_id = addNote.id;
    //add addNote to array Notes[]
    for (var i = 0; i < this.Notes.length; i++) {
      if (my_id === this.Notes[i].id) {
        this.Notes.splice(my_id, 1, addNote);
        //save to local storage
        Storage.set({
          key: "notes",
          value: JSON.stringify(this.Notes)
        });
        break;
      }
    }
    this.presentToast("Note saved!!!");

    this.router.navigate([""]);
  }
}

interface Notes {
  id: number;
  title: string;
  description: string;
  date: string;
}
