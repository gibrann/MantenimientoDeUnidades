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

import styles from '../estilos/estilos';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import {obtenerServicios, obtenerRefacciones} from '../repositorios/generalRepository';
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

export class refaccionesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedConcepto: "MTTO TOT",
            selectedServicios: "Servicio",
            selectedPaquete: "Transport",
            selectedFamilia: null,
            conceptos: {"MTTO TOT": "MTTO TOT", "Mano de Obra": "Mano de Obra"},
            servicios: {"Servicio": "Servicio", "Material": "Material"},
            paquetes: {
                "Transport": "Transport",
                "Leases / Fuerza de ventanas": "Leases / Fuerza de ventanas",
                "Leases / Rentals": "Leases / Rentals",
                "Logistics Support": "Logistics Support",
                "Utilities": "Utilities"
            },
            refacciones: [],
            selectedRefaccion: 'Seleccione...',
            visibleFamilia: false,
            pickedFamilia: null,
            pickedText: '',
            familias: [],
            refaccion: {concepto: '', servicio: '', paquete: ' ', familia: '', cantidad: ''}
        }
    };


    onShowFamilia = () => {
        this.setState({visibleFamilia: true});
    }

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
        }, 500);
    }

    onCancelFamilia = () => {
        this.setState({
            visibleFamilia: false
        });
    }

    componentDidMount() {
        let _familias = [];
        _familias = obtenerServicios('');
        var _this = this;
        setTimeout(function () {
            _this.setState({familias: _familias});
        }, 500);
    }

    agregarRefaccion() {
        if (this.state.cantidad === null
            || this.state.pickedFamilia === null
        ) {
            Alert.alert(
                'Acceso',
                'Los campos Cantidad, Precio, Familia. Son requeridos para continuar',
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
                            <Text>{pickedFamilia !== null ? pickedText : 'Seleccione'}</Text>
                        </TouchableOpacity>
                        <ModalFilterPicker
                            visible={visibleFamilia}
                            onSelect={this.onSelectFamilia}
                            onCancel={this.onCancelFamilia}
                            options={familias}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Refaccion</Label>
                        <Picker
                            style={styles.inputPicker}
                            mode="dropdown"
                            selectedValue={this.state.selectedRefaccion}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({selectedRefaccion: itemValue});
                            }}>
                            {Object.keys(this.state.refacciones).map((key, label) => {
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
                    <TouchableOpacity onPress={this.agregarRefaccion.bind(this)}>
                        <View style={styles.button}>
                            <Text>Agregar</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );

    }


};

module.exports = refaccionesView;
