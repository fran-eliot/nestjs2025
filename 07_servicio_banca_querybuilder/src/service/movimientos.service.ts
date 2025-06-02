import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimiento } from 'src/model/Movimiento';
import { Between, Column, Entity, MoreThan, PrimaryGeneratedColumn, Repository } from 'typeorm';

@Injectable()
@Entity("movimientos")
export class MovimientosService {
    constructor(@InjectRepository(Movimiento) private repository:Repository<Movimiento>){
  
 }

 save(movimiento:Movimiento):void{
  this.repository.save(movimiento);
 }

//  findByIdCuenta(idCuenta:number):Promise<Movimiento[]>{
//   return this.repository.find({
//     where:{
//         cuenta:{
//             numeroCuenta:idCuenta
//         }
//     },
//     relations:["cuenta"]
//   });
//  }

 findByIdCuenta(idCuenta:number):Promise<Movimiento[]>{
  return this.repository.createQueryBuilder("movimiento")
  .innerJoinAndSelect("movimiento.cuenta","c")
  .where("movimiento.cuenta.numeroCuenta := numCuenta",{numCuenta:idCuenta})
  .getMany();
 }
 
//  findByCuentasSaldoMin(saldoMin:number):Promise<Movimiento[]>{
//     return this.repository.find({
//       where:{
//         cuenta:{
//             saldo:MoreThan(saldoMin)
//         }
//     },
//     relations:["cuenta"]  
//     });
//  }

 findByCuentasSaldoMin(saldoMin:number):Promise<Movimiento[]>{
  return this.repository.createQueryBuilder("movimiento")
  .innerJoinAndSelect("movimiento.cuenta","c")
  .where("movimiento.cuenta.saldo>:cant",{cant:saldoMin})
  .getMany();
 }


//  findByFechas(fecha1:Date,fecha2:Date):Promise<Movimiento[]>{
//   return this.repository.findBy({fecha:Between(fecha1,fecha2)});
//  }

 findByFechas(fecha1:Date,fecha2:Date):Promise<Movimiento[]>{
  return this.repository.createQueryBuilder("movimiento")
    .innerJoinAndSelect("movimiento.cuenta","c")
  .where("movimiento.fecha between :f1 and :f2",{f1:fecha1,f2:fecha2})
  .getMany();
 }

}
