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
const INSERT_USUARIO = 'INSERT INTO am_usuario(username,password,enabled,id_empresa,nombres,apellidos,correo) VALUES (?,?,?,?,?,?,?)';

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
    db.transaction((tx) => {
        tx.executeSql('VACUUM');
    });
    db.close(function () {
        console.log("DB closed!");
    }, function (error) {
        console.log("Error closing DB:" + error.message);
    });
    console.log('Limpieza finalizada.')
    return Respuesta.exito = true;
};

export function cargarCatalogos(catalogos,succesFn, errorFn) {

    for(var catalogo in catalogos){
        var entidad = catalogos[catalogo];
        switch (catalogo){
            case "CAT_USUARIOS":
                console.log("registro de usuario");
                for(let i in entidad){
                    guardarRegistro('am_usuario',entidad[i]);
                }
                break;
            case "CAT_PAQUETES":
                console.log("en paquete");
                break;
            case "CAT_UNIDADES":
                console.log("en unidad");
                break;
            case "CAT_REFACCIONES":
                console.log("en refaccion");
                break;
        }
    }
    return Respuesta.exito = true;
};

export function guardarRegistro(table,obj,succesFn, errorFn) {
    let db = SQLite.openDatabase({
        name: 'mntoUnidades.db',
        createFromLocation: "~mntoUnidades.db",
        location: 'Library'
    }, succesFn, errorFn);
    switch (table){
        case 'am_usuario':
            db.transaction((tx) => {
                tx.executeSql(
                    INSERT_USUARIO,
                    [obj.username,obj.password,obj.enabled,obj.idEmpresa,BLANCO,BLANCO,BLANCO]);
                console.log("usuario guardado");
            });
            break;
        case '':
            break;
    }
    db.close(function () {
        console.log("DB closed!");
    }, function (error) {
        console.log("Error closing DB:" + error.message);
    });
    return Respuesta.exito = true;
};

export function validarAcceso(usuario,password,succesFn, errorFn) {
    let db = SQLite.openDatabase({
        name: 'mntoUnidades.db',
        createFromLocation: "~mntoUnidades.db",
        location: 'Library'
    }, succesFn, errorFn);
    db.transaction((tx) => {
        tx.executeSql('SELECT password FROM am_usuario WHERE username = ?', [usuario], (tx, results) => {
            var len = results.rows.length;
            if(len==1){
                let hashPass = results.rows.item(0);
                Respuesta.exito = bcrypt.compareSync(password,hashPass);
            }else{
                Respuesta.exito = false;
            }
            for (let i = 0; i < len; i++) {

                console.log(`Record: ${row.username}`);
            }
        });
    });
    console.log("Verificacion de pass:"+Respuesta.exito);
    db.close(function () {
        console.log("DB closed!");
    }, function (error) {
        console.log("Error closing DB:" + error.message);
    });
    return Respuesta;
};