/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
//import Example from './app/vistas/sideMenu'
import principalNavigator from './app/navegacion/principalNavigator';
AppRegistry.registerComponent('MantenimientoDeUnidades', () => principalNavigator);
