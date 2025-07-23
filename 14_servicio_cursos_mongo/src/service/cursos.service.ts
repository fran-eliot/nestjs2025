import { Injectable } from '@nestjs/common';
import { Curso, CursoDocument } from 'src/model/curso.schema.';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CursosService {
  constructor(
    @InjectModel(Curso.name) private cursoModel: Model<CursoDocument>
  ) {}

  guardar(curso:Curso): Promise<Curso> {
    const nuevoCurso = new this.cursoModel(curso);
    return nuevoCurso.save();
  }

  todos(): Promise<Curso[]> {
    return this.cursoModel.find().exec();
  }
}
