import React, {Component} from 'react';
import {
    TouchableHighlight,
    TouchableOpacity,
    View,
    Alert,
    Image,
    TextInput,
    ScrollView,
    Picker
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Footer,
    FooterTab,
    Button,
    Icon,
    Text,
    CardItem,
    Form,
    Item,
    Label,
    Input,
    Left,
    Body,
    Title,
    Right,
    SwipeRow,
    Separator,
} from 'native-base';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import styles from '../estilos/estilos';
import {obtenerServicios, obtenerRefacciones} from '../repositorios/generalRepository';
import {cadenaValida} from '../util/stringUtil'

export class refaccionesView extends Component {
    constructor(props) {
        super(props);
        let refaccion = null;
        let _refacciones = [{key: -1, label: 'Seleccione...'}];
        let _familias = obtenerServicios('');
        this.state = {
            conceptos: {"MTTO TOT": "MTTO TOT", "Mano de Obra": "Mano de Obra"},
            servicios: {"Servicio": "Servicio", "Material": "Material"},
            paquetes: {
                "Transport": "Transport",
                "Leases / Fuerza de ventanas": "Leases / Fuerza de ventanas",
                "Leases / Rentals": "Leases / Rentals",
                "Logistics Support": "Logistics Support",
                "Utilities": "Utilities"
            },
            familias: _familias,
            refacciones: _refacciones,
            selectedConcepto: "MTTO TOT",
            selectedServicios: "Servicio",
            selectedPaquete: "Transport",
            selectedFamilia: null,
            selectedRefaccion: 'Seleccione...',
            visibleFamilia: false,
            pickedFamilia: null,
            pickedText: '',
            refaccion: {concepto: '', servicio: '', paquete: ' ', familia: '', cantidad: ''},
            accion: 'agregar'
        };
        if (props.refaccion !== null) {
            refaccion = props.refaccion;
            this.state = {
                conceptos: {"MTTO TOT": "MTTO TOT", "Mano de Obra": "Mano de Obra"},
                servicios: {"Servicio": "Servicio", "Material": "Material"},
                paquetes: {
                    "Transport": "Transport",
                    "Leases / Fuerza de ventanas": "Leases / Fuerza de ventanas",
                    "Leases / Rentals": "Leases / Rentals",
                    "Logistics Support": "Logistics Support",
                    "Utilities": "Utilities"
                },
                familias: _familias,
                visibleFamilia: false,
                refacciones: _refacciones,
                selectedConcepto: refaccion.concepto,
                selectedServicios: refaccion.servicio,
                selectedPaquete: refaccion.paquete,
                selectedFamilia: refaccion.familia,
                pickedFamilia: refaccion.familia.key,
                pickedText: refaccion.familia.label,
                selectedRefaccion: refaccion.refaccion,
                refaccion: {concepto: '', servicio: '', paquete: ' ', familia: '', cantidad: refaccion.cantidad},
                index: refaccion.index,
                accion: 'actualizar'
            };
        }
        ;
    };


    onShowFamilia = () => {
        this.setState({visibleFamilia: true});
    };

    onSelectFamilia = (picked) => {
        this.setState({
            pickedFamilia: picked,
            selectedFamilia: this.state.familias[picked - 1],
            pickedText: this.state.familias[picked - 1].label,
            visibleFamilia: false,
        });
        let _refacciones = [];
        _refacciones = obtenerRefacciones(this.state.familias[picked - 1].key);
        var _this = this;
        setTimeout(function () {
            _this.setState({refacciones: _refacciones});
        }, 300);
    }

    onCancelFamilia = () => {
        this.setState({
            visibleFamilia: false
        });
    }

    componentWillMount() {
        if (this.props.refaccion !== null) {
            let refaccion = this.props.refaccion;
            let _refaccion = null;
            let _refacciones = obtenerRefacciones(refaccion.familia.key);
            var _this = this;
            setTimeout(function () {
                for (let i in _refacciones) {
                    if (_refacciones[i].key === refaccion.refaccion.key) {
                        _refaccion = _refacciones[i];
                    }
                }
                _this.setState({refacciones: _refacciones, selectedRefaccion: _refaccion});
            }, 300);
        }
    }

    accion() {
        const {accion} = this.state;
        switch (accion) {
            case 'agregar':
                this.agregarRefaccion();
                break;
            case 'actualizar':
                this.actualizarRefaccion();
                break;
        }
    }

    agregarRefaccion() {
        var msg = "Verifique sus datos\nLos campos requeridos son:\n_campos_";
        var campos = "";
        if(this.state.pickedFamilia === null){
            campos+="*Familia\n";
        }
        if(this.state.selectedRefaccion.key===undefined||this.state.selectedRefaccion.key===null||this.state.selectedRefaccion.key===-1){
            campos+="*Refacción\n"
        }
        if(!cadenaValida(this.state.refaccion.cantidad)){
            campos+="*Cantidad\n";
        }
        if (cadenaValida(campos)) {
            msg=msg.replace('_campos_',campos);
            Alert.alert(
                'Error',
                msg.toString(),
                [
                    {
                        text: 'Aceptar',
                    }
                ]
            );
        } else {
            this.state.refaccion.concepto = this.state.selectedConcepto;
            this.state.refaccion.servicio = this.state.selectedServicios;
            this.state.refaccion.paquete = this.state.selectedPaquete;
            this.state.refaccion.familia = this.state.selectedFamilia;
            this.state.refaccion.refaccion = this.state.selectedRefaccion;
            this.props.agregarRefaccion(this.state.refaccion);
        }
    }

    actualizarRefaccion() {
        var msg = "Verifique sus datos\nLos campos requeridos son:\n_campos_";
        var campos = "";
        if(this.state.pickedFamilia === null){
            campos+="*Familia\n";
        }
        if(this.state.selectedRefaccion.key===undefined||this.state.selectedRefaccion.key===null||this.state.selectedRefaccion.key===-1){
            campos+="*Refacción\n"
        }
        if(!cadenaValida(this.state.refaccion.cantidad)){
            campos+="*Cantidad\n";
        }
        if (cadenaValida(campos)) {
            msg=msg.replace('_campos_',campos);
            Alert.alert(
                'Error',
                msg.toString(),
                [
                    {
                        text: 'Aceptar',
                    }
                ]
            );
        } else {
            this.state.refaccion.concepto = this.state.selectedConcepto;
            this.state.refaccion.servicio = this.state.selectedServicios;
            this.state.refaccion.paquete = this.state.selectedPaquete;
            this.state.refaccion.familia = this.state.selectedFamilia;
            this.state.refaccion.refaccion = this.state.selectedRefaccion;
            this.state.refaccion.index = this.state.index;
            this.props.actualizarRefaccion(this.state.refaccion);
        }
    }

    regresar() {
        this.props.regresar();
    }

    render() {
        const {visibleFamilia, familias, pickedFamilia, pickedText} = this.state;
        return (
            <View style={styles.contenedorPrincipal}>
                <ScrollView style={styles.scroll}>
                    <Item stackedLabel>
                        <Label>Concepto</Label>
                        <Picker
                            style={styles.inputPicker}
                            mode="dropdown"
                            selectedValue={this.state.selectedConcepto}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({selectedConcepto: itemValue});
                            }}>
                            {Object.keys(this.state.conceptos).map((key) => {
                                return (
                                    <Picker.Item label={this.state.conceptos[key]} value={key} key={key}/>
                                )
                            })}
                        </Picker>
                    </Item>
                    <Item stackedLabel>
                        <Label>Servicio/Material</Label>
                        <Picker
                            style={styles.inputPicker}
                            mode="dropdown"
                            selectedValue={this.state.selectedServicio}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({selectedServicio: itemValue});
                            }}>
                            {Object.keys(this.state.servicios).map((key) => {
                                return (
                                    <Picker.Item label={this.state.servicios[key]} value={key} key={key}/>
                                )
                            })}
                        </Picker>
                    </Item>
                    <Item stackedLabel>
                        <Label>Paquete</Label>
                        <Picker
                            style={styles.inputPicker}
                            mode="dropdown"
                            selectedValue={this.state.selectedPaquete}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({selectedPaquete: itemValue});
                            }}>
                            {Object.keys(this.state.paquetes).map((key) => {
                                return (
                                    <Picker.Item label={this.state.paquetes[key]} value={key} key={key}/>
                                )
                            })}
                        </Picker>
                    </Item>
                    <Item stackedLabel>
                        <Label>Familia</Label>
                        <TouchableOpacity style={styles.inputPicker} onPress={this.onShowFamilia}>
                            <Text>{pickedFamilia !== null ? pickedText : 'Seleccione...'}</Text>
                        </TouchableOpacity>
                        <ModalFilterPicker
                            visible={visibleFamilia}
                            onSelect={this.onSelectFamilia}
                            onCancel={this.onCancelFamilia}
                            options={familias}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Refacción</Label>
                        <Picker
                            style={styles.inputPicker}
                            mode="dropdown"
                            selectedValue={this.state.selectedRefaccion}
                            onValueChange={(itemValue, itemIndex) => {
                                console.log("valor:" + itemValue);
                                console.log("index:" + itemIndex);
                                this.setState({selectedRefaccion: itemValue});
                            }}>
                            {Object.keys(this.state.refacciones).map((key) => {
                                return (
                                    <Picker.Item label={this.state.refacciones[key].label}
                                                 value={this.state.refacciones[key]}
                                                 key={key}/>
                                )
                            })}
                        </Picker>
                    </Item>
                    <Item stackedLabel>
                        <Label>Cantidad</Label>
                        <Input value={this.state.refaccion.cantidad}
                               onChangeText={(text) => this.setState({refaccion: {cantidad: text}})}
                               keyboardType='numeric'/>
                    </Item>
                    <TouchableOpacity onPress={this.accion.bind(this)}>
                        <View style={styles.button}>
                            <Text>Agregar</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.regresar.bind(this)}>
                        <View style={styles.cancel}>
                            <Text>Cancelar</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );

    }


};

module.exports = refaccionesView;
