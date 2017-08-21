import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    Image
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

export class PreventivoView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: false,
            image: null,
            images: null
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
                        <ScrollView>
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
            </Form>
        );
    };
};

module.exports = PreventivoView;