import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany();
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    // Promesas
    // const insertPromisesArray = [];

    // data.results.forEach(({ name, url }) => {
    //   const no: number = +url.split('/').reverse()[1];
    //   insertPromisesArray.push(this.pokemonModel.create({ name, no }));
    // });

    // await Promise.all(insertPromisesArray);
    const results = data.results.map(({ name, url }) => {
      const no: number = +url.split('/').reverse()[1];
      return {
        name,
        no,
      };
    });

    await this.pokemonModel.insertMany(results);

    return 'Seed Executed';
  }
}
