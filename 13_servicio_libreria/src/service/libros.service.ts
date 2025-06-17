import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LibroDatosdto } from 'src/dtos/LibroDatosDto';
import { Libro } from 'src/model/Libro';
import { Repository } from 'typeorm';


@Injectable()
export class LibrosService {
  constructor(@InjectRepository(Libro) private librosRepository:Repository<Libro>){}

  async catalogo():Promise<LibroDatosdto[]> | null{
    const libros:Libro[]=await this.librosRepository.find();
    return libros.map(l=>new LibroDatosdto(l.isbn,l.titulo,l.autor,l.precio,l.paginas));
  }
}
