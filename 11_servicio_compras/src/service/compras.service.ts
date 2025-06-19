import { Injectable, OnModuleInit} from '@nestjs/common';
import { ProductoDto } from 'src/dtos/ProductoDto';
import axios from 'axios';
import { PedidoDto } from 'src/dtos/PedidoDto';


@Injectable()
export class ComprasService  implements OnModuleInit {

  urlBase:string='http://localhost:4000/tienda';
  urlAutenticar:string="http://localhost:4000/auth/login";
  token:string;
  username:string="usuario1";
  password:string="usuario1";

  constructor() { 
    
  }

  async onModuleInit() {
    //Obtenemos el token al principio
    const response = await axios.post<any>(this.urlAutenticar, {
            username: this.username,
            password: this.password
        });
        this.token = response.data.valorToken; 
  }


  async getProductosRango(min:number,max:number):Promise<ProductoDto[]>{

    let headers = {
    "Authorization": `Bearer ${this.token}`
    };

    const response = await axios.get<any, any>(`${this.urlBase}/productos`, { headers });
    // const response:any = await axios.get<any,any>(`${this.urlBase}/productos`);
    //Cambio para usar el servicio securizado

    const dataRango:any = response.data.filter(p => p.precioUnitario <= max && p.precioUnitario >= min);
    console.log(dataRango);
    const productosRango:ProductoDto[] = dataRango.map( d => {
      let disponibilidad:string = '';
      if (d.stock >= 0 && d.stock <= 3) {
          disponibilidad='baja';
      } else if (d.stock >= 4 && d.stock <= 10) {
          disponibilidad='media';
      } else if (d.stock > 10) {
         disponibilidad='alta';
      }
      console.log(d);
      return new ProductoDto(d.producto,d.precioUnitario,disponibilidad )
    });

    return productosRango;

  }

  async nuevoPedido(pedido:PedidoDto):Promise<boolean>{
    try{
      let headers = {
      "Authorization": `Bearer ${this.token}`
      };

      await axios.post<any, any>(`${this.urlBase}/nuevoPedido`,pedido, { headers });
      // await  axios.post(`${this.urlBase}/nuevoPedido`,pedido);
      return true;
    }catch(err){
      return false;
    }

  }
  
}
function OnInit() {
  throw new Error('Function not implemented.');
}

