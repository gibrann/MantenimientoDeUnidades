import React from 'react';

const Login = require('../vistas/loginView');
const Master = require('../vistas/masterView');
const Catalogos = require('../vistas/catalogosView');
const SinOrdenes = require('../vistas/sincOrdenesView');
const ObtenerCatalogos = require('../vistas/obtenerCatalogosView');

const Rutas = {
    Login: {screen: Login, navigationOptions: {title: 'Acceso'}},
    Catlogos: {screen: Catalogos, navigationOptions: {title: 'Sincronizar Catalogos'}},
    SincOrdenes: {screen: SinOrdenes, navigationOptions: {title: 'Sincronizar Ordenes'}},
    Master: {screen: Master, navigationOptions: {title: 'Registrar Ordenes'}},
    ObtenerCatalogos: {
        screen: ObtenerCatalogos,
        navigationOptions: {title: 'Obtener Catalogos'}
    },
};

export default Rutas;