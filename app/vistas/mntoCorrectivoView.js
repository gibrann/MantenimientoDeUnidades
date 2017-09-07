import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    TouchableHighlight,
    Picker
} from 'react-native'
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
import Modal from 'react-native-modal'
import styles from '../estilos/estilos'
import ImagePicker from 'react-native-image-crop-picker';
import SignatureCapture from 'react-native-signature-capture';
import Autocomplete from 'react-native-autocomplete-input';
import {obtenerUnidades, obtenerFamilias} from '../repositorios/generalRepository';

export class CorrectivoView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unidad: null,
            operador: {nombres: '', apellidos: '', numEmpleado: '', telefono: ''},
            visibleModal: false,
            visibleSgnature: false,
            unidades: [],
            familias: [],
            query: '',
            queryFamilia: '',
            selectedConcepto: "MTTO TOT",
            selectedServicios: "Servicio",
            selectedPaquete: "Transport",
            conceptos: {"MTTO TOT": "MTTO TOT", "Mano de Obra": "Mano de Obra"},
            servicios: {"Servicio": "Servicio", "Material": "Material"},
            paquetes: {
                "Transport": "Transport",
                "Leases / Fuerza de ventanas": "Leases / Fuerza de ventanas",
                "Leases / Rentals": "Leases / Rentals",
                "Logistics Support": "Logistics Support",
                "Utilities": "Utilities"
            },
        };
    };

    pickMultiple() {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            maxFiles: 2,
        }).then(images => {
            this.setState({
                image: null,
                images: images.map(i => {
                    console.log('received image', i);
                    return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                })
            });
        }).catch(e => alert(e));
    };

    renderAsset(image) {
        return this.renderImage(image);
    };

    renderImage(image) {
        return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image}/>
    };

    openModal() {
        this.setState({
            visibleModal: true,
        })
    };

    saveSign() {
        this.refs["sign"].saveImage();
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    _onSaveEvent(result) {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        console.log(result.encoded);
    }

    _onDragEvent() {
        // This callback will be called when the user enters signature
        console.log("dragged");
    }

    componentDidMount() {
        let _unidades = [];
        _unidades = obtenerUnidades('');
        var _this = this;
        setTimeout(function () {
            _this.setState({unidades: _unidades});
        }, 5000);
        let _familias = [];
        _familias = obtenerFamilias('');
        setTimeout(function () {
            _this.setState({familias: _familias});
        }, 5000);
    }

    findUnidad(query) {
        if (query === '') {
            return [];
        }
        console.log("Aplicando regex");
        const {unidades} = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return unidades.filter(unidad => unidad.num_placa.search(regex) >= 0);
    }

    findFamilia(queryFamilia) {
        if (queryFamilia === '') {
            return [];
        }
        console.log("Aplicando regex");
        const {familias} = this.state;
        const regex = new RegExp(`${queryFamilia.trim()}`, 'i');
        return familias.filter(familia => familia.subtipo_servicio.search(regex) >= 0);
    }

    renderUnidad() {
        return (
            <View>
                <Item floatingLabel disabled>
                    <Label># Placa</Label>
                    <Input disabled value={this.state.unidad.placa}/>
                </Item>
                <Item floatingLabel disabled>
                    <Label>#Economico</Label>
                    <Input value={this.state.unidad.economico}/>
                </Item>
                <Item floatingLabel>
                    <Label>Kilometraje</Label>
                    <Input value={this.state.unidad.kilometraje} keyboardType='numeric'/>
                </Item>
                <Item floatingLabel disabled>
                    <Label>Tipo</Label>
                    <Input disabled value={this.state.unidad.tipo}/>
                </Item>
                <Item floatingLabel disabled>
                    <Label>Marca</Label>
                    <Input disabled value={this.state.unidad.marca}/>
                </Item>
                <Item floatingLabel>
                    <Label>Ruta</Label>
                    <Input value={this.state.unidad.ruta}/>
                </Item>
                <Item>
                    <Label>Fecha Entrada</Label>
                    <Input disabled value={this.state.unidad.fechaEntrada}/>
                </Item>
            </View>
        );
    }

    render() {
        const {query} = this.state;
        const {queryFamilia} = this.state;
        const unidades = this.findUnidad(query);
        const familias = this.findFamilia(queryFamilia);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <Form>
                <Header>
                    <Body>
                    <Title>Datos de la Unidad</Title>
                    </Body>
                </Header>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
					disableFullscreenUI={true}
                    containerStyle={styles.autocompleteContainer}
                    data={unidades.length === 1 && comp(query, unidades[0].num_placa) ? [] : unidades}
                    defaultValue={query}
                    onChangeText={text => this.setState({query: text})}
                    placeholder="Ingrese su numero de placa"
                    renderItem={({num_placa, num_economico, kilometraje, denominacion_tipo, fabricante, nombres, apellidos, num_empleado, telefono}) => (
                        <TouchableOpacity onPress={() => this.setState({
                            query: num_placa,
                            unidad: {
                                placa: num_placa,
                                economico: num_economico,
                                kilometraje: kilometraje,
                                tipo: denominacion_tipo,
                                marca: fabricante
                            },
                            operador: {
                                nombres: nombres,
                                apellidos: apellidos,
                                numEmpleado: num_empleado,
                                telefono: telefono
                            }
                        })}>
                            <Text style={styles.itemText}>
                                {num_placa} ({num_economico})
                            </Text>
                        </TouchableOpacity>
                    )}
                />
                <View style={styles.descriptionContainer}>
                    {this.state.unidad != null ? (
                        this.renderUnidad()
                    ) : (
                        <Text style={styles.infoText}>
                            Ingrese numero de Placa
                        </Text>
                    )}
                </View>
                <Separator bordered/>
                <Header>
                    <Body>
                    <Title>Datos del Operador</Title>
                    </Body>
                </Header>
                <Item floatingLabel>
                    <Label>Nombres</Label>
                    <Input value={this.state.operador.nombres}/>
                </Item>
                <Item floatingLabel>
                    <Label>Apellidos</Label>
                    <Input value={this.state.operador.apellidos}/>
                </Item>
                <Item floatingLabel>
                    <Label>Telefono</Label>
                    <Input value={this.state.operador.telefono}/>
                </Item>
                <Item floatingLabel>
                    <Label>#Empleado</Label>
                    <Input value={this.state.operador.numEmpleado} keyboardType='numeric'/>
                </Item>
                <Separator bordered/>
                <Header>
                    <Body>
                    <Title>Material - Refacciones</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            this.setState({visibleModal: true})
                        }}>
                            <Icon active name="add"/>
                        </Button>
                    </Right>
                </Header>
                <SwipeRow
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    left={
                        <Button success onPress={() => alert('Add')}>
                            <Icon active name="add"/>
                        </Button>
                    }
                    body={
                        <View>
                            <Text>SwipeRow Body Text</Text>
                        </View>
                    }
                    right={
                        <Button danger onPress={() => alert('Trash')}>
                            <Icon active name="trash"/>
                        </Button>
                    }
                />
                <Separator bordered/>
                <Header>
                    <Body>
                    <Title>Imagenes</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.pickMultiple.bind(this)}>
                            <Icon active name="add"/>
                        </Button>
                    </Right>
                </Header>
                <ScrollView horizontal={true}>
                    {this.state.images ? this.state.images.map(i => <View style={{paddingRight: 50}}
                                                                          key={i.uri}>{this.renderAsset(i)}</View>) : null}
                </ScrollView>
                <Separator bordered/>
                <Header>
                    <Body>
                    <Title>Observaciones</Title>
                    </Body>
                </Header>
                <Separator bordered/>
                <TouchableHighlight onPress={() => {
                    this.setState({visibleSgnature: true})
                }} style={styles.buttonEnd}>
                    <Text style={styles.textoBoton}>Registrar Ordenes</Text>
                </TouchableHighlight>
                <Separator bordered/>
                <Modal
                    isVisible={this.state.visibleModal}
                    animationIn={'zoomInDown'}
                    animationOut={'zoomOutUp'}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                >
                    <View style={styles.modalContent}>
                        <ScrollView style={styles.modalScroll}>
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
                                <Autocomplete
                                    autoCapitalize="none"
                                    autoCorrect={false}
									disableFullscreenUI={true}
                                    containerStyle={styles.inputPicker}
                                    data={familias.length === 1 && comp(queryFamilia, familias[0].subtipo_servicio) ? [] : familias}
                                    defaultValue={queryFamilia}
                                    onChangeText={text => this.setState({queryFamilia: text})}
                                    placeholder="Ingrese su numero de placa"
                                    renderItem={({id_material_servicio, subtipo_servicio}) => (
                                        <TouchableOpacity onPress={() => this.setState({
                                            queryFamilia: familia,
                                            familia: {
                                                idMaterialServicio: id_material_servicio,
                                                subtipoServicio: subtipo_servicio
                                            }
                                        })}>
                                            <Text style={styles.itemTextInModal}>
                                                {subtipo_servicio}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </Item>
                            <Item stackedLabel>
                                <Label>Tipo</Label>
                                <Input disabled/>
                            </Item>
                            <Item stackedLabel>
                                <Label>Marca</Label>
                                <Input disabled/>
                            </Item>
                            <Item stackedLabel>
                                <Label>Ruta</Label>
                                <Input/>
                            </Item>
                            <TouchableOpacity onPress={() => {
                                this.setState({visibleModal: false})
                            }}>
                                <View style={styles.button}>
                                    <Text>Agregar</Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </Modal>
                <Modal
                    isVisible={this.state.visibleSgnature}
                    animationIn={'zoomInDown'}
                    animationOut={'zoomOutUp'}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                >
                    <View style={styles.modalSignature}>
                        <View style={styles.viewSignature}>
                            <Text style={{alignItems: "center", justifyContent: "center"}}>Capture su firma</Text>
                            <SignatureCapture
                                style={[{flex: 1}, styles.signature]}
                                ref="sign"
                                onSaveEvent={this._onSaveEvent}
                                onDragEvent={this._onDragEvent}
                                saveImageFileInExtStorage={false}
                                showNativeButtons={false}
                                showTitleLabel={false}
                                viewMode={"landscape"}/>
                        </View>
                        <View style={{flex: 1, flexDirection: "row"}}>
                            <TouchableHighlight style={styles.buttonStyle}
                                                onPress={() => {
                                                    this.saveSign();
                                                    this.setState({visibleSgnature: false});
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
            </Form>
        );
    };
};

module.exports = CorrectivoView;