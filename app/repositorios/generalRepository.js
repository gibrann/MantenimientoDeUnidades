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

const BLANCO = "";
const INSERT_USUARIO = 'INSERT INTO am_usuario(username,password,enabled,id_empresa,) VALUES (?,?,?,?,)';
const INSERT_PAQUETE = 'INSERT INTO ar_paquete_familia VALUES (?,?,?,?,?,?)';
const INSERT_UNIDAD = 'INSERT INTO ar_unidades(num_placa, num_economico, equipo, clase_vehiculo, estatus_servicio, estatus, denominacion, fabricante, denominacion_tipo, fabricante_num_serie, num_inventario, centro_coste, orden_interna_combustible, clase_orden, area_funcional, paquete, grupo_articulo, cuenta_mantto, comentarios, kilometraje, fechaProxServicio, fecha_prox_servicio) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

export function limpiaCatalogos(succesFn, errorFn) {
    let db = SQLite.openDatabase({
        name: 'mntoUnidades.db',
        createFromLocation: "~mntoUnidades.db",
        location: 'Library'
    }, succesFn, errorFn);
    db.transaction((tx) => {
        tx.executeSql('DELETE FROM ar_operador');
    });
    db.transaction((tx) => {
        tx.executeSql('DELETE FROM ar_unidades');
    });
    db.transaction((tx) => {
        tx.executeSql('DELETE FROM am_usuario');
    });
    db.transaction((tx) => {
        tx.executeSql('DELETE FROM ar_material_serv_refaccion');
    });
    db.transaction((tx) => {
        tx.executeSql('DELETE FROM ar_material_servicio');
    });
    db.transaction((tx) => {
        tx.executeSql('DELETE FROM ar_paquete_familia');
    });
    db.close(function () {
        console.log("DB closed!");
    }, function (error) {
        console.log("Error closing DB:" + error.message);
    });
    console.log('Limpieza finalizada.');
    return Respuesta.exito = true;
};

export function cargarCatalogos(catalogos, succesFn, errorFn) {
    let db = SQLite.openDatabase({
        name: 'mntoUnidades.db',
        createFromLocation: "~mntoUnidades.db",
        location: 'Library'
    }, succesFn, errorFn);
    for (var catalogo in catalogos) {
        var entidad = catalogos[catalogo];
        switch (catalogo) {
            case "CAT_USUARIOS":
                console.log("registro de usuarios");
                for (let i in entidad) {
                    guardarRegistro(db, 'am_usuario', entidad[i]);
                }
                break;
            case "CAT_PAQUETES":
                console.log("registro de paquetes");
                for (let i in entidad) {
                    guardarRegistro(db, 'ar_paquete_familia', entidad[i]);
                }
                break;
            case "CAT_UNIDADES":
                console.log("registro de unidades");
                for (let i in entidad) {
                    guardarRegistro(db, 'ar_unidades', entidad[i]);
                    var operador = entidad[i].operador;
                    if (operador.nombre !== null) {
                        operador.numPlaca = entidad[i].numPlaca;
                        operador.numEconomico = entidad[i].numEconomico;
                        guardarRegistro(db, 'ar_operador', operador);
                    }
                }
                break;
            case "CAT_REFACCIONES":
                console.log("registro de material de servicio");
                for (let i in entidad) {
                    guardarRegistro(db, 'ar_material_servicio', entidad[i]);
                    var refacciones = entidad[i].catRefacciones;
                    console.log("Numero de Refacciones " + refacciones.length);
                    if (refacciones.length > 0) {
                        for (let j in refacciones) {
                            refacciones[j].idMaterialServicio = entidad[i].idMaterialServicio;
                            guardarRegistro(db, 'ar_material_serv_refaccion', refacciones[j]);
                        }
                    }
                }
                break;
        }
    }
    db.close(function () {
        console.log("DB closed!");
    }, function (error) {
        console.log("Error closing DB:" + error.message);
    });
    return Respuesta.exito = true;
};

export function guardarRegistro(db, table, obj, succesFn, errorFn) {

    switch (table) {
        case 'am_usuario':
            db.transaction((tx) => {
                tx.executeSql(
                    INSERT_USUARIO,
                    [obj.username, obj.password, obj.enabled, obj.idEmpresa]);
                console.log("usuario guardado");
            });
            break;
        case 'ar_paquete_familia':
            db.transaction((tx) => {
                tx.executeSql(
                    INSERT_PAQUETE,
                    [obj.idPaqueteFamilia, obj.paquete, obj.familia, obj.grupoArticulo, obj.numServicio,
                        obj.cuentaContable]);
                console.log("usuario guardado");
            });
            break;
        case 'ar_unidades':
            db.transaction((tx) => {
                tx.executeSql(
                    INSERT_UNIDAD,
                    [obj.numPlaca, obj.numEconomico, obj.equipo, obj.claseVehiculo, obj.estatusServicio, obj.estatus,
                        obj.denominacion, obj.fabricante, obj.denominacionTipo, obj.fabricanteNumSerie, obj.numInventario,
                        obj.centroCoste, obj.ordenInternaCombustible, obj.claseOrden, obj.areaFuncional, obj.paquete,
                        obj.grupoArticulo, obj.cuentaMantto, obj.comentarios, obj.kilometraje, obj.fechaUpdate,
                        obj.fechaProxServicio]);
                console.log("usuario guardado");
            });
            break;
        case 'ar_operador':
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO ar_operador(num_placa, num_economico, nombres, apellidos, num_empleado, telefono) VALUES (?,?,?,?,?,?)',
                    [obj.numPlaca, obj.numEconomico, obj.nombres, obj.apellidos, obj.numEmpleado, obj.telefono]);
                console.log("usuario guardado");
            });
            break;
        case 'ar_material_servicio':
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO ar_material_servicio(id_material_servicio, clase_orden, nomenclatura, subtipo_servicio, tipo_servicio, id_empresa) VALUES (?,?,?,?,?,?)',
                    [obj.idMaterialServicio, obj.claseOrden, obj.nomenclatura, obj.subtipoServicio, obj.tipoServicio, 0]);
                console.log("usuario guardado");
            });
            break;
        case 'ar_material_serv_refaccion':
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO ar_material_serv_refaccion(id_material_serv_refaccion, id_material_servicio, descripcion,marca_material,precio_unitario,unidad_medida,estatus,numero_existentes) VALUES (?,?,?,?,?,?,?,?,?)',
                    [obj.idMaterialServRefaccion, obj.idMaterialServicio, obj.descripcion, obj.marcaMaterial, obj.precioUnitario, obj.unidadMedida, obj.estatus, obj.numeroExistentes]);
                console.log("usuario guardado");
            });
            break;
    }
    return Respuesta.exito = true;
};

export function validarAcceso(usuario, password, succesFn, errorFn) {
    let db = SQLite.openDatabase({
        name: 'mntoUnidades.db',
        createFromLocation: "~mntoUnidades.db",
        location: 'Library'
    }, succesFn, errorFn);
    db.transaction((tx) => {
        tx.executeSql('SELECT username,password FROM am_usuario WHERE username = ?', [usuario], (tx, results) => {
            var len = results.rows.length;
            if (len == 1) {
                let user = results.rows.item(0);
                Respuesta.exito = bcrypt.compareSync(password, user.password);
                console.log("Respuesta de pass:" + Respuesta.exito);
                console.log(`Record: ${user.username}`);
                console.log(`Record: ${user.password}`);
            } else {
                Respuesta.exito = false;
            }
        });
    });
    db.close(function () {
        console.log("DB closed!");
    }, function (error) {
        console.log("Error closing DB:" + error.message);
    });
    return Respuesta;
};