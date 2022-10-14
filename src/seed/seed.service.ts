import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=2',
    );

    const results = data.results.map(({ name, url }) => {
      const no: number = +url.split('/').reverse()[1];
      return {
        name,
        no,
      };
    });

    return results;
  }
}
