import React, {Component} from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    Alert,
    Image,
    TextInput
} from 'react-native';
import styles from '../estilos/estilos';

export class loginView extends Component {
    render() {
        return (
            <Image style={styles.contenedorPrincipal} source={require('../imagenes/mantocor2.jpg')}>
                <View>
                    <View style={styles.cajaLogin}>
                        <Image source={require('../imagenes/final.png')} style={styles.banner}/>
                        <Text style={styles.tituloLogin}>MANTENIMIENTO DE UNIDADES 1.1</Text>
                        <TextInput style={styles.input} placeholder='Usuario...' underlineColorAndroid='transparent'/>
                        <TextInput style={styles.input} placeholder='Password...' underlineColorAndroid='transparent'
                                   secureTextEntry={true}/>
                        <TouchableHighlight onPress={this.onLogin.bind(this)} style={styles.boton}>
                            <Text style={styles.textoBoton}>Entrar</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.onSyncCat.bind(this)} style={styles.botonAlt}>
                            <Text style={styles.textoBoton}>Sincronizar Catalogos</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.onSyncOrd.bind(this)} style={styles.botonAlt}>
                            <Text style={styles.textoBoton}>Syncronizar Ordenes</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Image>
        );
    }

    onLogin() {
        this.props.navigation.navigate('Dashboard');
    }
    onSyncCat(){
        this.props.navigation.navigate('Catlogos');
    }
    onSyncOrd(){
        this.props.navigation.navigate('SincOrdenes');
    }
};

module.exports = loginView;
