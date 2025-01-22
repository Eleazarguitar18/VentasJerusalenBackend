export class CreateProductoDto {
  nombre: string;
  descripción: string;
  precio: number;
  categoria: string;
  imagen?: number;
  categoría: string; //(sopa, segundo);
  id_imagen: string;
}
