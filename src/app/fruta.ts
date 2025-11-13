import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Fruta {
  // Si usas proxy, puedes quitar el host completo y usar solo la ruta
  private apiUrl = '/predict-fruta/'; // ⚡ proxy se encarga de redirigir

  constructor(private http: HttpClient) {}

  predecirFruta(imagen: File): Observable<any> {
    console.log("Servicio predecirFruta ejecutado ✅");

    const formData = new FormData();
    formData.append('file', imagen);

    return this.http.post<any>(this.apiUrl, formData);
  }
}

