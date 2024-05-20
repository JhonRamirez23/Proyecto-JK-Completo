-- Se crea la BD jk_db
CREATE DATABASE jk_db;

USE jk_db;

-- Se crea la tabla usuarios
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(50) NOT NULL,
  documento VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  fecha_creacion TIMESTAMP
);

-- Se crea la tabla productos
CREATE TABLE productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  articulo VARCHAR(100) NOT NULL,
  valor INTEGER(100) NOT NULL,
  cantidad INTEGER(100) NOT NULL,
  fecha_creacion TIMESTAMP,
  ult_modif TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Se crea la tabla orden de compra
CREATE TABLE orden_compra (
  id_compra INT(10) PRIMARY KEY,
  fecha_creacion TIMESTAMP,
  ult_modif TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Se crea la tabla pedidos
CREATE TABLE pedido_compra (
  orden_pedido INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_producto INT NOT NULL,
  id_compra INT NOT NULL,
  fecha_creacion TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
  FOREIGN KEY (id_compra) REFERENCES orden_compra(id_compra)
);

-- Se crea la tabla vendedores
CREATE TABLE vendedor (
  id_vendedor INT NOT NULL,
  id_usuario INT,
  nombre VARCHAR(50) NOT NULL,
  direccion VARCHAR(50) NOT NULL,
  telefono VARCHAR(10) NOT NULL,
  fecha_creacion TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Se crea la tabla empleados
CREATE TABLE empleados (
  rol_id INT(10) PRIMARY KEY NOT NULL,
  nombre VARCHAR(40) NOT NULL,
  cargo VARCHAR(40) NOT NULL,
  salario INT(100) NOT NULL,
  EPS VARCHAR(20) NOT NULL,
  fecha_creacion TIMESTAMP,
  ult_modif TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Se agregan las relaciones
ALTER TABLE vendedor ADD CONSTRAINT fk_vendedor_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id);
ALTER TABLE pedido_compra ADD CONSTRAINT fk_pedido_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id);
ALTER TABLE pedido_compra ADD CONSTRAINT fk_pedido_producto FOREIGN KEY (id_producto) REFERENCES productos(id_producto);
ALTER TABLE orden_compra ADD CONSTRAINT fk_orden_pedido FOREIGN KEY (id_compra) REFERENCES pedido_compra(id_compra);
ALTER TABLE empleados ADD id_usuario INT, ADD CONSTRAINT fk_empleados_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios(id);