CREATE TABLE `usuarios` (
  `id_usuario` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `documento` varchar(10) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `fecha_creacion` timestamp
);

CREATE TABLE `productos` (
  `id_producto` integer PRIMARY KEY AUTO_INCREMENT,
  `articulo` varchar(100) NOT NULL,
  `valor` varchar(50) NOT NULL,
  `cantidad` integer(10) NOT NULL,
  `fecha_creacion` timestamp
);

CREATE TABLE `pedido_compra` (
  `id_usuario` integer NOT NULL,
  `id_producto` integer NOT NULL,
  `id_compra` integer NOT NULL,
  `orden_pedido` varchar(10) PRIMARY KEY NOT NULL,
  `fecha_creacion` timestamp
);

CREATE TABLE `orden_compra` (
  `id_compra` integer(10) PRIMARY KEY NOT NULL
);

CREATE TABLE `vendedor` (
  `id_vendedor` integer NOT NULL,
  `area` varchar(60) NOT NULL,
  `id_usuario` integer PRIMARY KEY,
  `documento` varchar(10) NOT NULL
);

CREATE TABLE `empleados` (
  `id_empleado` integer(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `area` varchar(50) NOT NULL,
  `salario` integer(100) NOT NULL,
  `EPS` integer(20) NOT NULL,
  `fecha_creacion` timestamp
);

ALTER TABLE `usuarios` ADD FOREIGN KEY (`documento`) REFERENCES `vendedor` (`id_usuario`);

ALTER TABLE `pedido_compra` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

ALTER TABLE `productos` ADD FOREIGN KEY (`id_producto`) REFERENCES `pedido_compra` (`id_producto`);

ALTER TABLE `vendedor` ADD FOREIGN KEY (`documento`) REFERENCES `empleados` (`area`);

ALTER TABLE `orden_compra` ADD FOREIGN KEY (`id_compra`) REFERENCES `pedido_compra` (`id_compra`);
