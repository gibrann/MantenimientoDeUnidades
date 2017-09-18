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

var SQLite = require('react-native-sqlite-storage');
var Respuesta = {data: null, mensaje: '', exito: false};
var unidades = [];
var familias = [];
var servicios = [];
var refacciones = [];

const INSERT_USUARIO = 'INSERT INTO am_usuario(username,password,enabled,id_empresa) VALUES (?,?,?,?)';
const INSERT_PAQUETE = 'INSERT INTO ar_paquete_familia VALUES (?,?,?,?,?,?)';

const successFn = function () {
    //db.close(function () {
    console.log('Base de datos cerrada correctamente');
    //});
};

const errorFn = function (error) {
    //db.close(function () {
    console.log('Ocurrio un error: ' + error.message);
    //console.log('Base de datos cerrada.');
    //});
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
};

export function cargarCatalogos(catalogos) {

    db.transaction((tx) => {
        for (var catalogo in catalogos) {
            var entidad = catalogos[catalogo];
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
                        var operador = entidad[i].operador;
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
                        var refacciones = entidad[i].catRefacciones;
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
};

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
    }
    return Respuesta.exito = true;
};

export function validarAcceso(usuario, password) {

    db.transaction((tx) => {
        tx.executeSql('SELECT username,password FROM am_usuario WHERE username = ?', [usuario], (tx, results) => {
            var len = results.rows.length;
            if (len == 1) {
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
};

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
                var len = results.rows.length;
                if (len > 0) {
                    console.log("Se encontraron " + len + " unidades.");
                    for (var i = 0; i < len; i++) {
                        var unidad = results.rows.item(i);
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
};

export function obtenerServicios(cadena) {
    servicios = [];
    db.transaction((tx) => {
        tx.executeSql(
            ' SELECT id_material_servicio AS key, subtipo_servicio AS label FROM ar_material_servicio WHERE subtipo_servicio LIKE ?',
            ['%' + cadena + '%'], (tx, results) => {
                var len = results.rows.length;
                if (len > 0) {
                    console.log("Se encontraron " + len + " servicios.");
                    for (var i = 0; i < len; i++) {
                        var servicio = results.rows.item(i);
                        servicios.push(servicio);
                        console.log("{"+servicio.key+","+servicio.label+"}")
                    }
                } else {
                    console.log("No se encontraron registros. ");
                }
            }, (tx, error) => {
                console.log('Query error: ' + error.message);
            });
    }, errorTxFn);
    return servicios;
};

export function obtenerRefacciones(idServio) {
    refacciones = [];
    db.transaction((tx) => {
        tx.executeSql(
            ' SELECT -1 AS key, "Seleccione..." AS label UNION SELECT id_material_serv_refaccion AS key, marca_material||" "||descripcion||" #("||numero_existentes||")"  AS label FROM ar_material_serv_refaccion WHERE id_material_servicio = ?',
            [idServio], (tx, results) => {
                var len = results.rows.length;
                if (len > 0) {
                    console.log("Se encontraron " + len + " refacciones.");
                    for (var i = 0; i < len; i++) {
                        var refaccion = results.rows.item(i);
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
};