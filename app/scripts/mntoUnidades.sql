CREATE TABLE IF NOT EXISTS ar_unidades
(
  num_placa                 char(20),
  num_economico             char(20),
  id_subagencia             char(20),
  equipo                    INTEGER,
  clase_vehiculo            char(20),
  estatus_servicio          char(20),
  estatus                   char(20),
  denominacion              char(50),
  fabricante                char(20),
  denominacion_tipo         char(50),
  fabricante_num_serie      char(40),
  num_inventario            char(20),
  centro_coste              char(20),
  orden_interna_combustible INTEGER,
  clase_orden               char(20),
  area_funcional            char(20),
  paquete                   char(35),
  grupo_articulo            char(20),
  cuenta_mantto             char(40),
  comentarios               char(400),
  kilometraje               REAL,
  fecha_update              char(24),
  fecha_prox_servicio       char(10),
  PRIMARY KEY (num_placa, num_economico)
);

CREATE TABLE IF NOT EXISTS ar_operador
(
  num_placa     char(20),
  num_economico char(20),
  nombres       char(80),
  apellidos     char(80),
  num_empleado  char(20),
  telefono      char(50),
  PRIMARY KEY (num_placa, num_economico),
  FOREIGN KEY (num_placa, num_economico)
  REFERENCES ar_unidades (num_placa, num_economico)
);

CREATE TABLE IF NOT EXISTS am_usuario
(
  username   char(30) PRIMARY KEY,
  password   char(100) NOT NULL,
  enabled    char(1)   NOT NULL,
  id_empresa INTEGER   NOT NULL,
  imagen     BLOB
);

CREATE TABLE IF NOT EXISTS am_usuario_role (
  username char(30) PRIMARY KEY,
  role     char(30) NOT NULL,
  FOREIGN KEY (username) REFERENCES am_usuario (username)
);

CREATE TABLE IF NOT EXISTS ar_ubicacion_unidad
(
  id_ubicacion_unidad INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha_reporte       char(24),
  hora_reporte        char(5),
  hora_salida         char(5),
  hora_arribo         char(5),
  uso_grua            char(2),
  uso_remplazo        char(2),
  fecha_termino       char(24),
  hora_termino        char(5),
  ciudad              char(50) NOT NULL,
  estado              char(50) NOT NULL,
  poblacion           char(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS ar_orden_trabajo
(
  id_orden_trabajo     INTEGER PRIMARY KEY AUTOINCREMENT,
  folio                char(20),
  ruta                 char(50),
  kilometraje          REAL          NOT NULL,
  tipo_servicio        char(15),
  num_placa            char(10)      NOT NULL,
  num_economico        char(15)      NOT NULL,
  fecha_update         char(10),
  fecha_entrada        char(10)      NOT NULL,
  fecha_inicio         char(24),
  fecha_fin            char(24),
  fecha_salida         char(10),
  hora_entrada         char(5),
  hora_salida          char(5),
  estatus_servicio     char(15)      NOT NULL,
  usuario_creacion     char(50)      NOT NULL,
  usuario_asignado     char(50)      NOT NULL,
  descripcion_problema char(400)     NOT NULL,
  diagnostico_falla    char(400),
  detalle_reparacion   char(400),
  refacciones_usadas   char(400),
  sugerencia_prox_serv char(400),
  observaciones        char(400),
  total_servicio       DECIMAL(8, 2) NOT NULL,
  id_check_list        INTEGER,
  id_ubicacion_unidad  INTEGER,
  FOREIGN KEY (num_placa, num_economico)
  REFERENCES ar_unidades (num_placa, num_economico),
  FOREIGN KEY (usuario_creacion)
  REFERENCES am_usuario (username),
  FOREIGN KEY (usuario_asignado)
  REFERENCES am_usuario (username),
  FOREIGN KEY (id_ubicacion_unidad)
  REFERENCES ar_ubicacion_unidad (id_ubicacion_unidad)
);

CREATE TABLE IF NOT EXISTS ar_servicio_refacciones
(
  id_orden_trabajo  INTEGER PRIMARY KEY,
  descripcion       char(100),
  total_mano_obra   DECIMAL(8, 2) NOT NULL,
  total_refacciones DECIMAL(8, 2) NOT NULL,
  FOREIGN KEY (id_orden_trabajo)
  REFERENCES ar_orden_trabajo (id_orden_trabajo)
);

CREATE TABLE IF NOT EXISTS ar_operador_orden_trabajo
(
  id_orden_trabajo INTEGER PRIMARY KEY AUTOINCREMENT,
  nombres          char(80),
  apellidos        char(80),
  num_empleado     char(20),
  telefono         char(50),
  FOREIGN KEY (id_orden_trabajo)
  REFERENCES ar_orden_trabajo (id_orden_trabajo)
);

CREATE TABLE IF NOT EXISTS ar_material_servicio
(
  id_material_servicio INTEGER PRIMARY KEY,
  clase_orden          char(10) NOT NULL,
  nomenclatura         char(10) NOT NULL,
  tipo_servicio        char(30) NOT NULL,
  subtipo_servicio     char(50) NOT NULL,
  id_empresa           INTEGER  NOT NULL
);

CREATE TABLE IF NOT EXISTS ar_paquete_familia
(
  id_paquete_familia char(100) PRIMARY KEY,
  paquete            char(50) NOT NULL,
  familia            char(50) NOT NULL,
  grupo_articulo     INTEGER  NOT NULL,
  num_servicio       INTEGER  NOT NULL,
  cuenta_contable    INTEGER  NOT NULL
);

CREATE TABLE IF NOT EXISTS ar_material_serv_refaccion
(
  id_material_serv_refaccion INTEGER PRIMARY KEY,
  id_material_servicio       INTEGER       NOT NULL,
  descripcion                char(100)     NOT NULL,
  marca_material             char(50)      NOT NULL,
  precio_unitario            DECIMAL(8, 2) NOT NULL,
  unidad_medida              char(5)       NOT NULL,
  numero_existentes          INTEGER,
  estatus                    char(20)      NOT NULL,
  FOREIGN KEY (id_material_servicio)
  REFERENCES ar_material_servicio (id_material_servicio)
);

CREATE TABLE IF NOT EXISTS ar_material_orden_trabajo
(
  id_material_orden_trabajo  INTEGER PRIMARY KEY  AUTOINCREMENT,
  id_orden_trabajo           INTEGER       NOT NULL,
  id_material_serv_refaccion INTEGER       NOT NULL,
  id_paquete_familia         char(100)     NOT NULL,
  concepto                   char(20)      NOT NULL,
  servicio_material          char(10)      NOT NULL,
  precio_unitario_nvo        DECIMAL(8, 2) NOT NULL,
  numero_utilizadas          INTEGER       NOT NULL,
  subtotal_refacciones       DECIMAL(8, 2) NOT NULL,
  existencia                 char(2)       NOT NULL,
  FOREIGN KEY (id_orden_trabajo)
  REFERENCES ar_servicio_refacciones (id_orden_trabajo),
  FOREIGN KEY (id_material_serv_refaccion)
  REFERENCES ar_material_serv_refaccion (id_material_serv_refaccion)
);

CREATE TABLE IF NOT EXISTS ar_imagenes
(
  id_imagen   INTEGER PRIMARY KEY AUTOINCREMENT,
  id_orden_trabajo    char(20)  NOT NULL,
  uri         char(200) NOT NULL,
  height      char(50)  NOT NULL,
  width       char(50)  NOT NULL,
  tipo_imagen char(50)  NOT NULL,
  FOREIGN KEY (id_orden_trabajo)
  REFERENCES ar_orden_trabajo (id_orden_trabajo)
);