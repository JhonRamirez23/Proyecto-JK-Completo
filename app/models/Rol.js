export function createRol({ id_rol, rol_cod, descripcion, fecha_creacion } = {}) {
    return {
        id_rol,
        rol_cod,
        descripcion,
        fecha_creacion
    };
}

export default { createRol };