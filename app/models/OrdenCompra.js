export function createOrdenCompra({ id_compra, fecha_creacion, ult_modif } = {}) {
  return {
    id_compra,
    fecha_creacion,
    ult_modif
  };
}

export default { createOrdenCompra };
