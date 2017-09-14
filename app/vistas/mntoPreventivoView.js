import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    TouchableHighlight,
    Picker,
    ListView,
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
} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Autocomplete from 'react-native-autocomplete-input';
import DatePicker from 'react-native-datepicker';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import styles from '../estilos/estilos';
import Refaccion from './refaccionView';
import {obtenerUnidades} from '../repositorios/generalRepository';

export class PreventivoView extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            visibleModal: false,
            query: '',
            fechaEntrada: '',
            registroPantalla: 'orden',
            unidad: null,
            operador: {nombres: '', apellidos: '', numEmpleado: '', telefono: ''},
            observaciones: {problema: '', reparacion: '', observacion: '', manoObra: ''},
            servicio: {comentarios: '',proximo : ''},
            unidades: [],
            listRefacciones: [],
        };
        this.agregarRefaccion = this.agregarItem.bind(this);
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
        return unidades.filter(unidad => unidad.num_placa.search(regex) >= 0);
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
                    <Input disabled value={this.state.unidad.economico}/>
                </Item>
                <Item floatingLabel>
                    <Label>Kilometrajes</Label>
                    <Input value={this.state.unidad.kilometraje}
                           onChangeText={(text) => this.setState({unidad: {kilometraje: text}})}
                           keyboardType='numeric'/>
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
                    <Input value={this.state.unidad.ruta}
                           onChangeText={(text) => this.setState({unidad: {ruta: text}})}/>
                </Item>
                <Item>
                    <Label>Fecha Entrada</Label>
                    <DatePicker
                        style={styles.datePicker}
                        date={this.state.fechaEntrada}
                        mode="datetime"
                        confirmBtnText="Seleccionar"
                        cancelBtnText="Cancelar"
                        format="YYYY-MM-DD"
                        showIcon={true}
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
            </View>
        );
    }

    agregarItem() {
        this.setState({registroPantalla: 'orden'});
        console.log('Exito')
    }

    renderScreen() {
        const {query} = this.state;
        const unidades = this.findUnidad(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        if (this.state.registroPantalla === 'orden') {
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
                                    marca: fabricante,
                                    ruta: ''
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
                        <Input value={this.state.operador.nombres}
                               onChangeText={(text) => this.setState({operador: {nombres: text}})}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Apellidos</Label>
                        <Input value={this.state.operador.apellidos}
                               onChangeText={(text) => this.setState({operador: {apellidos: text}})}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Telefono</Label>
                        <Input value={this.state.operador.telefono}
                               onChangeText={(text) => this.setState({operador: {telefono: text}})}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>#Empleado</Label>
                        <Input value={this.state.operador.numEmpleado}
                               onChangeText={(text) => this.setState({operador: {numEmpleado: text}})}
                               keyboardType='numeric'/>
                    </Item>
                    <Separator bordered/>
                    <Header>
                        <Body>
                        <Title>Material - Refacciones</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => {
                                this.setState({registroPantalla: 'refaccion'})
                            }}>
                                <Icon active name="add"/>
                            </Button>
                        </Right>
                    </Header>
                    <SwipeListView
                        dataSource={this.ds.cloneWithRows(this.state.listRefacciones)}
                        renderRow={() => (
                            <SwipeRow
                                leftOpenValue={20 + Math.random() * 150}
                                rightOpenValue={-150}
                            >
                                <View style={styles.rowBack}>
                                    <Text>Ver</Text>
                                    <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                                        <Text style={styles.backTextWhite}>Editar</Text>
                                    </View>
                                    <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}
                                                      onPress={_ => this.deleteRow(rowId, rowMap)}>
                                        <Text style={styles.backTextWhite}>Eliminar</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableHighlight
                                    onPress={_ => console.log('You touched me')}
                                    style={styles.rowFront}
                                    underlayColor={'#AAA'}
                                >
                                    <View>
                                        <Text>Refaccion {data} de la orden</Text>
                                    </View>
                                </TouchableHighlight>
                            </SwipeRow>
                        )}
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
                        <Title>Póximo Servicio</Title>
                        </Body>
                    </Header>
                    <Item floatingLabel>
                        <Label>Comentarios (UNIDAD)</Label>
                        <Input value={this.state.servicio.comentarios}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Próximo Servicio</Label>
                        <Input value={this.state.servicio.proximo}/>
                    </Item>
                    <Separator bordered/>
                    <TouchableHighlight onPress={() => {
                        this.setState({visibleSgnature: true})
                    }} style={styles.buttonEnd}>
                        <Text style={styles.textoBoton}>Registrar Ordenes</Text>
                    </TouchableHighlight>
                    <Separator bordered/>
                </Form>
            );
        } else if (this.state.registroPantalla === 'refaccion') {
            return (
                <View>
                    <Refaccion username={this.state.username}
                               agregarRefaccion={this.agregarRefaccion}/>
                </View>
            );
        }
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].closeRow();
        const newData = [...this.state.listRefacciones];
        newData.splice(rowId, 1);
        this.setState({listRefacciones: newData});
    }

    render() {
        return (
            <View>
                {this.renderScreen()}
            </View>
        );
    };
};

module.exports = PreventivoView;