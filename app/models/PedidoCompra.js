export function createPedidoCompra({ id_orden_pedido, id_usuario, id_producto, id_compra, fecha_creacion } = {}) {
  return {
    id_orden_pedido,
    id_usuario,
    id_producto,
    id_compra,
    fecha_creacion
  };
}

export default { createPedidoCompra };
