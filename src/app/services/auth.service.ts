import { IUser } from './user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AdminsService } from './admins.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<IUser>;
  userData;
  userId: string;
  // change to an empty boolean for production
  public isAdmin = true;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private admin: AdminsService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap (user => {
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of (null);
        }
      })
    );
   }

   public getAdmin() {
    this.user$.subscribe(data => {
      this.userId = data.uid;
      let i = this.admin.adminIds.length;
      while ( i-- ) {
      if (data.uid === this.admin.adminIds[i]) {
        this.isAdmin = true;
        }
      }
    });
  }


   async googleSignin() {
     const provider = new auth.GoogleAuthProvider();
     const credential = await this.afAuth.auth.signInWithPopup(provider);
     return this.updateUserData(credential.user);
   }

   async signOut() {
     await this.afAuth.auth.signOut();
     return this.router.navigate(['/']);
   }

   private updateUserData(user) {
     // Sets user data to firestore on login
     const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${user.uid}`);

     const data = {
       uid: user.uid,
       email: user.email,
       displayName: user.displayName,
       photoURL: user.photoURL
     };

     return userRef.set(data, {merge: true});
   }

}
