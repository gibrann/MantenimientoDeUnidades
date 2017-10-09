/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    AppRegistry
} from 'react-native';


export function cadenaValida(data) {
    if (data !== undefined && data !== null && data !== '')
        return true;
    return false;
};

export function objetoValido(data){
    if (data !== undefined && data !== null )
        return true;
    return false;
};

export function fechaString(fecha) {
    return fecha.ddmmyyyy('/');
}

Date.prototype.ddmmyyyy = function(separator) {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [(dd>9 ? '' : '0') + dd,separator,(mm>9 ? '' : '0') + mm,separator,this.getFullYear()].join('');
};