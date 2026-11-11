export function createUsuario({ id, usuario, documento, email, password, fecha_creacion } = {}) {
  return {
    id,
    usuario,
    documento,
    email,
    password,
    fecha_creacion
  };
}

export default { createUsuario };
