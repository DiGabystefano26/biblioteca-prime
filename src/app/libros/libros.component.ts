import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/api';
import { Libro } from '../interfaces/libro.interface';
import { LibrosService } from '../servicios/libros.service';
import { FormularioLibroComponent } from './formulario-libro/formulario-libro.component';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  @ViewChild('formulario') formlibro!: FormularioLibroComponent;
  listaLibros: Libro[] = []; //Aqui se guarda la lista de libros
  cargando: boolean = false; //Esta variable muestra la animacion de carga
  dialogoVisible: boolean = false; //Indica si el dialogo esta visible u oculto

  mensajes: Message[] = [];
  tituloDialogo: string = 'Registrar libro';


  constructor(
    private servioLibros: LibrosService,
    private servicioConfirm: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.cargando = true;
    this.servioLibros.get().subscribe({
      next: (datos) => {
        this.listaLibros = datos;
        this.cargando = false;
      },
      error: (e) => {
        console.log(e);
        this.cargando = false;
        this.mensajes = [{ severity: 'error', summary: 'Error al cargar libros', detail: e.error }]
      }
    });
  }

  mostrarDialogo() {
    this.dialogoVisible = true;
  }




  nuevo() {
    this.tituloDialogo = 'Registrar libro';
    this.formlibro.limpiarFormulario();
    this.formlibro.modo = 'Registrar';
    this.dialogoVisible = true;
  }



  editar(libro: Libro) {
    this.formlibro.codigo = libro.id;
    this.formlibro.titulo = libro.titulo;
    this.formlibro.autor = libro.autor;
    this.formlibro.paginas = libro.paginas;
    this.formlibro.modo = 'Editar';
    this.dialogoVisible = true;
    this.tituloDialogo = 'Editar libro';
  }

  eliminar(libro: Libro) {
    this.servicioConfirm.confirm({
      message: "Realmente desea eliminar el libro: '" + libro.id + "-" + libro.titulo + '-' + libro.autor + "'?",
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      acceptIcon: 'pi pi-trash',
      accept: () => {
        this.servioLibros.delete(libro).subscribe({
          next: () => {
            this.mensajes = [{ severity: 'success', summary: '??xito', detail: 'Se elimin?? correctamente el libro.' }];
            this.cargarLibros
          },
          error: (e) => {
            console.log(e);
            this.mensajes=[{severity: 'error', summary: 'Error al eliminar' , detail:e.error}];
          }
        })
      }
     
    });
  }
  
}




