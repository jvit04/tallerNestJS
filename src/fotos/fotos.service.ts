import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { Foto } from './entities/foto.entity.js';

// src/fotos/fotos.service.ts
export interface FiltroFotos {
  min: number;
  max: number;
  q?: string;
  etiqueta?: string;
  orden?: 'asc' | 'desc';
  page: number;
  limit: number;
}
@Injectable()
export class FotosService {
  constructor(
    @InjectRepository(Foto)
    private readonly fotosRepo: Repository<Foto>,
  ) {}

async findAll({ min, max, q, etiqueta, orden, page, limit }: FiltroFotos) {
    const [data, total] = await this.fotosRepo.findAndCount({
      where: {
        calificacion: Between(min, max),
        ...(q && { titulo: ILike(`%${q}%`) }),
        ...(etiqueta && { etiquetas: { texto: etiqueta } }),
      },
      relations: { album: true, etiquetas: true },
      order: orden
        ? { calificacion: orden.toUpperCase() as 'ASC' | 'DESC' }
        : { id: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }

  async findOne(id: number): Promise<Foto> {
    const foto = await this.fotosRepo.findOne({
      where: { id },
      relations: { album: true, etiquetas: true },
    });
    if (!foto) {
      throw new NotFoundException(`Foto ${id} no encontrada`);
    }
    return foto;
  }

  create(datos: Partial<Foto>): Promise<Foto> {
    const foto = this.fotosRepo.create(datos);
    return this.fotosRepo.save(foto);
  }

  async update(id: number, datos: Partial<Foto>): Promise<Foto> {
    const foto = await this.findOne(id);
    this.fotosRepo.merge(foto, datos);
    return this.fotosRepo.save(foto);
  }

  async remove(id: number): Promise<void> {
    const foto = await this.findOne(id);
    await this.fotosRepo.remove(foto);
  }
}