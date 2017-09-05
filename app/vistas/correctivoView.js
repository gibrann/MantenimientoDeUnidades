import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    TouchableHighlight
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

export class CorrectivoView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: false,
            visibleSgnature: false,
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

    render() {
        return (
            <Form>
                <Header>
                    <Body>
                    <Title>Datos de la Unidad</Title>
                    </Body>
                </Header>
                <Item floatingLabel>
                    <Label># Placa</Label>
                    <Input/>
                </Item>
                <Item floatingLabel>
                    <Label>#Economico</Label>
                    <Input/>
                </Item>
                <Item floatingLabel>
                    <Label>Kilometraje</Label>
                    <Input/>
                </Item>
                <Item disabled>
                    <Label>SAG</Label>
                    <Input disabled/>
                </Item>
                <Item disabled>
                    <Label>Tipo</Label>
                    <Input disabled/>
                </Item>
                <Item disabled>
                    <Label>Marca</Label>
                    <Input disabled/>
                </Item>
                <Item floatingLabel>
                    <Label>Ruta</Label>
                    <Input/>
                </Item>
                <Item disabled>
                    <Label>Fecha Entrada</Label>
                    <Input disabled/>
                </Item>
                <Separator bordered/>
                <Header>
                    <Body>
                    <Title>Datos del Operador</Title>
                    </Body>
                </Header>
                <Item disabled>
                    <Label>Operador</Label>
                    <Input/>
                </Item>
                <Item disabled>
                    <Label>Telefono</Label>
                    <Input disabled/>
                </Item>
                <Item disabled>
                    <Label>#Empleado</Label>
                    <Input disabled/>
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
                            <Item floatingLabel>
                                <Label># Placa</Label>
                                <Input/>
                            </Item>
                            <Item floatingLabel>
                                <Label>#Economico</Label>
                                <Input/>
                            </Item>
                            <Item floatingLabel>
                                <Label>Kilometraje</Label>
                                <Input/>
                            </Item>
                            <Item disabled>
                                <Label>SAG</Label>
                                <Input disabled/>
                            </Item>
                            <Item disabled>
                                <Label>Tipo</Label>
                                <Input disabled/>
                            </Item>
                            <Item disabled>
                                <Label>Marca</Label>
                                <Input disabled/>
                            </Item>
                            <Item floatingLabel>
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