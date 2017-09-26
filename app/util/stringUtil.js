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
