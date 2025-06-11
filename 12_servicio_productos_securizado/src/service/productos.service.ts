import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoDto } from 'src/dtos/ProductoDto';
import { Producto } from 'src/model/Producto';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {

  constructor(@InjectRepository(Producto) private readonly productosRepository:Repository<Producto>){
  }

    async catalago():Promise<ProductoDto[]>{
      // return this.productosRepository.find();
      const resultado:Producto[]=await this.productosRepository.find();
      return resultado.map(p=>new ProductoDto(p.codigoProducto,p.producto,p.precioUnitario,p.stock))
    }

      async altaProducto(producto:ProductoDto):Promise<boolean>{
    const prod:Producto=await this.productosRepository.
    createQueryBuilder('producto')
    .where('codigoProducto=:cod',{cod:producto.codigoProducto})
    .getOne();
    if(prod){
      return false;
    }else{
      this.productosRepository.save(producto);
      return true;
    }

  }
  
}
