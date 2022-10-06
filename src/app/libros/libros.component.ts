import { Component, OnInit } from '@angular/core';
import { Libro } from '../interfaces/libro.interface';
import { LibrosService } from '../servicios/libros.service';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  listaLibros: Libro[] = []; //Aqui se guarda la lista de libros
  cargando: boolean = false; // Esta variable muestra la animacion de carga
  dialogoVisible: boolean = false; //Indica si el dialogo esta visible u oculta
  constructor(private servicioLibros: LibrosService) { }

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.servicioLibros.get().subscribe({
      next: (datos) => {

        this.listaLibros = datos;
        this.cargando = false;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  mostrarDialogo(){
    this.dialogoVisible = true;
  }
  
}
