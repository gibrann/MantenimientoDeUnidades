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

export class catalogosView extends Component {
    render() {
        return (
            <Image style={styles.contenedorPrincipal} source={require('../imagenes/mantocor2.jpg')}>
                <View>
                    <View style={styles.cajaLogin}>
                        <Image source={require('../imagenes/final.png')} style={styles.banner}/>
                        <Text style={styles.tituloLogin}>SINCRONINZACION DE CATALOGOS</Text>
                        <TextInput style={styles.input} placeholder='Empresa...' underlineColorAndroid='transparent'/>
                        <TextInput style={styles.input} placeholder='Clave...' underlineColorAndroid='transparent'
                                   secureTextEntry={true}/>
                        <TouchableHighlight onPress={this.onSync.bind(this)} style={styles.boton}>
                            <Text style={styles.textoBoton}>Sincronizar</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.onBack.bind(this)} style={styles.botonRed}>
                            <Text style={styles.textoBoton}>Regresar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Image>
        );
    }

    onSync() {
        Alert.alert(
            'Sincronizacion',
            'Comenzara el proceso de sincronizacion de catalogos.',
            [
                {
                    text: 'Aceptar',
                    onPress: (this.aceptar.bind(this))
                },
                {
                    text: 'Cancelar',
                    onPress: (this.cancelar.bind(this))
                }
            ]
        )
    };
    onBack(){
        this.props.navigation.navigate('Login');
    };

    aceptar() {

    };

    cancelar() {

    };
};

module.exports = catalogosView;
