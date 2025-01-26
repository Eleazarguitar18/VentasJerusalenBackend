export class CreateProductoDto {
  nombre: string;
  descripcion: string;
  precio: number;
  // imagen?: number;
  categoría: string; //(sopa, segundo);
  id_imagen?: string;
  estado?: boolean;
}
