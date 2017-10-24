/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    AppRegistry
} from 'react-native';
import bcrypt from 'react-native-bcrypt';
import {fechaString, objetoValido} from '../util/comunUtil'

let SQLite = require('react-native-sqlite-storage');
let Respuesta = {data: null, mensaje: '', exito: false};
let unidades = [];
let servicios = [];
let refacciones = [];

const INSERT_USUARIO = 'INSERT INTO am_usuario(username,password,enabled,id_empresa) VALUES (?,?,?,?)';
const INSERT_PAQUETE = 'INSERT INTO ar_paquete_familia VALUES (?,?,?,?,?,?)';

const successFn = function () {
    console.log('Base de datos cerrada correctamente');
};

const errorFn = function (error) {
    console.log('Ocurrio un error: ' + error.message);
};

const errorTxFn = function (error) {
    console.log('Tansaccion error: ' + error.message);
};

const db = SQLite.openDatabase({
    name: 'mntoUnidades.db',
    createFromLocation: "~mntoUnidades.db",
    location: 'Library'
}, successFn, errorFn);

export function limpiaCatalogos() {
    db.transaction((tx) => {
        tx.executeSql('DELETE FROM ar_operador');
        tx.executeSql('DELETE FROM ar_unidades');
        tx.executeSql('DELETE FROM am_usuario');
        tx.executeSql('DELETE FROM ar_material_serv_refaccion');
        tx.executeSql('DELETE FROM ar_material_servicio');
        tx.executeSql('DELETE FROM ar_paquete_familia');
    }, errorTxFn);
    console.log('Limpieza finalizada.');
    return Respuesta.exito = true;
}

export function cargarCatalogos(catalogos) {
    db.transaction((tx) => {
        for (let catalogo in catalogos) {
            let entidad = catalogos[catalogo];
            switch (catalogo) {
                case "CAT_USUARIOS":
                    console.log("registro de usuarios");
                    for (let i in entidad) {
                        guardarRegistro(tx, 'am_usuario', entidad[i]);
                    }
                    break;
                case "CAT_PAQUETES":
                    console.log("registro de paquetes");
                    for (let i in entidad) {
                        guardarRegistro(tx, 'ar_paquete_familia', entidad[i]);
                    }
                    break;
                case "CAT_UNIDADES":
                    console.log("registro de unidades");
                    for (let i in entidad) {
                        guardarRegistro(tx, 'ar_unidades', entidad[i]);
                        let operador = entidad[i].operador;
                        if (operador.nombre !== null) {
                            operador.numPlaca = entidad[i].numPlaca;
                            operador.numEconomico = entidad[i].numEconomico;
                            guardarRegistro(tx, 'ar_operador', operador);
                        }
                    }
                    break;
                case "CAT_REFACCIONES":
                    console.log("registro de material de servicio");
                    for (let i in entidad) {
                        guardarRegistro(tx, 'ar_material_servicio', entidad[i]);
                        let refacciones = entidad[i].catRefacciones;
                        console.log("Numero de Refacciones " + refacciones.length);
                        if (refacciones.length > 0) {
                            for (let j in refacciones) {
                                refacciones[j].idMaterialServicio = entidad[i].idMaterialServicio;
                                guardarRegistro(tx, 'ar_material_serv_refaccion', refacciones[j]);
                            }
                        }
                    }
                    break;
            }
        }
    }, errorTxFn);
    return Respuesta.exito = true;
}

export function guardarRegistro(tx, table, obj) {
    switch (table) {
        case 'am_usuario':
            tx.executeSql(
                INSERT_USUARIO,
                [obj.username, obj.password, obj.enabled, obj.idEmpresa], (tx, res) => {
                },
                (tx, error) => {
                    console.log('INSERT error: ' + error.message);
                });
            break;
        case 'ar_paquete_familia':
            tx.executeSql(
                INSERT_PAQUETE,
                [obj.idPaqueteFamilia, obj.paquete, obj.familia, obj.grupoArticulo, obj.numServicio,
                    obj.cuentaContable], (tx, res) => {
                },
                (tx, error) => {
                    console.log('INSERT error: ' + error.message);
                });
            break;
        case 'ar_unidades':
            tx.executeSql(
                'INSERT INTO ar_unidades(num_placa, num_economico, equipo, clase_vehiculo, estatus_servicio, estatus, denominacion, fabricante, denominacion_tipo, fabricante_num_serie, num_inventario, centro_coste, orden_interna_combustible, clase_orden, area_funcional, paquete, grupo_articulo, cuenta_mantto, comentarios, kilometraje, fecha_prox_servicio, fecha_update) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [obj.numPlaca, obj.numEconomico, obj.equipo, obj.claseVehiculo, obj.estatusServicio, obj.estatus,
                    obj.denominacion, obj.fabricante, obj.denominacionTipo, obj.fabricanteNumSerie, obj.numInventario,
                    obj.centroCoste, obj.ordenInternaCombustible, obj.claseOrden, obj.areaFuncional, obj.paquete,
                    obj.grupoArticulo, obj.cuentaMantto, obj.comentarios, obj.kilometraje, obj.fechaUpdate,
                    obj.fechaProxServicio], (tx, res) => {
                },
                (tx, error) => {
                    console.log('INSERT error: ' + error.message);
                });
            break;
        case 'ar_operador':
            tx.executeSql(
                'INSERT INTO ar_operador(num_placa, num_economico, nombres, apellidos, num_empleado, telefono) VALUES (?,?,?,?,?,?)',
                [obj.numPlaca, obj.numEconomico, obj.nombres, obj.apellidos, obj.numEmpleado, obj.telefono], (tx, res) => {
                },
                (tx, error) => {
                    console.log('INSERT error: ' + error.message);
                });
            break;
        case 'ar_material_servicio':
            tx.executeSql(
                'INSERT INTO ar_material_servicio(id_material_servicio, clase_orden, nomenclatura, subtipo_servicio, tipo_servicio, id_empresa) VALUES (?,?,?,?,?,?)',
                [obj.idMaterialServicio, obj.claseOrden, obj.nomenclatura, obj.subtipoServicio, obj.tipoServicio, 0], (tx, res) => {
                },
                (tx, error) => {
                    console.log('INSERT error: ' + error.message);
                });
            break;
        case 'ar_material_serv_refaccion':
            tx.executeSql(
                'INSERT INTO ar_material_serv_refaccion(id_material_serv_refaccion, id_material_servicio, descripcion,marca_material,precio_unitario,unidad_medida,estatus,numero_existentes) VALUES (?,?,?,?,?,?,?,?)',
                [obj.idMaterialServRefaccion, obj.idMaterialServicio, obj.descripcion, obj.marcaMaterial, obj.precioUnitario, obj.unidadMedida, obj.estatus, obj.numeroExistentes], (tx, res) => {
                },
                (tx, error) => {
                    console.log('INSERT error: ' + error.message);
                });
            break;
        case 'ar_orden_trabajo':
            tx.executeSql('INSERT INTO ar_orden_trabajo(folio, ruta, kilometraje, tipo_servicio, num_placa, num_economico, fecha_update, fecha_entrada, fecha_inicio, fecha_fin, fecha_salida, hora_entrada, hora_salida, estatus_servicio, usuario_creacion, usuario_asignado, descripcion_problema, diagnostico_falla, detalle_reparacion, refacciones_usadas, sugerencia_prox_serv, observaciones, total_servicio, id_check_list, id_ubicacion_unidad) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [obj.folio, obj.ruta, obj.kilometraje, obj.tipoServicio, obj.numeroPlaca, obj.numeroEconomico, obj.fechaUpdate, obj.fechaEntrada, obj.fechaInicio, obj.fechaFin, obj.fechaSalida, obj.horaEntrada, obj.horaSalida, obj.estatusServicio, obj.usuarioCreacion, obj.usuarioAsignado, obj.problema, obj.falla, obj.reparacion, obj.refaccionesUsadas, obj.fechaProxServicio, obj.observaciones, obj.totalServicio, obj.idCheckList, obj.idUbicacionUnidad], (tx, res) => {
                    obj.idOrdenTrabajo = res.insertId;
                    console.log("IdOrdden: " + res.insertId);
                },
                (tx, error) => {
                    console.log('INSERT error: ' + error.message);
                });
            break;
        case 'ar_operador_orden_trabajo':
            tx.executeSql('INSERT INTO ar_operador_orden_trabajo(id_orden_trabajo,nombres, apellidos, num_empleado, telefono) VALUES(?,?,?,?,?)',
                [obj.idOrdenTrabajo, obj.nombres, obj.apellidos, obj.numeroEmpleado, obj.telefono], (tx, res) => {
                },
                (tx, error) => {
                    console.log('INSERT error: ' + error.message);
                });
            break;
        case 'ar_servicio_refacciones':
            tx.executeSql('INSERT INTO ar_servicio_refacciones(id_orden_trabajo, descripcion, total_mano_obra, total_refacciones) VALUES(?,?,?,?)',
                [obj.idOrdenTrabajo, obj.descripcion, obj.totalManoObra, obj.totalRefacciones], (tx, res) => {
                },
                (tx, error) => {
                    console.log('INSERT error: ' + error.message);
                });
            break;
        case 'ar_material_orden_trabajo':
            tx.executeSql('INSERT INTO ar_material_orden_trabajo(id_orden_trabajo, id_material_serv_refaccion, id_paquete_familia, concepto, servicio_material, precio_unitario_nvo, numero_utilizadas, subtotal_refacciones, existencia) VALUES(?,?,?,?,?,?,?,?,?)',
                [obj.idOrdenTrabajo, obj.idMaterialServicioRefaccion, obj.idPaqueteFamilia, obj.concepto, obj.idMaterialServicio, obj.precio, obj.cantidad, obj.subtotal, obj.existencia], (tx, res) => {
                },
                (tx, error) => {
                    console.log('INSERT error: ' + error.message);
                });
            break;
        case 'ar_imagenes':
            tx.executeSql('INSERT INTO ar_imagenes(id_orden_trabajo, uri, height, width, tipo_imagen) VALUES(?,?,?,?,?)',
                [obj.idOrdenTrabajo, obj.uri, obj.height, obj.width, obj.mime], (tx, res) => {
                },
                (tx, error) => {
                    console.log('INSERT error: ' + error.message);
                });
            break;
        case 'ar_ubicacion_unidades':
            tx.executeSql('INSERT INTO ar_ubicacion_unidad(fecha_reporte, hora_reporte, hora_salida, hora_arribo, uso_grua, uso_remplazo, fecha_termino, hora_termino, ciudad, estado, poblacion) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
                [obj.fechaReporte, obj.horaReporte, obj.horaSalida, obj.horaArribo, obj.grua,obj.remplazo,obj.fechaTermino,obj.horaTermino,obk.ciudad,obj.estado,obj.poblacion], (tx, res) => {
                },
                (tx, error) => {
                    console.log('INSERT error: ' + error.message);
                });
            break;
    }
}

export function validarAcceso(usuario, password) {

    db.transaction((tx) => {
        tx.executeSql('SELECT username,password FROM am_usuario WHERE username = ?', [usuario], (tx, results) => {
            let len = results.rows.length;
            if (len === 1) {
                let user = results.rows.item(0);
                Respuesta.exito = bcrypt.compareSync(password, user.password);
            } else {
                Respuesta.exito = false;
            }
        }, (tx, error) => {
            console.log('Query error: ' + error.message);
        });
    }, errorTxFn);

    return Respuesta;
}

export function obtenerUnidades(cadena) {
    unidades = [];
    db.transaction((tx) => {
        tx.executeSql(
            ' SELECT u.num_placa, ' +
            ' u.num_economico, ' +
            ' ifnull(cast(u.kilometraje AS TEXT),"") AS kilometraje, ' +
            ' u.denominacion_tipo, u.fabricante, ' +
            ' ifnull(o.nombres,"") AS nombres, ' +
            ' ifnull(o.apellidos,"") AS apellidos, ' +
            ' ifnull(cast(o.num_empleado AS TEXT),"") AS num_empleado, ' +
            ' ifnull(o.telefono,"") AS telefono ' +
            ' FROM ar_unidades u ' +
            ' LEFT JOIN ar_operador o ' +
            ' ON o.num_placa = u.num_placa ' +
            ' AND o.num_economico = u.num_economico ' +
            ' WHERE u.num_placa LIKE ?',
            ['%' + cadena + '%'], (tx, results) => {
                let len = results.rows.length;
                if (len > 0) {
                    console.log("Se encontraron " + len + " unidades.");
                    for (let i = 0; i < len; i++) {
                        let unidad = results.rows.item(i);
                        unidades.push(unidad);
                    }
                } else {
                    console.log("No se encontraron registros. ");
                }
            }, (tx, error) => {
                console.log('Query error: ' + error.message);
            });
    }, errorTxFn);
    return unidades;
}

export function obtenerServicios(cadena) {
    servicios = [];
    db.transaction((tx) => {
        tx.executeSql(
            ' SELECT id_material_servicio AS key, subtipo_servicio AS label FROM ar_material_servicio WHERE subtipo_servicio LIKE ?',
            ['%' + cadena + '%'], (tx, results) => {
                let len = results.rows.length;
                if (len > 0) {
                    console.log("Se encontraron " + len + " servicios.");
                    for (let i = 0; i < len; i++) {
                        let servicio = results.rows.item(i);
                        servicios.push(servicio);
                        //console.log("{" + servicio.key + "," + servicio.label + "}")
                    }
                } else {
                    console.log("No se encontraron registros. ");
                }
            }, (tx, error) => {
                console.log('Query error: ' + error.message);
            });
    }, errorTxFn);
    return servicios;
}

export function obtenerRefacciones(idServicio) {
    refacciones = [];
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT -1 AS key, 'Seleccione...' AS label, 0 AS precio, 0 AS existencia UNION SELECT id_material_serv_refaccion AS key, marca_material||' '||descripcion||' #('||numero_existentes||')'  AS label, precio_unitario AS precio, numero_existentes AS existencia FROM ar_material_serv_refaccion WHERE id_material_servicio = ?",
            [idServicio], (tx, results) => {
                let len = results.rows.length;
                if (len > 0) {
                    console.log("Se encontraron " + len + " refacciones.");
                    for (let i = 0; i < len; i++) {
                        let refaccion = {
                            key: results.rows.item(i).key,
                            label: results.rows.item(i).label,
                            precio: results.rows.item(i).precio,
                            existencia: results.rows.item(i).existencia
                        };
                        refacciones.push(refaccion);
                    }
                } else {
                    console.log("No se encontraron registros. ");
                }
            }, (tx, error) => {
                console.log('Query error: ' + error.message);
            });
    }, errorTxFn);
    return refacciones;
}

export function guarddarMntoCorrectivo(orden) {
    let totalRefacciones = 0;
    let totalManoObra = orden.observaciones.manoObra;
    let listArRefacciones = [];
    const {refacciones} = orden;
    let len = refacciones.length;
    if (len > 0) {
        let ar_material_orden_trabajo = null;
        console.log("Se encontraron " + len + " ordenes.");
        for (let i = 0; i < len; i++) {
            ar_material_orden_trabajo = {
                idOrdenTrabajo: orden.idOrdenTrabajo,
                idMaterialServicioRefaccion: refacciones[i].refaccion.key,
                idPaqueteFamilia: refacciones[i].paquete,
                concepto: refacciones[i].concepto,
                idMaterialServicio: refacciones[i].servicio,
                precio: refacciones[i].refaccion.precio,
                cantidad: refacciones[i].cantidad,
                subtotal: (Number(refacciones[i].refaccion.precio) * Number(refacciones[i].cantidad)),
                existencia: refacciones[i].refaccion.existencia
            };
            listArRefacciones.push(ar_material_orden_trabajo);
            let precio = Number(refacciones[i].refaccion.precio);
            totalRefacciones += (precio * refacciones[i].cantidad);
            console.log("Total = " + totalRefacciones)
        }
    }
    let ar_orden_trabajo = {
        idOrdenTrabajo: orden.idOrdenTrabajo,
        folio: null,
        ruta: orden.unidad.ruta,
        kilometraje: orden.unidad.kilometraje,
        tipoServicio: 'Correctivo',
        numeroPlaca: orden.unidad.placa,
        numeroEconomico: orden.unidad.economico,
        fechaUpdate: fechaString(new Date()),
        fechaEntrada: orden.unidad.fechaEntrada,
        fechaInicio: null,
        fechaFin: null,
        fechaSalida: null,
        horaEntrada: orden.unidad.horaEntrada,
        horaSalida: null,
        usuarioCreacion: orden.usuario,
        usuarioAsignado: orden.usuario,
        problema: orden.observaciones.problema,
        falla: null,
        reparacion: orden.observaciones.reparacion,
        refaccionesUsadas: null,
        fechaProxServicio: null,
        observaciones: orden.observaciones.observacion,
        totalServicio: (totalManoObra + totalRefacciones),
        estatusServicio: orden.estatus,
        idCheckList: null,
        idUbicacionUnidad: null
    };
    let ar_operador_orden_trabajo = {
        idOrdenTrabajo: orden.idOrdenTrabajo,
        nombres: orden.operador.nombres,
        apellidos: orden.operador.apellidos,
        numeroEmpleado: orden.operador.numEmpleado,
        telefono: orden.operador.telefono

    };
    let ar_servicio_refacciones = {
        idOrdenTrabajo: orden.idOrdenTrabajo,
        description: null,
        totalRefacciones: totalRefacciones,
        totalManoObra: totalManoObra
    };
    let listImagenes = this.imagenes;
    db.transaction((tx) => {
        if (!objetoValido(orden.idOrdenTrabajo)) {
            guardarRegistro(tx, 'ar_orden_trabajo', ar_orden_trabajo);
        } else {

        }
    }, errorTxFn);
    db.transaction((tx) => {
        console.log("Se guardo la orden de trabajo con id " + ar_orden_trabajo.idOrdenTrabajo);
        ar_operador_orden_trabajo.idOrdenTrabajo = ar_orden_trabajo.idOrdenTrabajo;
        guardarRegistro(tx, 'ar_operador_orden_trabajo', ar_operador_orden_trabajo);
        console.log("Se guardo el poerador para la orden con id " + ar_orden_trabajo.idOrdenTrabajo);
        guardarRegistro(tx, 'ar_servicio_refacciones', ar_servicio_refacciones);
        console.log("Se guardo el principal de las refacciones");
        let len = listArRefacciones.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                listArRefacciones[i].idOrdenTrabajo = ar_orden_trabajo.idOrdenTrabajo;
                guardarRegistro(tx, 'ar_material_orden_trabajo', listArRefacciones[i]);
                console.log("Guardando refaccion: " + (i + 1));
            }
        }
        let len2 = listImagenes.length;
        if (len2 > 0) {
            for (let i = 0; i < len2; i++) {
                listImagenes[i].idOrdenTrabajo = ar_orden_trabajo.idOrdenTrabajo;
                guardarRegistro(tx, 'ar_imagenes', listImagenes[i]);
                console.log("Guardando refaccion: " + (i + 1));
            }
        }
    }, errorTxFn);

}

export function guarddarMntoPreventivo(orden) {
    let totalRefacciones = 0;
    let totalManoObra = 0;
    let listArRefacciones = [];
    const {refacciones} = orden;
    let len = refacciones.length;
    if (len > 0) {
        let ar_material_orden_trabajo = null;
        console.log("Se encontraron " + len + " ordenes.");
        for (let i = 0; i < len; i++) {
            ar_material_orden_trabajo = {
                idOrdenTrabajo: orden.idOrdenTrabajo,
                idMaterialServicioRefaccion: refacciones[i].refaccion.key,
                idPaqueteFamilia: refacciones[i].paquete,
                concepto: refacciones[i].concepto,
                idMaterialServicio: refacciones[i].servicio,
                precio: refacciones[i].refaccion.precio,
                cantidad: refacciones[i].cantidad,
                subtotal: (Number(refacciones[i].refaccion.precio) * Number(refacciones[i].cantidad)),
                existencia: refacciones[i].refaccion.existencia
            };
            listArRefacciones.push(ar_material_orden_trabajo);
            let precio = Number(refacciones[i].refaccion.precio);
            totalRefacciones += (precio * refacciones[i].cantidad);
            console.log("Total = " + totalRefacciones)
        }
    }
    let ar_orden_trabajo = {
        idOrdenTrabajo: orden.idOrdenTrabajo,
        folio: null,
        ruta: orden.unidad.ruta,
        kilometraje: orden.unidad.kilometraje,
        tipoServicio: 'Preventivo',
        numeroPlaca: orden.unidad.placa,
        numeroEconomico: orden.unidad.economico,
        fechaUpdate: fechaString(new Date()),
        fechaEntrada: orden.unidad.fechaEntrada,
        fechaInicio: null,
        fechaFin: null,
        fechaSalida: null,
        horaEntrada: orden.unidad.horaEntrada,
        horaSalida: null,
        usuarioCreacion: orden.usuario,
        usuarioAsignado: orden.usuario,
        problema: orden.observaciones.problema,
        falla: orden.observaciones.falla,
        reparacion: null,
        refaccionesUsadas: null,
        fechaProxServicio: orden.servicio.proximo, //TODO Validar destino
        observaciones: orden.servicio.comentarios, //TODO Validar destino
        totalServicio: (totalManoObra + totalRefacciones),
        estatusServicio: orden.estatus,
        idCheckList: null,
        idUbicacionUnidad: null
    };
    let ar_operador_orden_trabajo = {
        idOrdenTrabajo: orden.idOrdenTrabajo,
        nombres: orden.operador.nombres,
        apellidos: orden.operador.apellidos,
        numeroEmpleado: orden.operador.numEmpleado,
        telefono: orden.operador.telefono

    };
    let ar_servicio_refacciones = {
        idOrdenTrabajo: orden.idOrdenTrabajo,
        description: null,
        totalRefacciones: totalRefacciones,
        totalManoObra: totalManoObra
    };
    let listImagenes = this.imagenes;
    db.transaction((tx) => {
        if (!objetoValido(orden.idOrdenTrabajo)) {
            guardarRegistro(tx, 'ar_orden_trabajo', ar_orden_trabajo);
        } else {

        }
    }, errorTxFn);
    db.transaction((tx) => {
        console.log("Se guardo la orden de trabajo con id " + ar_orden_trabajo.idOrdenTrabajo);
        ar_operador_orden_trabajo.idOrdenTrabajo = ar_orden_trabajo.idOrdenTrabajo;
        guardarRegistro(tx, 'ar_operador_orden_trabajo', ar_operador_orden_trabajo);
        console.log("Se guardo el poerador para la orden con id " + ar_orden_trabajo.idOrdenTrabajo);
        guardarRegistro(tx, 'ar_servicio_refacciones', ar_servicio_refacciones);
        console.log("Se guardo el principal de las refacciones");
        let len = listArRefacciones.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                listArRefacciones[i].idOrdenTrabajo = ar_orden_trabajo.idOrdenTrabajo;
                guardarRegistro(tx, 'ar_material_orden_trabajo', listArRefacciones[i]);
                console.log("Guardando refaccion: " + (i + 1));
            }
        }
        let len2 = listImagenes.length;
        if (len2 > 0) {
            for (let i = 0; i < len2; i++) {
                listImagenes[i].idOrdenTrabajo = ar_orden_trabajo.idOrdenTrabajo;
                guardarRegistro(tx, 'ar_imagenes', listImagenes[i]);
                console.log("Guardando refaccion: " + (i + 1));
            }
        }
    }, errorTxFn);

}

export function guarddarMntoRescate(orden) {
    let totalRefacciones = 0;
    let totalManoObra = 0;
    let listArRefacciones = [];
    const {refacciones} = orden;
    let len = refacciones.length;
    if (len > 0) {
        let ar_material_orden_trabajo = null;
        console.log("Se encontraron " + len + " ordenes.");
        for (let i = 0; i < len; i++) {
            ar_material_orden_trabajo = {
                idOrdenTrabajo: orden.idOrdenTrabajo,
                idMaterialServicioRefaccion: refacciones[i].refaccion.key,
                idPaqueteFamilia: refacciones[i].paquete,
                concepto: refacciones[i].concepto,
                idMaterialServicio: refacciones[i].servicio,
                precio: refacciones[i].refaccion.precio,
                cantidad: refacciones[i].cantidad,
                subtotal: (Number(refacciones[i].refaccion.precio) * Number(refacciones[i].cantidad)),
                existencia: refacciones[i].refaccion.existencia
            };
            listArRefacciones.push(ar_material_orden_trabajo);
            let precio = Number(refacciones[i].refaccion.precio);
            totalRefacciones += (precio * refacciones[i].cantidad);
            console.log("Total = " + totalRefacciones)
        }
    }
    let ar_orden_trabajo = {
        idOrdenTrabajo: orden.idOrdenTrabajo,
        folio: null,
        ruta: orden.unidad.ruta,
        kilometraje: orden.unidad.kilometraje,
        tipoServicio: 'Rescate',
        numeroPlaca: orden.unidad.placa,
        numeroEconomico: orden.unidad.economico,
        fechaUpdate: fechaString(new Date()),
        fechaEntrada: fechaString(new Date()),
        fechaInicio: null,
        fechaFin: null,
        fechaSalida: null,
        horaEntrada: null,
        horaSalida: null,
        usuarioCreacion: orden.usuario,
        usuarioAsignado: orden.usuario,
        problema: orden.observaciones.problema,
        falla: orden.observaciones.falla,
        reparacion: null,
        refaccionesUsadas: null,
        fechaProxServicio: null,
        observaciones: null,
        totalServicio: (totalManoObra + totalRefacciones),
        estatusServicio: orden.estatus,
        idCheckList: null,
        idUbicacionUnidad: null
    };
    let ar_operador_orden_trabajo = {
        idOrdenTrabajo: orden.idOrdenTrabajo,
        nombres: orden.operador.nombres,
        apellidos: orden.operador.apellidos,
        numeroEmpleado: orden.operador.numEmpleado,
        telefono: orden.operador.telefono

    };
    let ar_servicio_refacciones = {
        idOrdenTrabajo: orden.idOrdenTrabajo,
        description: null,
        totalRefacciones: totalRefacciones,
        totalManoObra: totalManoObra
    };
    let listImagenes = this.imagenes;
    let ar_ubicacion_unidad = {
        idUbicacionUnidad: null,
        fechaReporte: orden.registro.fechaReporte,
        horaReporte: orden.registro.horaReporte,
        horaSalida: orden.rescate.horaSalida,
        horaArribo: orden.rescate.horaArribo,
        usoGrua: orden.rescate.grua,
        usoRemplazo: orden.rescate.remplazo,
        fechaTermino: orden.ubicacion.fechaTermino,
        horaTermino: orden.ubicacion.horaTermino,
        ciudad: orden.ubicacion.ciudad,
        estado: orden.ubicacion.estado,
        poblacion: orden.ubicacion.poblacion
    };

    db.transaction((tx) => {
        if (!objetoValido(ar_ubicacion_unidad.idUbicacionUnidad)) {
            guardarRegistro(tx, 'ar_ubicacion_unidad', ar_ubicacion_unidad);
        } else {

        }
    }, errorTxFn);
    orden.idUbicacionUnidad = ar_ubicacion_unidad.idUbicacionUnidad;
    db.transaction((tx) => {
        if (!objetoValido(orden.idOrdenTrabajo)) {
            guardarRegistro(tx, 'ar_orden_trabajo', ar_orden_trabajo);
        } else {

        }
    }, errorTxFn);
    db.transaction((tx) => {
        console.log("Se guardo la orden de trabajo con id " + ar_orden_trabajo.idOrdenTrabajo);
        ar_operador_orden_trabajo.idOrdenTrabajo = ar_orden_trabajo.idOrdenTrabajo;
        guardarRegistro(tx, 'ar_operador_orden_trabajo', ar_operador_orden_trabajo);
        console.log("Se guardo el poerador para la orden con id " + ar_orden_trabajo.idOrdenTrabajo);
        guardarRegistro(tx, 'ar_servicio_refacciones', ar_servicio_refacciones);
        console.log("Se guardo el principal de las refacciones");
        let len = listArRefacciones.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                listArRefacciones[i].idOrdenTrabajo = ar_orden_trabajo.idOrdenTrabajo;
                guardarRegistro(tx, 'ar_material_orden_trabajo', listArRefacciones[i]);
                console.log("Guardando refaccion: " + (i + 1));
            }
        }
        let len2 = listImagenes.length;
        if (len2 > 0) {
            for (let i = 0; i < len2; i++) {
                listImagenes[i].idOrdenTrabajo = ar_orden_trabajo.idOrdenTrabajo;
                guardarRegistro(tx, 'ar_imagenes', listImagenes[i]);
                console.log("Guardando imagen: " + (i + 1));
            }
        }
    }, errorTxFn);

}

export function actualizarOrdenTrabajo(orden, firma) {
    let ar_imagen = {
        idOrdenTrabajo: orden.idOrdenTrabajo,
        uri: firma.pathName,
        width: 100,
        height: 100,
        mime: ''
    };
    db.transaction((tx) => {
        console.log(JSON.stringify(ar_imagen));
        guardarRegistro(tx, 'ar_imagenes', ar_imagen);
    }, errorTxFn);
    actualizarEstatusOrden(orden);
}

export function actualizarEstatusOrden(orden) {
    db.transaction((tx) => {
        tx.executeSql('UPDATE ar_orden_trabajo SET estatus_servicio = ? WHERE id_orden_trabajo = ?',
            [orden.estatus,orden.idOrdenTrabajo], (tx, res) => {
                obj.idOrdenTrabajo = res.insertId;
                console.log("IdOrdden: " + res.insertId);
            },
            (tx, error) => {
                console.log('INSERT error: ' + error.message);
            });
    }, errorTxFn);
}
export function eliminarOrden(orden) {

}

export function obtenerOrdenesByUser(usuario) {
    let ordenes = [];
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT o.id_orden_trabajo AS idOrdenTrabajo, o.num_economico AS numeroEconomico, o.estatus_servicio AS estatus, o.fecha_entrada fechaEntrada, o.usuario_asignado usuarioAsignado, o.tipo_servicio AS tipoServicio FROM ar_orden_trabajo AS o WHERE usuario_creacion = ?',
            [usuario], (tx, results) => {
                let len = results.rows.length;
                if (len > 0) {
                    console.log("Se encontraron " + len + " ordenes.");
                    for (let i = 0; i < len; i++) {
                        let orden = results.rows.item(i);
                        ordenes.push(orden);
                    }
                } else {
                    console.log("No se encontraron registros. ");
                }
            }, (tx, error) => {
                console.log('Query error: ' + error.message);
            });
    }, errorTxFn);
    return ordenes;
}

