import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/model/Cliente';
import { Cuenta } from 'src/model/Cuenta';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(@InjectRepository(Cliente) private readonly cuentasRepository:Repository<Cuenta>,
@InjectRepository(Cuenta) private readonly clientesRepository:Repository<Cliente>){}

  // async findByNumeroCuenta(numeroCuenta:number):Promise<Cliente[]>{
  //   const cuenta:Cuenta=await this.cuentasRepository.findOne({
  //     where:{
  //       numeroCuenta:numeroCuenta
  //     },
  //     relations:['clientes']
  //   });
  //   return cuenta.clientes;
  // }

  async findByNumeroCuenta(numeroCuenta:number):Promise<Cliente[]>{
    return this.clientesRepository.createQueryBuilder("cliente")
    .innerJoin("cliente.cuentas","c")
    .where("c.numeroCuenta:=numCuenta",{numCuenta:numeroCuenta})
    .getMany();
  }
  


}
