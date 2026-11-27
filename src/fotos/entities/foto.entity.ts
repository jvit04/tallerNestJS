// importación del tipo ORM
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Etiqueta } from './etiqueta.entity.js';
import { Album } from '../../albumes/entities/album.entity.js';

@Entity('fotos')
export class Foto {
    //Primary key autogenerada
  @PrimaryGeneratedColumn()
  id: number;

//crea la columna de titulo de string 
@Column({ type: 'varchar', length: 100 })
titulo: string;

//crea la columna de descripción que puede ser nulo o string
  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

//crea la columna de calificación de tipo real
  @Column({ type: 'real', default: 0 })
  calificacion: number;

//crea la columna tipo string para el url de la imagen
@Column({ type: 'varchar' })
ruta: string; // URL de la imagen

@Column({ type: 'text', nullable: true })
fotografo: string | null;

  //crea la columna de fecha de creación
  @CreateDateColumn()
  creadoEn: Date;

//crea la columna de fecha de actualización
  @UpdateDateColumn()
  actualizadoEn: Date;


  // N:1 Muchas fotos pertenecen a un álbum
  @ManyToOne(() => Album, (album) => album.fotos, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  album: Album | null;

// N:M Una foto tiene muchas etiquetas y viceversa
  @ManyToMany(() => Etiqueta, (etiqueta) => etiqueta.fotos)
  @JoinTable({
    name:'fotos_etiquetas',
    joinColumn: { name: 'foto_id'},
    inverseJoinColumn: {name: 'etiqueta_id'},
  })
  etiquetas: Etiqueta[];
}