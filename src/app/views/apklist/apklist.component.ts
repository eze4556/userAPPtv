import { IonicModule,Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../common/services/firestore.service';
import { Apk } from '../../common/models/apk.model';
import { Categoria } from './../../common/models/categoria.models';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';



import { File } from '@awesome-cordova-plugins/file/ngx'; // Importa File
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importa HttpClient







@Component({
  selector: 'app-apk-list',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,HttpClientModule],
  templateUrl: './apklist.component.html',
  styleUrls: ['./apklist.component.scss'],
})
export class ApkListComponent implements OnInit {
  apks$: Observable<Apk[]>;

   categorias$: Observable<Categoria[]>;
  filteredApks$: Observable<Apk[]>;
  selectedCategory: string = '';

    private categoryFilter$ = new BehaviorSubject<string>('');


  constructor(private firestoreService: FirestoreService,private router: Router, private file: File,  // Inyecta File
    private http: HttpClient, // Inyecta HttpClient
    private platform: Platform  // Inyecta Platform
) {}

  ngOnInit() {
    this.apks$ = this.firestoreService.getApks();
    this.categorias$ = this.firestoreService.getCategorias();

    this.filteredApks$ = combineLatest([this.apks$, this.categoryFilter$]).pipe(
      map(([apks, filter]) =>
        filter ? apks.filter(apk => apk.categoriaId === filter) : apks
      )
    );
  }

  navigateToDetail(apkId: string) {
    this.router.navigate(['/apk', apkId]);
  }

  filterApks() {
    this.categoryFilter$.next(this.selectedCategory);
  }

 // Función para descargar el APK
  downloadApk(apkUrl: string): void {
    window.open(apkUrl, '_blank');
  }

}
