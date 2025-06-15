import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/model/Usuario';
import { Repository } from 'typeorm';


@Injectable()
export class UsuariosService {

  constructor(private readonly usuariosRepository:Repository<Usuario>){
  }

  findByUserName(username:string):Promise<Usuario>{
    return this.usuariosRepository.findOneBy({'username':username});
  }
//  private readonly users = [
//     { id: 1, username: 'admin', password: 'admin', role: 'admin' },
//     { id: 2, username: 'usuario1', password: 'usuario1', role: 'user' },
//     { id: 3, username: 'usuario2', password: 'usuario2', role: 'user' }
//   ];
  
  // async findByUserName(username:string):Promise<any>{
  //   return this.users.find(usuario => usuario.username===username);
  // }


}
