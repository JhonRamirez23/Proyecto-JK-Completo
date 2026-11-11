export function createEmpleado({ id_empleado, id_usuario, nombre, cargo, salario, eps, fecha_creacion, ult_modif } = {}) {
  return {
    id_empleado,
    id_usuario,
    nombre,
    cargo,
    salario,
    eps,
    fecha_creacion,
    ult_modif
  };
}

export default { createEmpleado };
