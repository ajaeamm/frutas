import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Fruta } from './fruta';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  title = 'Detector de frutas 🍎';
  imagePreview: string | null = null;
  resultado = '';
  probabilidades: Record<string, number> | null = null;

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  constructor(private frutaService: Fruta, private cdr: ChangeDetectorRef) {}

  // Cuando se selecciona un archivo
  onFileSelected(event: Event): void {
    console.log("📂 Archivo seleccionado");
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.procesarArchivo(file);
  }

  // Carga la imagen y llama al backend
  private procesarArchivo(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.cdr.detectChanges(); // 👈 fuerza actualización inmediata
    };

    reader.readAsDataURL(file);

    // Llamada al backend
    this.frutaService.predecirFruta(file).subscribe({
      next: (response: any) => {
        console.log('✅ Respuesta del backend:', response);

        this.resultado = `✅ Es una ${response.fruta} 🍊`;
        this.probabilidades = response.probabilidades;

        this.cdr.detectChanges(); // 👈 actualiza la vista
      },
      error: (error: any) => {
        console.error('❌ Error al predecir la fruta:', error);
        this.resultado = '❌ Error al procesar la imagen.';
        this.probabilidades = null;
        this.cdr.detectChanges();
      },
    });
  }

  // Limpia todo
  removeImage(): void {
    this.imagePreview = null;
    this.resultado = '';
    this.probabilidades = null;
    this.fileInput.nativeElement.value = '';
    this.cdr.detectChanges();
  }
}

