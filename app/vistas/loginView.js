import React, {Component} from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    Alert,
    Image,
    TextInput
} from 'react-native';
import {NavigationActions} from 'react-navigation'
import styles from '../estilos/estilos';
import {validarAcceso} from '../repositorios/generalRepository';

export class loginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLLogged: null,
            username: null,
            password: null,
        }
    };

    onLogin() {
        if (this.state.username === null || this.state.password === null) {
            Alert.alert(
                'Acceso',
                'Los datos ingresados son invalidos verifiquelos una vez más.',
                [
                    {
                        text: 'Aceptar',
                    }
                ]
            );
        } else {
            console.log(this.state.username + ' ' + this.state.password);
            let resultado = validarAcceso(this.state.username, this.state.password);
            console.log("resultado: "+ resultado)
            if (resultado !== null && resultado !== undefined && resultado.exito) {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Master'})
                    ]
                });
                this.props.navigation.dispatch(resetAction);
            } else {
                Alert.alert(
                    'Acceso',
                    'Los datos ingresados son invalidos verifiquelos una vez más.',
                    [
                        {
                            text: 'Aceptar',
                        }
                    ]
                );
            }
        }
    };

    onSyncCat() {
        this.props.navigation.navigate('Catlogos');
    }

    onSyncOrd() {
        this.props.navigation.navigate('SincOrdenes');
    }


    render() {
        if (this.state.isLLogged === null) {
            return (
                <Image style={styles.contenedorPrincipal} source={require('../imagenes/mantocor2.jpg')}>
                    <View>
                        <View style={styles.cajaLogin}>
                            <Image source={require('../imagenes/final.png')} style={styles.banner}/>
                            <Text style={styles.tituloLogin}>MANTENIMIENTO DE UNIDADES 1.1</Text>
                            <TextInput style={styles.input} placeholder='Usuario...' underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.setState({username: text})}/>
                            <TextInput style={styles.input} placeholder='Password...'
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this.setState({password: text})}
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
        } else {
            return (
                <Image style={styles.contenedorPrincipal} source={require('../imagenes/mantocor2.jpg')}>
                    <View>
                        <View style={styles.cajaLogin}>
                            <Image source={require('../imagenes/final.png')} style={styles.banner}/>
                            <Text style={styles.tituloLogin}>MANTENIMIENTO DE UNIDADES 1.1</Text>
                            <Text style={styles.input}>Usuario:{this.state.username}</Text>
                            <Text style={styles.input} placeholder='Password...' underlineColorAndroid='transparent'
                                  secureTextEntry={true}/>
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
    }


};

module.exports = loginView;
