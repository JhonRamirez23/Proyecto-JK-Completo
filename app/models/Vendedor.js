export function createVendedor({ id_vendedor, id_usuario, nombre, direccion, telefono, fecha_creacion } = {}) {
  return {
    id_vendedor,
    id_usuario,
    nombre,
    direccion,
    telefono,
    fecha_creacion
  };
}

export default { createVendedor };
