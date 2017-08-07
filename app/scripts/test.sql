CREATE TABLE ar_unidades
(
	num_placa                 char(20) PRIMARY KEY,
	num_economico             char(20) PRIMARY KEY,
	id_subagencia             char(20) NOT NULL,
	equipo                    INT,
	clase_vehiculo            char(20),
	estatus_servicio          char(20),
	estatus                   char(20),
	denominacion              char(50),
	fabricante                char(20),
	denominacion_tipo         char(50),
	fabricante_num_serie      char(40),
	num_inventario            char(20),
	centro_coste              char(20),
	orden_interna_combustible INT,
	clase_orden               char(20),
	area_funcional            char(20),
	paquete                   char(35),
	grupo_articulo            char(20),
	cuenta_mantto             char(40),
	comentarios               char(400),
	kilometraje               REAL,
	fecha_update              char(24),
	fecha_prox_servicio       char(10)
);

CREATE TABLE ar_operador
(
	num_placa     char(20) PRIMARY KEY,
	num_economico char(20) PRIMARY KEY,
	nombres       char(80),
	apellidos     char(80),
	num_empleado  char(20),
	telefono      char(50),
	FOREIGN KEY (num_placa, num_economico)
	REFERENCES ar_unidades (num_placa, num_economico)
);

CREATE TABLE am_usuario
(
	username   char(30) PRIMARY KEY,
	password   char(100) NOT NULL,
	enabled    char(1)   NOT NULL,
	nombres    char(30)  NOT NULL,
	apellidos  char(30)  NOT NULL,
	correo     char(50)  NOT NULL,
	id_empresa INT       NOT NULL,
	imagen     BLOB
);

CREATE TABLE am_usuario_role (
	username char(30) PRIMARY KEY,
	role     char(30) NOT NULL,
	FOREIGN KEY (username) REFERENCES am_usuario (username)
);

CREATE TABLE ar_ubicacion_unidad
(
	id_ubicacion_unidad INT PRIMARY KEY AUTOINCREMENT,
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
CREATE TABLE ar_orden_trabajo
(
	id_orden_trabajo     INT PRIMARY KEY AUTOINCREMENT,
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
	id_check_list        INT,
	id_ubicacion_unidad  INT,
	FOREIGN KEY (num_placa, num_economico)
	REFERENCES ar_unidades (num_placa, num_economico),
	FOREIGN KEY (usuario_creacion)
	REFERENCES am_usuario (username),
	FOREIGN KEY (usuario_asignado)
	REFERENCES am_usuario (username),
	FOREIGN KEY (id_ubicacion_unidad)
	REFERENCES ar_ubicacion_unidad (id_ubicacion_unidad)
);

CREATE TABLE ar_servicio_refacciones
(
	id_orden_trabajo  INT PRIMARY KEY AUTOINCREMENT,
	descripcion       char(100),
	total_mano_obra   DECIMAL(8, 2) NOT NULL,
	total_refacciones DECIMAL(8, 2) NOT NULL,
	FOREIGN KEY (id_orden_trabajo)
	REFERENCES ar_orden_trabajo (id_orden_trabajo)
);

CREATE TABLE ar_operador_orden_trabajo
(
	id_orden_trabajo INT PRIMARY KEY AUTOINCREMENT,
	nombres          char(80),
	apellidos        char(80),
	num_empleado     char(20),
	telefono         char(50),
	FOREIGN KEY (id_orden_trabajo)
	REFERENCES ar_orden_trabajo (id_orden_trabajo)
);

CREATE TABLE ar_material_servicio
(
	id_material_servicio INT PRIMARY KEY,
	clase_orden          char(10) NOT NULL,
	nomenclatura         char(10) NOT NULL,
	tipo_servicio        char(30) NOT NULL,
	subtipo_servicio     char(50) NOT NULL,
	id_empresa           INT      NOT NULL
);

CREATE TABLE ar_paquete_familia
(
	id_paquete_familia char(100) PRIMARY KEY,
	paquete            char(50) NOT NULL,
	familia            char(50) NOT NULL,
	grupo_articulo     INT      NOT NULL,
	num_servicio       INT      NOT NULL,
	cuenta_contable    INT      NOT NULL
);

CREATE TABLE ar_material_serv_refaccion
(
	id_material_serv_refaccion INT PRIMARY KEY AUTOINCREMENT,
	id_material_servicio       INT           NOT NULL,
	descripcion                char(100)     NOT NULL,
	marca_material             char(50)      NOT NULL,
	precio_unitario            DECIMAL(8, 2) NOT NULL,
	unidad_medida              char(5)       NOT NULL,
	numero_existentes          INT,
	estatus                    char(20)      NOT NULL,
	FOREIGN KEY (id_material_servicio)
	REFERENCES ar_material_servicio (id_material_servicio)
);

CREATE TABLE ar_material_orden_trabajo
(
	id_material_orden_trabajo  INT PRIMARY KEY  AUTOINCREMENT,
	id_orden_trabajo           INT           NOT NULL,
	id_material_serv_refaccion INT           NOT NULL,
	id_paquete_familia         char(100)     NOT NULL,
	concepto                   char(20)      NOT NULL,
	servicio_material          char(10)      NOT NULL,
	precio_unitario_nvo        DECIMAL(8, 2) NOT NULL,
	numero_utilizadas          INT           NOT NULL,
	subtotal_refacciones       DECIMAL(8, 2) NOT NULL,
	existencia                 char(2)       NOT NULL,
	FOREIGN KEY (id_orden_trabajo)
	REFERENCES ar_servicio_refacciones (id_orden_trabajo),
	FOREIGN KEY (id_material_serv_refaccion)
	REFERENCES ar_material_serv_refaccion (id_material_serv_refaccion)
);

CREATE TABLE ar_imagenes
(
	id_imagen     INT PRIMARY KEY AUTOINCREMENT,
	folio         char(20),
	imagen        BLOB,
	tipo_imagen   char(50) NOT NULL,
	nombre_imagen char(50)
);