import React, {Component} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native'
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
    Separator
} from 'native-base';
import Modal from 'react-native-modal'
import styles from '../estilos/estilos'

export class CorrectivoView extends Component {
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
                            <Button transparent onPress={() => this.setState({visibleModal: true})}>
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
                </Form>
        );
    };
};

module.exports = CorrectivoView;