import { Injectable } from '@nestjs/common';
import axios from './../../node_modules/axios/index.d';
import { Pais } from 'src/model/Pais';


@Injectable()
export class PaisesService {
  urlGlobal:string = 'https://restcountries.com/v2/all';

  // constructor(private readonly http:HttpService){

  // }

  async findByContinente(continente:string):Promise<Pais[]>{

    const response = await axios.get(this.urlGlobal);
    const paisesPorContinente:Pais[] = response.data.filter((pais) => pais.region === continente)
    .map(p => new Pais(p.name, p.region, p.population, p.capital, p.flag));
        
    return paisesPorContinente;
  }

  async findAllContinentes():Promise<string[]>{
    const response= await axios.get(this.urlGlobal);

    const continentes:string[] = response.data.map(p => p.region);

    return [... new Set(continentes)];
  }

  async findPoblacionMax():Promise<Pais>{
    const response= await axios.get(this.urlGlobal);
     const paises:Pais[] = response.data
    .map(p => new Pais(p.name, p.region, p.population, p.capital, p.flag));
        
    const paisConPoblacionMaxima = paises.reduce((max, pais) => {
        // if (pais.poblacion>max.poblacion) return pais; else return max;
        return pais.poblacion > max.poblacion ? pais : max;
      });
      return paisConPoblacionMaxima;
  }
  
}
