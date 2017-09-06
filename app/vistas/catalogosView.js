import React, {Component} from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    Alert,
    Image,
    TextInput,
    Picker,
    Item
} from 'react-native';
import styles from '../estilos/estilos';
import {NavigationActions} from 'react-navigation';

export class catalogosView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "1",
            options: {"1": "Empresa 1", "2": "Empresa 2"},
        }
    }

    render() {
        return (
            <Image style={styles.contenedorPrincipal} source={require('../imagenes/mantocor2.jpg')}>
                <View>
                    <View style={styles.cajaLogin}>
                        <Image source={require('../imagenes/final.png')} style={styles.banner}/>
                        <Text style={styles.tituloLogin}>SINCRONINZACION DE CATALOGOS</Text>
                        <Picker
                            style={styles.input}
                            mode="dropdown"
                            selectedValue={this.state.selected}
                            onValueChange={(itemValue, itemIndex) => {
                                console.log("empresa: " + itemValue);
                                console.log("index: " + itemIndex);
                                this.setState({selected: itemValue});
                            }}>
                            {Object.keys(this.state.options).map((key) => {
                                return (
                                    <Picker.Item label={this.state.options[key]} value={key} key={key}/>
                                )
                            })}
                        </Picker>
                        <TouchableHighlight onPress={this.onSync.bind(this)} style={styles.boton}>
                            <Text style={styles.textoBoton}>Sincronizar</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.onSyncOrd.bind(this)} style={styles.botonAlt}>
                            <Text style={styles.textoBoton}>Syncronizar Ordenes</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.onBack.bind(this)} style={styles.botonRed}>
                            <Text style={styles.textoBoton}>Regresar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Image>
        );
    };

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

    onSyncOrd() {
        this.props.navigation.navigate('SincOrdenes');
    };

    onBack() {
        this.props.navigation.navigate('Login');
    };

    aceptar() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'ObtenerCatalogos', params: {empresa:this.state.selected}})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };

    cancelar() {

    };
};

module.exports = catalogosView;
