import React from 'react';
import {DrawerNavigator} from 'react-navigation';
import Rutas from '../navegacion/rutas';
import configPrincipal from './principlConfiguracion';

const drawerNavigator = DrawerNavigator(Rutas,configPrincipal);

export default drawerNavigator;