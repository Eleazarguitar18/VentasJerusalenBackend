import { Injectable } from '@nestjs/common';
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
    // TODO:buscar el producto - PENDIENTE
    // const productoFound = this.productoRepository.findOne({
    //   where: {
    //     nombre: createProductoDto.nombre,
    //     p_apellido: createproductoDto.p_apellido,
    //     s_apellido: createproductoDto.s_apellido,
    //   },
    // });
    // if (productoFound) {
    //   return new HttpException(
    //     'El usuario se encuetra registrado',
    //     HttpStatus.CONFLICT,
    //   );
    // }
    const newProducto = this.productoRepository.create(createProductoDto);
    const saveProducto = await this.productoRepository.save(newProducto);
    return { message: 'Producto creado exitosamente', data: saveProducto };
  }

  findAll() {
    return `This action returns all producto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
