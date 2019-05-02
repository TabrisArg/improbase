import { GameserviceService } from './services/gameservice.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { ImageComponent } from './components/image/image.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';
import { ShowGameComponent } from './components/show-game/show-game.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatSliderModule, MatDialogModule } from '@angular/material';
import { EditGameResolver } from './components/edit-game/edit-game.resolver';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { ProfileComponent } from './components/profile/profile.component';
import { TruncatePipe } from './classes/truncate-pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImageComponent,
    NewGameComponent,
    EditGameComponent,
    ShowGameComponent,
    NavbarComponent,
    ProfileComponent,
    TruncatePipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
     AngularFirestoreModule,
     BrowserAnimationsModule,
     MatButtonModule,
     MatInputModule,
     MatSliderModule,
     MatDialogModule,
     ReactiveFormsModule,
     FormsModule,
     AngularFireAuthModule
  ],
  providers: [GameserviceService, EditGameResolver],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
