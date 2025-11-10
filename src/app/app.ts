import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
 title = 'Detector de frutas 🍎';
  imagePreview: string | null = null;
  resultado = '';
  isDragOver = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // --- Selección normal de archivo ---
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    this.procesarArchivo(file);
  }

  // --- Drag and Drop ---
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) this.procesarArchivo(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  // --- Lógica de carga y validación ---
  private procesarArchivo(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;

      const nombre = file.name.toLowerCase();
      if (nombre.includes('manzana')) {
        this.resultado = `✅ El archivo "${file.name}" parece ser una manzana 🍎`;
      } else {
        this.resultado = `❌ El archivo "${file.name}" no parece ser una manzana`;
      }
    };
    reader.readAsDataURL(file);
  }

  // --- Limpieza ---
  removeImage(): void {
    this.imagePreview = null;
    this.resultado = '';
    this.fileInput.nativeElement.value = '';
  }

  openFileDialog(): void {
    this.fileInput.nativeElement.click();
  }
  
}
