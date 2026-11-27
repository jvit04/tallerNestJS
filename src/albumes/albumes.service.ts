import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity.js';
import { CreateAlbumDto } from './dto/create-album.dto.js';
import { UpdateAlbumDto } from './dto/update-album.dto.js';

@Injectable()
export class AlbumesService {
  constructor(
    @InjectRepository(Album)
    private readonly albumesRepo: Repository<Album>,
  ) {}

  findAll() {
    return this.albumesRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Album> {
    const album = await this.albumesRepo.findOneBy({ id });
    if (!album) throw new NotFoundException(`Álbum ${id} no encontrado`);
    return album;
  }

  async findFotos(id: number) {
    const album = await this.albumesRepo.findOne({
      where: { id },
      relations: { fotos: true },
    });
    if (!album) throw new NotFoundException(`Álbum ${id} no encontrado`);
    return album;
  }

  create(datos: CreateAlbumDto): Promise<Album> {
    const album = this.albumesRepo.create(datos);
    return this.albumesRepo.save(album);
  }

  async update(id: number, datos: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);
    this.albumesRepo.merge(album, datos);
    return this.albumesRepo.save(album);
  }

  async remove(id: number): Promise<void> {
    const album = await this.findOne(id);
    await this.albumesRepo.remove(album);
  }
}