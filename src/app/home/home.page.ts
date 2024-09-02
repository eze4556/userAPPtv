import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../app/common/services/firestore.service';
import { Apk } from '../../app/common/models/apk.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-apk-list',
  standalone: true,
  imports: [IonicModule, CommonModule],  // Asegúrate de que IonicModule esté aquí
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class ApkListComponent implements OnInit {
  apks$: Observable<Apk[]>;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.apks$ = this.firestoreService.getApks();
  }
}
