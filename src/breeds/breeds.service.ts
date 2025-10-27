import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from './entities/breed.entity';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedsRepository: Repository<Breed>,
  ) {}

  async create(createBreedDto: CreateBreedDto) {
    return await this.breedsRepository.save(createBreedDto);
  }

  async findAll() {
    return await this.breedsRepository.find();
  }

  async findOne(id: number) {
    return await this.breedsRepository.findOneBy({ id });
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    return await this.breedsRepository.update(id, updateBreedDto);
  }

  async remove(id: number) {
    return await this.breedsRepository.softDelete(id);
  }
}
