/**
 * Created by gibrann on 16/07/17.
 */

import React, {Component} from 'react';
import {
    ActivityIndicator,
    ListView,
    Text,
    View,
    TouchableHighlight,
    Alert,
    Image,
    NetInfo
} from 'react-native'

var Spinner = require('react-native-spinkit');
import {NavigationActions} from 'react-navigation';
import {limpiaCatalogos, cargarCatalogos} from '../repositorios/generalRepository'
import styles from '../estilos/estilos';

export class ObtenerCatalogosView extends Component {

    constructor(props) {
        super(props)
        console.log("Empresa  " + this.props.navigation.state.params.empresa);
        this.state = {
            empresa: this.props.navigation.state.params.empresa,
            isConnected: false,
            loaded: true,
            dataSource: null
        }
    };

    render() {
        return (
            <Image style={styles.contenedorPrincipal} source={require('../imagenes/mantocor2.jpg')}>
                <View>
                    <View style={styles.cajaLogin}>
                        <Image source={require('../imagenes/final.png')} style={styles.banner}/>
                        <Text style={styles.tituloLogin}>SINCRONINZACION DE CATALOGOS</Text>
                        <Spinner style={styles.spinner} isVisible={this.state.loaded} size={50} type={'WanderingCubes'}
                                 color={'white'}/>
                        {this.renderLoadingView()}
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


    onSyncOrd() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'SincOrdenes'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };

    onBack() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Login'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };

    fetchCatalogos() {

        fetch(
            "http://93.188.165.133:8080/manttoUnidades/SAFRest/services/getCatalogos", {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json',},
                body: JSON.stringify({"idEmpresa": this.state.empresa})
            })
            .then((response) => response.json())
            .then((responseJson) => {
                var keys = [];
                for (var k in responseJson) {
                    keys.push(k);
                }
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataSource: ds.cloneWithRows(keys),
                    loaded: false,
                }, function () {
                    limpiaCatalogos();
                    cargarCatalogos(responseJson);
                    Alert.alert(
                        'Exito!!!',
                        'La base de datos ha sido actualizada.',
                        [
                            {
                                text: 'Aceptar',
                            }
                        ]
                    )
                });
            }).catch((error) => {
            console.error(error);
        });

    };

    componentDidMount() {
        NetInfo.isConnected.fetch().done(
            (isConnected) => {
                console.log("Estado de conexion a internet " + isConnected);
                this.setState({isConnected: isConnected});
                if (isConnected) {
                    this.fetchCatalogos();
                } else {
                    Alert.alert(
                        'Error de conexion!!!',
                        'Verifique su conexion a internet e intente nuevamente',
                        [
                            {
                                text: 'Aceptar',
                                onPress: (this.onBack.bind(this)),
                            }
                        ]
                    )
                }
            }
        );
    };

    renderLoadingView() {
        if(this.state.dataSource!==null)
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderCatalogos}
                style={styles.listView}
            />
        );
    };

    renderCatalogos(catalogo) {
        catalogo = catalogo.replace("CAT_", "");
        return (
            <View>
                <Text style={styles.textoInfoBox}>{catalogo}</Text>
            </View>
        );
    };
};

module.exports = ObtenerCatalogosView;