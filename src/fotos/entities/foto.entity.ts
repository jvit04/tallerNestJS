// importación del tipo ORM
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}