import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Pais } from 'src/model/Pais';


@Injectable()
export class PaisesService {
  urlGlobal:string= 'https://restcountries.com/v2/all?fields=name,region,flag,population,capital';
  // urlGlobal:string = 'https://restcountries.com/v2/all';
  private readonly logger = new Logger(PaisesService.name);

  // constructor(private readonly http:HttpService){

  // }

  async findByContinente(continente:string):Promise<Pais[]>{

    const response:AxiosResponse<any> = await axios.get(this.urlGlobal);
    const paisesPorContinente:Pais[] = response.data.filter((pais) => pais.region === continente)
    .map(p => new Pais(p.name, p.region, p.population, p.capital, p.flag));
        
    return paisesPorContinente;
  }

  async findAllContinentes():Promise<string[]>{
    const response:AxiosResponse<any>= await axios.get(this.urlGlobal);

    const continentes:string[] = response.data.map(p => p.region);
    // .filter((region, index, self) => region && self.indexOf(region) === index);;
    this.logger.log('Continentes',continentes);
    return [... new Set(continentes)];

  }

  async findPoblacionMax():Promise<Pais>{
    const response:AxiosResponse<any>= await axios.get(this.urlGlobal);
    const paises:Pais[] = response.data
    .map(p => new Pais(p.name, p.region, p.population, p.capital, p.flag));
        
    const paisConPoblacionMaxima = paises.reduce((max, pais) => {
        // if (pais.poblacion>max.poblacion) return pais; else return max;
        return pais.poblacion > max.poblacion ? pais : max;
      });
      return paisConPoblacionMaxima;
  }
  
}
