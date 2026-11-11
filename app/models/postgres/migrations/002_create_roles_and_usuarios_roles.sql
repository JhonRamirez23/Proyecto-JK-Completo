CREATE TABLE IF NOT EXISTS roles (
  id_rol SERIAL PRIMARY KEY,
  rol_cod varchar(100) NOT NULL,
  descripcion text NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS usuarios_roles (
  id SERIAL INTEGER PRIMARY KEY,
  id_usuario INTEGER REFERENCES usuarios(id),
  id_rol INTEGER REFERENCES roles(id_rol),
  UNIQUE (id_usuario, id_rol)
);