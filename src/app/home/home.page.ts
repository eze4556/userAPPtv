import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../app/common/services/firestore.service';
import { Apk } from '../../app/common/models/apk.model';
import { from, map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-apk-list',
  standalone: true,
  imports: [IonicModule, CommonModule],  // Asegúrate de que IonicModule esté aquí
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class ApkListComponent implements OnInit {
 apk$: Observable<Apk>;

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) {}
 ngOnInit() {
    const apkId = this.route.snapshot.paramMap.get('id');
    if (apkId) {
      // Convertir el Promise a Observable
      this.apk$ = from(this.firestoreService.getApkById(apkId)).pipe(
        map(apk => apk) // Pasar directamente el resultado
      );
    }
  }
}
