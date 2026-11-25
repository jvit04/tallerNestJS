import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Foto } from './foto.entity.js';

@Entity('etiquetas')
export class Etiqueta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50, unique: true })
    texto: string;

    @ManyToMany(() => Foto, (foto) => foto.etiquetas)
    fotos: Foto[];
}