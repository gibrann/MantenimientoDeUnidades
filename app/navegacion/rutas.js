import React from 'react';
const Login = require('../vistas/loginView');
const Dashboard = require('../vistas/dashboardView');
const Catalogos = require('../vistas/catalogosView');
const SinOrdenes = require('../vistas/sincOrdenesView');
const Ordenes = require('../vistas/ordenesView');

const Rutas =  {
    Login: {screen: Login, navigationOptions:{title:'Acceso'}},
    Catlogos: {screen:Catalogos,navigationOptions:{title:'Sincronizar Catalogos'}},
    SincOrdenes: {screen:SinOrdenes,navigationOptions:{title:'Sincronizar Ordenes'}},
    Dashboard: {screen: Dashboard }
};

export default Rutas;