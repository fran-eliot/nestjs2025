import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/model/Cliente';
import { Cuenta } from 'src/model/Cuenta';
import { Movimiento } from 'src/model/Movimiento';
import { DataSource, In, MoreThan, Repository } from 'typeorm';


@Injectable()
export class CuentasService {

  constructor(@InjectRepository(Movimiento) private movimientosRepository:Repository<Movimiento>,
              @InjectRepository(Cuenta) private cuentasRepository:Repository<Cuenta>,
              @InjectRepository(Cliente) private clientesRepository:Repository<Cliente>,
            private dataSource:DataSource){

  }

  // async findByMovimientosFecha(fecha:Date):Promise<Cuenta[]>{
  //   const movimientos:Movimiento[]=await this.movimientosRepository.find({
  //     where:{
  //       fecha:fecha
  //     },
  //     relations:['cuenta']
  //   });//Movimiento[]
  //   return movimientos.map(m=>m.cuenta);
  // }

  async findByMovimientosFecha(fecha:Date):Promise<Cuenta[]>{
    return await this.cuentasRepository.createQueryBuilder("cuenta")
    .innerJoin('cuenta.movimientos', 'm') 
    .where('m.fecha >= :f', { f:fecha}) // Filtro por fecha
    .distinct(true)
    .getMany(); 
    }

  // async findByExtraccionMin(cantidad:number):Promise<Cuenta[]>{
  //   const movimientos:Movimiento[]=await this.movimientosRepository.find({
  //     where:{
  //       cantidad:MoreThan(cantidad),
  //       operacion:'extracción'
  //     },
  //     relations:['cuenta']
  //   });//Movimiento[]
  //   return movimientos.map(m=>m.cuenta);
  // }

  async findByExtraccionMin(cantidad:number):Promise<Cuenta[]>{
    return this. cuentasRepository.createQueryBuilder("cuenta")
      .innerJoin('cuenta.movimientos', 'm') 
      .where("m.cantidad>=:cant",{cant:cantidad})
      .andWhere("m.operacion='extracción'")
      .distinct(true)
      .getMany();
  }

  // //cuentas asociada al titular cuyo dni se proporciona como parámetro
  // async findByDni(dni:number):Promise<Cuenta[]>{
  //   const cliente:Cliente|null=await this.clientesRepository.findOne({
  //     where:{
  //       dni:dni
  //     },
  //     relations:['cuentas']
  //     });
  //   if(cliente){
  //     return cliente.cuentas;
  //   }else{
  //     return [];
  //   }
    
  // }

    async findByDni(dni:number):Promise<Cuenta[]>{
      return this.cuentasRepository.createQueryBuilder("cuenta")
      .innerJoin("cuenta.clientes","c")
      .where("c.dni=:dni",{dni:dni})
      .getMany();
    }

  //Recibe un objeto cuenta y un array con los dnis de los titulares
  //El método dará de alta dicha cuenta y le asignará esos titulares
  async altaCuenta(cuenta:Cuenta,titulares:number[]){
     const clientes: Cliente[] = await this.clientesRepository.findBy({ dni:In(titulares) });
     cuenta.clientes = clientes;
     this.cuentasRepository.save(cuenta);
  }

  //saldo medio cuentas
  saldoMedio():Promise<any>{
    return this.dataSource.query("select avg(saldo) as saldo from cuentas");
  }

  //Se puede pero no se debe hacer ya que no es tan intuitivo
  altaNuevaCuenta(cuenta:Cuenta):void{
    this.dataSource.query("insert into cuentas values(?,?,?)",[cuenta.numeroCuenta,cuenta.saldo,cuenta.tipoCuenta]);
  }
  
}
