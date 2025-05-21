import { Injectable } from '@nestjs/common';
import { Cuenta } from 'src/model/Cuenta';


@Injectable()

export class BancoService {
  repositorio: Cuenta[] = [
    new Cuenta("1001", "Juan Pérez", "Ahorros", 1500.75),
    new Cuenta("1002", "María López", "Corriente", 2500.00),
    new Cuenta("1003", "Carlos García", "Ahorros", 320.50),
    new Cuenta("1004", "Ana Martínez", "Corriente", 780.25),
    new Cuenta("1005", "Luis Fernández", "Ahorros", 5000.00),
    new Cuenta("1006", "Sofía Torres", "Corriente", 1200.00),
    new Cuenta("1007", "Pedro Sánchez", "Ahorros", 950.10),
    new Cuenta("1008", "Laura Jiménez", "Corriente", 300.00),
    new Cuenta("1009", "Javier Morales", "Ahorros", 150.00),
    new Cuenta("1010", "Claudia Ruiz", "Corriente", 450.50)
];

  findByNumeroCuenta(num_cuenta:string):Cuenta{
    return this.repositorio.find(cta => cta.num_cuenta == num_cuenta);
  }

  findByTipo(tipo:string):Cuenta[]{
    return this.repositorio.filter(cta=>cta.tipo==tipo);
  }

  findBySaldoMin(saldoMin:number):Cuenta[]{
    return this.repositorio.filter(cta=>cta.saldo>=saldoMin);
  }

  save(cuenta:Cuenta):boolean{
    if (!this.repositorio.some(c=>c.num_cuenta==cuenta.num_cuenta))
    {
      this.repositorio.push(cuenta);
      return true;
    }
    return false;
  }

  deleteByNumeroCuenta(num_cuenta: string): void {
    if (!this.findByNumeroCuenta(num_cuenta))
        this.repositorio = this.repositorio.filter(c=>c.num_cuenta!=num_cuenta);
        // const index = this.repositorio.findIndex(cta => cta.num_cuenta == num_cuenta);
        // if (index !== -1) {
        //     this.repositorio.splice(index, 1);
        //     console.log(`Cuenta con número ${num_cuenta} eliminada.`);
        // } else {
        //     console.log(`Cuenta con número ${num_cuenta} no encontrada.`);
        // }
    }

}
