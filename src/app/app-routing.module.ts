import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./tabs/tabs.module").then(m => m.TabsPageModule)
  },
  {
    path: "note-details/:id",
    loadChildren: () =>
      import("./note-details/note-details.module").then(
        m => m.NoteDetailsPageModule
      )
  },
  {
    path: "edit-note/:id",
    loadChildren: () =>
      import("./edit-note/edit-note.module").then(m => m.EditNotePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
