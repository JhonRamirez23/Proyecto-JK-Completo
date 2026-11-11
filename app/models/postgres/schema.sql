-- Esquema PostgreSQL
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  usuario VARCHAR(50) NOT NULL,
  documento VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT NOW()
);

CREATE TABLE productos (
  id_producto SERIAL PRIMARY KEY,
  articulo VARCHAR(100) NOT NULL,
  valor INTEGER NOT NULL,
  cantidad INTEGER NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT NOW(),
  ult_modif TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ordenes_compra (
  id_compra INTEGER PRIMARY KEY,
  fecha_creacion TIMESTAMP DEFAULT NOW(),
  ult_modif TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pedidos_compras (
  id_orden_pedido SERIAL PRIMARY KEY,
  id_usuario INTEGER NOT NULL REFERENCES usuarios(id),
  id_producto INTEGER NOT NULL REFERENCES productos(id_producto),
  id_compra INTEGER NOT NULL REFERENCES ordenes_compra(id_compra),
  fecha_creacion TIMESTAMP DEFAULT NOW()
);

CREATE TABLE vendedores (
  id_vendedor INTEGER NOT NULL,
  id_usuario INTEGER REFERENCES usuarios(id),
  nombre VARCHAR(50) NOT NULL,
  direccion VARCHAR(50) NOT NULL,
  telefono VARCHAR(10) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT NOW()
);

CREATE TABLE empleados (
  id_empleado INTEGER PRIMARY KEY NOT NULL,
  nombre VARCHAR(40) NOT NULL,
  cargo VARCHAR(40) NOT NULL,
  salario INTEGER NOT NULL,
  eps VARCHAR(20) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT NOW(),
  ult_modif TIMESTAMP DEFAULT NOW(),
  id_usuario INTEGER REFERENCES usuarios(id)
);

CREATE TABLE roles (
  id_rol SERIAL PRIMARY KEY,
  rol_cod varchar(100) NOT NULL,
  descripcion text NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT NOW()
);

CREATE TABLE usuarios_roles (
  id SERIAL INTEGER PRIMARY KEY,
  id_usuario INTEGER REFERENCES usuarios(id),
  id_rol INTEGER REFERENCES roles(id_rol),
  UNIQUE (id_usuario, id_rol)
);

CREATE TABLE revoked_tokens (
  jti VARCHAR(255) PRIMARY KEY,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX revoked_tokens_expires_at_idx ON revoked_tokens(expires_at);
