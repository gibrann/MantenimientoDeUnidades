import React, {
    Component,
} from 'react';
import {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Alert
} from 'react-native';
import styles from '../estilos/estilos';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {obtenerOrdenesByUser, eliminarOrden, actualizarOrdenTrabajo} from '../repositorios/generalRepository';
import SignatureCapture from 'react-native-signature-capture';
import Modal from 'react-native-modal';

class bandejaOrdenesView extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            listOrdenes: [],
            username: props.username,
            basic: true,
            visibleSignature: false,
            currentOrden: null,
            firmaValida: false,
            firma: null,
        };
    }

    deleteRow(secId, rowId, rowMap) {
        eliminarOrden(this.state.currentOrden);
        rowMap[`${secId}${rowId}`].closeRow();
        const newData = [...this.state.listOrdenes];
        newData.splice(rowId, 1);
        this.setState({listOrdenes: newData});
    }

    editRow(data) {

    }

    finalizaRow() {
        this.setState({visibleSignature: true});
    }

    procesaRow() {
        this.setState({visibleSignature: true});
    }

    componentDidMount() {
        let _ordenes = [];
        _ordenes = obtenerOrdenesByUser(this.state.username);
        let _this = this;
        setTimeout(function () {
            _this.setState({listOrdenes: _ordenes});
        }, 800);
    }

    obtenerOperacion(orden) {
        let operacion = null;
        switch (orden.estatus) {
            case 'Registrado':
                operacion = (
                    <TouchableOpacity style={[styles.leftBtn, styles.procesaLeftBtn]}
                                      onPress={() => {
                                          this.setState({currentOrden: orden, firma: null});
                                          this.procesaRow();
                                      }}>
                        <Text style={styles.backTextWhite}>Procesar</Text>
                    </TouchableOpacity>
                );
                break;
            case 'Procesado':
                operacion = (
                    <TouchableOpacity style={[styles.backRightBtn, styles.finalizaLeftBtn]}
                                      onPress={() => {
                                          this.setState({currentOrden: orden, firma: null});
                                          this.finalizaRow();
                                      }}>
                        <Text style={styles.backTextWhite}>Finalizar</Text>
                    </TouchableOpacity>
                );
                break;
            case 'Finalizado':
                operacion = null;
                break;
        }
        return operacion
    }

    saveSign() {
        if (this.state.firmaValida) {
            this.refs["sign"].saveImage();
            this.setState({visibleSignature: false});
        } else {
            Alert.alert(
                'Error',
                "Ingrese una firma para continuar",
                [
                    {
                        text: 'Aceptar',
                    }
                ]
            );
        }
    }

    resetSign() {
        this.setState({firmaValida: false});
        this.refs["sign"].resetImage();
    }

    actualizaOrden(firma) {
        let _ordenes = [];
        let {currentOrden} = this.state;
        switch (currentOrden.estatus) {
            case 'Registrado':
                currentOrden.estatus = 'Procesado';
                break;
            case 'Procesado':
                currentOrden.estatus = 'Finalizado';
                break;
        }
        actualizarOrdenTrabajo(currentOrden, firma);
        _ordenes = obtenerOrdenesByUser(this.state.username);
        let _this = this;
        setTimeout(function () {
            _this.setState({listOrdenes: _ordenes});
        }, 800);
    }


    render() {
        return (
            <View style={styles.container}>
                <SwipeListView
                    enableEmptySections={true}
                    dataSource={this.ds.cloneWithRows(this.state.listOrdenes)}
                    renderRow={(data, secId, rowId, rowMap) => (
                        <SwipeRow
                            disableRightSwipe={(data.estatus === "Finalizado")}
                            disableLeftSwipe={(data.estatus === "Finalizado")}
                            leftOpenValue={20 + Math.random() * 150}
                            rightOpenValue={-150}
                        >
                            <View style={styles.rowBack}>
                                {this.obtenerOperacion(data)}
                                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                                  onPress={_ => this.editRow.bind(data)}>
                                    <Text style={styles.backTextWhite}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}
                                                  onPress={(secId, rowId, rowMap) => {
                                                      this.setState({currentOrden: data});
                                                      this.deleteRow.bind(secId, rowId, rowMap)
                                                  }}>
                                    <Text style={styles.backTextWhite}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableHighlight
                                onPress={_ => console.log('You touched me')}
                                style={styles.rowFront}
                                underlayColor={'#AAA'}
                            >
                                <View>
                                    <Text>Numero Económico: {data.numeroEconomico}</Text>
                                    <Text>Tipo Servicio: {data.tipoServicio}</Text>
                                    <Text>Estatus: {data.estatus} Fecha Entrada: {data.fechaEntrada} </Text>
                                    <Text>Usuario Asignado: {data.usuarioAsignado}</Text>
                                </View>
                            </TouchableHighlight>
                        </SwipeRow>
                    )}
                />
                <Modal
                    isVisible={this.state.visibleSignature}
                    animationIn={'zoomInDown'}
                    animationOut={'zoomOutUp'}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    onRequestClose={() => {
                    }}
                >
                    <View style={styles.modalSignature}>
                        <View style={styles.viewSignature}>
                            <Text style={{alignItems: "center", justifyContent: "center"}}>Capture su firma</Text>
                            <SignatureCapture
                                style={[{flex: 1}, styles.signature]}
                                ref="sign"
                                onSaveEvent={(result) => {
                                    this.actualizaOrden(result);
                                }}
                                onDragEvent={() => {
                                    this.setState({firmaValida: true})
                                }}
                                saveImageFileInExtStorage={true}
                                showNativeButtons={false}
                                showTitleLabel={false}/>
                        </View>
                        <View style={{flex: 1, flexDirection: "row"}}>
                            <TouchableHighlight style={styles.buttonStyle}
                                                onPress={() => {
                                                    this.saveSign();
                                                }}>
                                <Text>Terminar</Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={styles.buttonStyle}
                                                onPress={() => {
                                                    this.resetSign()
                                                }}>
                                <Text>Reset</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

module.exports = bandejaOrdenesView;