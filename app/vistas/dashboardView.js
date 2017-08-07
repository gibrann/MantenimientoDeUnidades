/**
 * Created by gibrann on 16/07/17.
 */

import React, {Component} from 'react';
import {View} from 'react-native'
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
    Right
} from 'native-base';


export class dashboardView extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <View>
                        <Form>
                            <Header>
                                <Left>
                                    <Button transparent>
                                        <Icon name='arrow-back' />
                                    </Button>
                                </Left>
                                <Body>
                                <Title>REGISTRO DE MANTENIMIENTO</Title>
                                </Body>
                                <Right>
                                    <Button transparent>
                                        <Icon name='menu' />
                                    </Button>
                                </Right>
                            </Header>
                            <Header>
                                <Body>
                                <Title>UNIDADES</Title>
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
                                <Title>OPERADOR</Title>
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
            </Container>
        );
    }
}

module.exports = dashboardView;