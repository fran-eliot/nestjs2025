import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteDatosdto } from 'src/dtos/ClienteDatosDto';
import { Cliente } from 'src/model/Cliente';
import { Repository } from 'typeorm';


@Injectable()
export class ClientesService {
  constructor(@InjectRepository(Cliente) private clientesRepository:Repository<Cliente>){}

  async autenticar(usuario:string,pass:string):Promise<ClienteDatosdto> | null{
    const cliente:Cliente = await this.clientesRepository.createQueryBuilder('cliente')
    .where('usuario=:us',{us:usuario})
    .andWhere('password= :pw',{pw:pass})
    .getOne();
    if (cliente){
      return new ClienteDatosdto(cliente.idCliente,cliente.usuario,cliente.password,cliente.email, cliente.telefono);
    }else{
      return null;
    }
  }
  
}
