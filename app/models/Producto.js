export function createProducto({ id_producto, articulo, valor, cantidad, fecha_creacion, ult_modif } = {}) {
  return {
    id_producto,
    articulo,
    valor,
    cantidad,
    fecha_creacion,
    ult_modif
  };
}

export default { createProducto };
