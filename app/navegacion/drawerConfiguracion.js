import React from 'react';
import { ScrollView } from 'react-native';
import { DrawerItems } from 'react-navigation';

const Login = require('../vistas/loginView');
const Dashboard = require('../vistas/dashboardView');

const configuracionDrawer = {
    drawerWidth: 200,
    contentComponent: props =>
        <ScrollView>
            <DrawerItems  />
        </ScrollView>
};

export default configuracionDrawer;