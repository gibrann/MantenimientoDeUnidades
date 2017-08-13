/**
 * Created by gibrann on 16/07/17.
 */

import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native'
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

export class dashboardView extends Component {

    state = {
        visibleModal: false,
    };

    render() {
        return (
            <Container>
                <Content>
                    <View>
                        <Form>
                            <Header>
                                <Left>
                                    <Button transparent>
                                        <Icon name='arrow-back'/>
                                    </Button>
                                </Left>
                                <Body>
                                <Title>REGISTRO DE MANTENIMIENTO</Title>
                                </Body>
                                <Right>
                                    <Button transparent>
                                        <Icon name='menu'/>
                                    </Button>
                                </Right>
                            </Header>
                            <Separator bordered>
                                <Text>MIDFIELD</Text>

                                <Right>
                                    <Button transparent>
                                        <Icon name='menu'/>
                                    </Button>
                                </Right>
                            </Separator>
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
                    </View>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon name="md-settings"/>
                            <Text>Correctivo</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="alert"/>
                            <Text>Preventivo</Text>
                        </Button>
                        <Button active vertical>
                            <Icon active name="briefcase"/>
                            <Text>Rescate</Text>
                        </Button>
                    </FooterTab>
                </Footer>
                <Modal
                    isVisible={this.state.visibleModal}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
                >
                    <View style={styles.modalContent}>
                        <Text>Hello!</Text>
                    </View>
                </Modal>
            </Container>

        );
    }
}

module.exports = dashboardView;