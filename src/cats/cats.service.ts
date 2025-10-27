import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    // Para poder acceder a los métodos del repositorio
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedsRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedsRepository.findOneBy({
      name: createCatDto.breed,
    });
    if (!breed) throw new BadRequestException('Breed not found');

    return await this.catsRepository.save({
      ...createCatDto,
      breed,
    });
  }

  async findAll() {
    return await this.catsRepository.find();
  }

  async findOne(id: number) {
    return await this.catsRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.catsRepository.findOneBy({ id });
    if (!cat) throw new BadRequestException('Cat not found');

    let breed: Breed | null = null;
    if (updateCatDto.breed) {
      breed = await this.breedsRepository.findOneBy({
        name: updateCatDto.breed,
      });
      if (!breed) throw new BadRequestException('Breed not found');
    }

    const updateData: Partial<Cat> = {};

    if (updateCatDto.name) updateData.name = updateCatDto.name;
    if (updateCatDto.age) updateData.age = updateCatDto.age;
    if (breed) updateData.breed = breed;

    return await this.catsRepository.update(id, {
      ...cat,
      ...updateData,
    });
  }

  async remove(id: number) {
    return await this.catsRepository.softDelete(id);
  }
}
