/**
 * Created by gibrann on 19/07/17.
 */
import React from 'react';
import {StackNavigator} from 'react-navigation';
import Rutas from '../navegacion/rutas';
import configPrincipal from './principlConfiguracion';

const principalNavigator = StackNavigator(Rutas,configPrincipal);

export default principalNavigator;
