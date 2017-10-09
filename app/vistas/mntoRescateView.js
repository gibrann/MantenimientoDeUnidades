import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    TouchableHighlight,
    Picker,
    ListView,
    Alert,
    TextInput
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
    Separator,
    StyleProvider
} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Autocomplete from 'react-native-autocomplete-input';
import DatePicker from 'react-native-datepicker';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {Switch} from 'react-native-switch';
import styles from '../estilos/estilos';
import Refaccion from './refaccionView';
import ModalPicker from 'react-native-modal-picker'
import {obtenerUnidades} from '../repositorios/generalRepository';
import getTheme from '../../native-base-theme/components';
import {cadenaValida} from "../util/comunUtil";

export class RescateView extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            username:props.username,
            visibleModal: false,
            query: '',
            registroPantalla: 'orden',
            unidad: null,
            operador: {nombres: '', apellidos: '', numEmpleado: '', telefono: ''},
            observaciones: {ciudad: '', estado: '', poblacion: '', feachaTermino: '', horaTermino: ''},
            unidades: [],
            listRefacciones: [],
            images: [],
            textInputValue: '',
            editRefaccion: null,
            fechaReporte: '',
            horaReporte: '',
            horaArribo: '',
            horaSalida: ''
        };
    };

    pickMultiple() {
        const {images} = this.state;
        const imagenesActuales = images.length;
        let imagenesAux = [];
        if (imagenesActuales < 5) {
            ImagePicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
                maxFiles: 5,
            }).then(imagenes => {
                if (imagenesActuales + imagenes.length <= 5) {
                    imagenesAux = imagenes.map(i => {
                        return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                    });
                    images.push.apply(images, imagenesAux);
                    this.setState({
                        images: images
                    });
                } else {
                    Alert.alert(
                        'Error',
                        'El número de imágenes permitido es 5 verifique su elección',
                        [{text: 'Aceptar'}]
                    );
                }
            }).catch(e => Alert.alert(
                'Error', e.message, [{text: 'Aceptar'}]
            ));
        } else {
            Alert.alert(
                'Error',
                'Ya ha seleccionado las imágenes permitidas',
                [{text: 'Aceptar'}]
            );
        }
    };

    renderAsset(image) {
        return this.renderImage(image);
    };

    renderImage(image) {
        return (
            <View>
                <ModalPicker
                    data={[{key: 1, label: 'Eliminar'}]}
                    onChange={() => {
                        this.deleteImage(image);
                    }}
                    optionTextStyle={{color: 'red'}}
                    cancelText={'Cancelar'}
                >
                    <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image}/>
                </ModalPicker>
            </View>
        );
    };

    deleteImage(image) {
        const {images} = this.state;
        var i = images.indexOf(image);
        images.splice(i, 1);
        this.setState({images: images});
    }

    componentDidMount() {
        let _unidades = [];
        _unidades = obtenerUnidades('');
        var _this = this;
        setTimeout(function () {
            _this.setState({unidades: _unidades});
        }, 5000);
    }

    findUnidad(query) {
        if (query === '') {
            return [];
        }
        console.log("Aplicando regex");
        const {unidades} = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return unidades.filter(unidad => unidad.num_economico.search(regex) >= 0);
    }

    renderUnidad() {
        return (
            <View>
                <Item floatingLabel disabled>
                    <Label># Placa</Label>
                    <Input disabled value={this.state.unidad.placa}/>
                </Item>
                <Item floatingLabel disabled>
                    <Label>#Económico</Label>
                    <Input disabled value={this.state.unidad.economico}/>
                </Item>
                <Item floatingLabel>
                    <Label>Kilometrajes</Label>
                    <Input value={this.state.unidad.kilometraje} onChangeText={(text) => {
                        const {unidad} = this.state;
                        unidad.kilometraje = text;
                        this.setState({unidad: unidad});
                    }} keyboardType='numeric'/>
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
                    <Input keyboardType='numeric' value={this.state.unidad.ruta} onChangeText={(text) => {
                        const {unidad} = this.state;
                        unidad.ruta = text;
                        this.setState({unidad: unidad});
                    }}
                    />
                </Item>
            </View>
        );
    }

    agregarItem = (refaccion) => {
        var {listRefacciones} = this.state;
        listRefacciones.push(refaccion);
        this.setState({registroPantalla: 'orden'});
    };

    updateItem = (refaccion) => {
        const newData = [...this.state.listRefacciones];
        newData[refaccion.index] = refaccion;
        this.setState({registroPantalla: 'orden', listRefacciones: newData});
    };

    regresarFromRefaccion = () => {
        this.setState({registroPantalla: 'orden'});
    };

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].closeRow();
        const newData = [...this.state.listRefacciones];
        newData.splice(rowId, 1);
        this.setState({listRefacciones: newData});
    };

    editRow(data) {
        const {listRefacciones} = this.state;
        data.index = listRefacciones.indexOf(data);
        this.setState({editRefaccion: data, registroPantalla: 'refaccion'});
    };

    renderScreen() {
        const {query} = this.state;
        const unidades = this.findUnidad(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        const {registroPantalla} = this.state;
        switch (registroPantalla) {
            case 'orden':
                return (
                    <Form>
                        <Header>
                            <Body>
                            <Title>Resgistro</Title>
                            </Body>
                        </Header>
                        <Item>
                            <Label>Fecha Reporte</Label>
                            <DatePicker
                                style={styles.datePicker}
                                date={this.state.fechaReporte}
                                mode="date"
                                confirmBtnText="Seleccionar"
                                cancelBtnText="Cancelar"
                                format="YYYY-MM-DD"
                                showIcon={false}
                                onDateChange={(date) => {
                                    this.setState({fechaReporte: date})
                                }}
                                customStyles={{
                                    dateInput: styles.datePickerInput,
                                    dateText: styles.textPickerInput,
                                    btnTextConfirm: styles.btnTextConfirm,
                                    btnTextCancel: styles.btnTextCancel,
                                }}/>
                        </Item>
                        <Item>
                            <Label>Hora Reporte</Label>
                            <DatePicker
                                style={styles.datePicker}
                                date={this.state.horaReporte}
                                mode="time"
                                confirmBtnText="Seleccionar"
                                cancelBtnText="Cancelar"
                                format="hh:mm"
                                showIcon={false}
                                onDateChange={(date) => {
                                    this.setState({horaReporte: date})
                                }}
                                customStyles={{
                                    dateInput: styles.datePickerInput,
                                    dateText: styles.textPickerInput,
                                    btnTextConfirm: styles.btnTextConfirm,
                                    btnTextCancel: styles.btnTextCancel,
                                }}/>
                        </Item>
                        <Separator bordered/>
                        <Header>
                            <Body>
                            <Title>Trabajo de rescate</Title>
                            </Body>
                        </Header>
                        <Item>
                            <Label>Hora Salida</Label>
                            <DatePicker
                                style={styles.datePicker}
                                date={this.state.horaSalida}
                                mode="date"
                                confirmBtnText="Seleccionar"
                                cancelBtnText="Cancelar"
                                format="YYYY-MM-DD"
                                showIcon={false}
                                onDateChange={(date) => {
                                    this.setState({horaSalida: date})
                                }}
                                customStyles={{
                                    dateInput: styles.datePickerInput,
                                    dateText: styles.textPickerInput,
                                    btnTextConfirm: styles.btnTextConfirm,
                                    btnTextCancel: styles.btnTextCancel,
                                }}/>
                        </Item>
                        <Item>
                            <Label>Hora Arribo</Label>
                            <DatePicker
                                style={styles.datePicker}
                                date={this.state.horaArribo}
                                mode="time"
                                confirmBtnText="Seleccionar"
                                cancelBtnText="Cancelar"
                                format="hh:mm"
                                showIcon={false}
                                onDateChange={(date) => {
                                    this.setState({horaArribo: date})
                                }}
                                customStyles={{
                                    dateInput: styles.datePickerInput,
                                    dateText: styles.textPickerInput,
                                    btnTextConfirm: styles.btnTextConfirm,
                                    btnTextCancel: styles.btnTextCancel,
                                }}/>
                        </Item>
                        <Item>
                            <Label>Uso Grúa</Label>
                            <Switch
                                value={true}
                                onValueChange={(val) => console.log(val)}
                                disabled={false}
                                activeText={'Sí'}
                                inActiveText={'No'}
                                backgroundActive={'green'}
                                backgroundInactive={'red'}
                                circleActiveColor={'#30a566'}
                                circleInActiveColor={'#000000'}
                            />
                        </Item>
                        <Item>
                            <Label>Uso Remplazo</Label>
                            <Switch
                                value={true}
                                onValueChange={(val) => console.log(val)}
                                disabled={false}
                                activeText={'Sí'}
                                inActiveText={'No'}
                                backgroundActive={'green'}
                                backgroundInactive={'red'}
                                circleActiveColor={'#30a566'}
                                circleInActiveColor={'#000000'}
                            />
                        </Item>
                        <Separator bordered/>
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
                            data={unidades.length === 1 && comp(query, unidades[0].num_economico) ? [] : unidades}
                            defaultValue={query}
                            onChangeText={text => this.setState({query: text})}
                            placeholder="Ingrese su número económico"
                            renderItem={({num_placa, num_economico, kilometraje, denominacion_tipo, fabricante, nombres, apellidos, num_empleado, telefono}) => (
                                <TouchableOpacity onPress={() => this.setState({
                                    query: num_economico,
                                    unidad: {
                                        placa: num_placa,
                                        economico: num_economico,
                                        kilometraje: kilometraje,
                                        tipo: denominacion_tipo,
                                        marca: fabricante,
                                        ruta: '',
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
                                    Ingrese número económico
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
                            <Input value={this.state.operador.nombres} onChangeText={(text) => {
                                const {operador} = this.state;
                                operador.nombres = text;
                                this.setState({operador: operador,nuevoOperador:true});
                            }}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Apellidos</Label>
                            <Input value={this.state.operador.apellidos} onChangeText={(text) => {
                                const {operador} = this.state;
                                operador.apellidos = text;
                                this.setState({operador: operador,nuevoOperador:true});
                            }}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Teléfono</Label>
                            <Input keyboardType='numeric' value={this.state.operador.telefono} onChangeText={(text) => {
                                const {operador} = this.state;
                                operador.telefono = text;
                                this.setState({operador: operador,nuevoOperador:true});
                            }}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>#Empleado</Label>
                            <Input value={this.state.operador.numEmpleado} onChangeText={(text) => {
                                const {operador} = this.state;
                                operador.numEmpleado = text;
                                this.setState({operador: operador,nuevoOperador:true});
                            }} keyboardType='numeric'/>
                        </Item>
                        <Separator bordered/>
                        <Header>
                            <Body>
                            <Title>Material - Refacciones</Title>
                            </Body>
                            <Right>
                                <Button transparent onPress={() => {
                                    this.setState({registroPantalla: 'refaccion', editRefaccion: null})
                                }}>
                                    <Icon active name="add"/>
                                </Button>
                            </Right>
                        </Header>
                        <SwipeListView
                            enableEmptySections={true}
                            dataSource={this.ds.cloneWithRows(this.state.listRefacciones)}
                            renderRow={(data, secId, rowId, rowMap) => (
                                <SwipeRow
                                    leftOpenValue={20 + Math.random() * 100}
                                    rightOpenValue={-100}
                                >
                                    <View style={styles.rowBack}>
                                        <TouchableOpacity style={[styles.leftBtn, styles.backLeftBtn]}
                                                          onPress={_ => this.editRow(data)}>
                                            <Text style={styles.backTextWhite}>Editar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}
                                                          onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                            <Text style={styles.backTextWhite}>Eliminar</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableHighlight
                                        onPress={_ => console.log('You touched me')}
                                        style={styles.rowFront}
                                        underlayColor={'#AAA'}
                                    >
                                        <View>
                                            <Text>{data.refaccion.label.replace('#', '-existencia->')}</Text>
                                            <Text>Paquete: {data.paquete}</Text>
                                            <Text>Cantidad: {data.cantidad}</Text>
                                        </View>
                                    </TouchableHighlight>
                                </SwipeRow>
                            )}
                        />
                        <Separator bordered/>
                        <Header>
                            <Body>
                            <Title>Imágenes</Title>
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
                        <Item floatingLabel>
                            <Label>Diagnostico Falla</Label>
                            <Input value={this.state.observaciones.problema}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Descrpción Problema</Label>
                            <Input value={this.state.observaciones.observacion}/>
                        </Item>
                        <Separator bordered/>
                        <Header>
                            <Body>
                            <Title>Ubicacion de la Unidad</Title>
                            </Body>
                        </Header>
                        <Item floatingLabel>
                            <Label>Ciudad</Label>
                            <Input value={this.state.observaciones.ciudad} onChangeText={(text) => {
                                const {observaciones} = this.state;
                                observaciones.ciudad = text;
                                this.setState({observaciones: observaciones});
                            }}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Estado</Label>
                            <Input value={this.state.observaciones.estado} onChangeText={(text) => {
                                const {observaciones} = this.state;
                                observaciones.estado = text;
                                this.setState({observaciones: observaciones});
                            }}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Población</Label>
                            <Input value={this.state.observaciones.poblacion} onChangeText={(text) => {
                                const {observaciones} = this.state;
                                observaciones.poblacion = text;
                                this.setState({observaciones: observaciones});
                            }}/>
                        </Item>
                        <Item>
                            <Label>Fecha Termino</Label>
                            <DatePicker
                                style={styles.datePicker}
                                date={this.state.observaciones.fechaTermino}
                                mode="date"
                                confirmBtnText="Seleccionar"
                                cancelBtnText="Cancelar"
                                format="YYYY-MM-DD"
                                showIcon={false}
                                onDateChange={(date) => {
                                    this.setState({fechaEntrada: date})
                                }}
                                customStyles={{
                                    dateInput: styles.datePickerInput,
                                    dateText: styles.textPickerInput,
                                    btnTextConfirm: styles.btnTextConfirm,
                                    btnTextCancel: styles.btnTextCancel,
                                }}/>
                        </Item>
                        <Item>
                            <Label>Hora Termino</Label>
                            <DatePicker
                                style={styles.datePicker}
                                date={this.state.observaciones.horaTermino}
                                mode="time"
                                confirmBtnText="Seleccionar"
                                cancelBtnText="Cancelar"
                                format="hh:mm"
                                showIcon={false}
                                onDateChange={(date) => {
                                    this.setState({fechaEntrada: date})
                                }}
                                customStyles={{
                                    dateInput: styles.datePickerInput,
                                    dateText: styles.textPickerInput,
                                    btnTextConfirm: styles.btnTextConfirm,
                                    btnTextCancel: styles.btnTextCancel,
                                }}/>
                        </Item>
                        <Separator bordered/>
                        <TouchableHighlight onPress={this.agregarOrden.bind(this)} style={styles.buttonEnd}>
                            <Text style={styles.textoBoton}>Registrar Ordenes</Text>
                        </TouchableHighlight>
                        <Separator bordered/>
                    </Form>
                );
                break;
            case 'refaccion':
                return (
                    <View>
                        <Refaccion username={this.state.username}
                                   agregarRefaccion={this.agregarItem.bind(this)}
                                   actualizarRefaccion={this.updateItem.bind(this)}
                                   regresar={this.regresarFromRefaccion.bind(this)}
                                   refaccion={this.state.editRefaccion}
                        />
                    </View>
                );
                break;
        }
    };

    agregarOrden() {
        var orden = {};
        var msg = "Verifique la siguiente información:\n_requisitos_"
        var requisitos = '';
        var requisitosUnidad = '';
        var requisitosOperador = '';
        var requisitosObservaciones = '';
        if (this.state.unidad === null) {
            requisitos += "\t+Debe ingresar una unidad.\n"
        } else {
            if (!cadenaValida(this.state.unidad.ruta)) {
                requisitosUnidad += '\t\t*Ruta\n';
            }
            if (!cadenaValida(this.state.unidad.kilometraje)) {
                requisitosUnidad += '\t\t*Kilometraje\n';
            }
            if (cadenaValida(requisitosUnidad)) {
                requisitos += '\t+Debe ingresar los siguientes datos de unidad.\n' + requisitosUnidad;
            }
        }
        if (this.state.operador === null) {
            "\t+Debe indicar los datos de operador"
        } else {
            if (!cadenaValida(this.state.operador.nombres)) {
                requisitosOperador += '\t\t*Nombres\n';
            }
            if (!cadenaValida(this.state.operador.apellidos)) {
                requisitosOperador += '\t\t*Apellidos\n';
            }
            if (!cadenaValida(this.state.operador.telefono)) {
                requisitosOperador += '\t\t*Telefono\n';
            }
            if (!cadenaValida(this.state.operador.numEmpleado)) {
                requisitosOperador += '\t\t*Número de empleado\n';
            }
            if (cadenaValida(requisitosOperador)) {
                requisitos += '\t+Debe ingresar los siguientes datos de operador.\n' + requisitosOperador;
            }
        }
        if (this.state.listRefacciones.length < 1) {
            requisitos += "\t+Debe agregar al menos una refacción.\n"
        }
        if (this.state.images.length < 1) {
            requisitos += "\t+Debe agregar al menos una imagen.\n"
        }
        if (this.state.observaciones === null) {
            "\t+Debe indicar los datos de operador"
        } else {
            if (!cadenaValida(this.state.observaciones.problema)) {
                requisitosObservaciones += '\t\t*Descripción del problema\n';
            }
            if (!cadenaValida(this.state.observaciones.reparacion)) {
                requisitosObservaciones += '\t\t*Detalle de la reparación\n';
            }
            if (!cadenaValida(this.state.observaciones.observacion)) {
                requisitosObservaciones += '\t\t*Observaciones(Orden de Trabajo)\n';
            }
            if (!cadenaValida(this.state.observaciones.manoObra)) {
                requisitosObservaciones += '\t\t*Mano de Obra\n';
            }
            if (cadenaValida(requisitosObservaciones)) {
                requisitos += '\t+Debe ingresar los siguientes datos de observaciones.\n' + requisitosObservaciones;
            }
        }
        if (cadenaValida(requisitos)) {
            msg = msg.replace('_requisitos_', requisitos);
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
            orden = {
                idOrdenTrabajo: this.state.idOrdenTrabajo,
                usuario: this.state.username,
                unidad: this.state.unidad,
                operador: this.state.operador,
                refacciones: this.state.listRefacciones,
                imagenes:this.state.images,
                observaciones: this.state.observaciones,
                estatus: cadenaValida(this.state.estatus)?this.state.estatus:'Registrado'
            };
            guarddarMntoCorrectivo(orden);
            this.props.onSave();
        }
    };

    render() {
        return (
            <StyleProvider style={getTheme()}>
                <View>
                    {this.renderScreen()}
                </View>
            </StyleProvider>
        );
    };
};

module.exports = RescateView;