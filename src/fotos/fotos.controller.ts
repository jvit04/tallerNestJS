import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FotosService } from './fotos.service.js';
import { CreateFotoDto } from './dto/create-foto.dto.js';
import { QueryFotosDto } from './dto/query-fotos.dto.js';
import { UpdateFotoDto } from './dto/update-foto.dts.js';

@Controller('fotos')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  // src/fotos/fotos.controller.ts (dentro de @Get())
@Get()
findAll(@Query() filtro: QueryFotosDto) {
return this.fotosService.findAll(filtro);
}
@Post() // 201 Created por defecto
create(@Body() dto: CreateFotoDto) {
return this.fotosService.create(dto);
}
@Patch(':id')
update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFotoDto) {
return this.fotosService.update(id, dto);
}
@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT) // 204: éxito sin cuerpo
remove(@Param('id', ParseIntPipe) id: number) {
return this.fotosService.remove(id);
}
}