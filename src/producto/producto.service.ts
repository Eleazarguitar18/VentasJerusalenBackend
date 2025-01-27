import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}
  async create(createProductoDto: CreateProductoDto) {
    try {
      // if (this.esDecimal(createProductoDto.precio)) {
      //   return new HttpException(
      //     'el precio del producto debe ser entero',
      //     HttpStatus.CONFLICT,
      //   );
      // }
      const productoFound = await this.productoRepository.findOne({
        where: {
          nombre: createProductoDto.nombre,
          categoría: createProductoDto.categoría,
        },
      });
      console.log(productoFound);
      if (productoFound) {
        return new HttpException(
          'El Producto se encuetra registrado',
          HttpStatus.CONFLICT,
        );
      }
      const newProducto = this.productoRepository.create(createProductoDto);
      const saveProducto = await this.productoRepository.save(newProducto);
      return { message: 'Producto creado exitosamente', data: saveProducto };
    } catch (error) {
      console.error('Error en la creación del producto:', error);
      throw error;
      // Manejo de errores
      // if (error instanceof HttpException) {
      //   throw error; // Re-lanzar excepciones HTTP ya manejadas
      // }
      // // Manejo genérico para otros errores no previstos
      // throw new HttpException(
      //   'Error interno del servidor al crear el producto',
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      // );
    }
  }
  esDecimal(numero: number) {
    return numero % 1 !== 0;
  }
  findAll() {
    return this.productoRepository.find({
      where: {
        estado: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return this.productoRepository.update(id, updateProductoDto);
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
