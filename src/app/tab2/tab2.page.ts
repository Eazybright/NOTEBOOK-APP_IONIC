import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Plugins } from "@capacitor/core";
import { ToastController } from "@ionic/angular";

const { Storage } = Plugins;

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit {
  title: string;
  description: string;
  public loader: boolean = false;
  successMessage: string;
  numbericId: number = 1;

  today = new Date().toLocaleString();
  Notes = [];

  constructor(public toastController: ToastController) {}

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
    const notes = await Storage.get({ key: "notes" });
    this.Notes = JSON.parse(notes.value);
  }

  addNote(noteForm: NgForm) {
    if (this.Notes === null) {
      var titleId = this.numbericId;
    } else {
      var titleId = this.Notes.length + this.numbericId;
    }

    var addNote: Notes = {
      id: titleId,
      title: noteForm.value.title,
      description: noteForm.value.description,
      date: this.today
    };

    //redeclare this.Notes array is it's null
    this.Notes = this.Notes || [];

    //add addNote to array Notes[]
    this.Notes.push(addNote);
    // console.log(this.Notes);

    //save to local storage
    Storage.set({
      key: "notes",
      value: JSON.stringify(this.Notes)
    });

    this.presentToast("Note saved!!!");

    // console.log(noteForm.value);
    noteForm.reset();
  }
}

interface Notes {
  id: number;
  title: string;
  description: string;
  date: string;
}
