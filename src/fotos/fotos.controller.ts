import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FotosService } from './fotos.service.js';
import type { Foto } from './entities/foto.entity.js';

@Controller('fotos')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  // src/fotos/fotos.controller.ts (dentro de @Get())
@Get()
findAll(
  @Query('min', new DefaultValuePipe(0), ParseFloatPipe) min: number,
  @Query('max', new DefaultValuePipe(5), ParseFloatPipe) max: number,
  @Query('q') q?: string,
  @Query('etiqueta') etiqueta?: string,
  @Query('orden') orden?: 'asc' | 'desc',
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
) {
  return this.fotosService.findAll({
    min,
    max,
    q,
    etiqueta,
    orden,
    page,
    limit,
  });
}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fotosService.findOne(id);
  }

  @Post()
  create(@Body() datos: Omit<Foto, 'id'>) {
    return this.fotosService.create(datos);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: Partial<Omit<Foto, 'id'>>,
  ) {
    return this.fotosService.update(id, datos);
  }


@Delete(':id')
@HttpCode(204)
remove(@Param('id', ParseIntPipe) id: number) {
  return this.fotosService.remove(id);
}
}