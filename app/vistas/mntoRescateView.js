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
import DatePicker from 'react-native-datepicker';

export class RescateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
			fechaEntrada:'',
            visibleModal: false,
        };
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
                    <DatePicker
						style={styles.datePicker}
						date={this.state.fechaEntrada}
						mode="date"
						confirmBtnText="Seleccionar"
						cancelBtnText="Cancelar"
						format="YYYY-MM-DD"
						showIcon={false}
						onDateChange={(date) => {this.setState({fechaEntrada: date})}}
                        customStyles={{
							dateInput: styles.datePickerInput,
							dateText: styles.textPickerInput,
							btnTextConfirm: styles.btnTextConfirm,
							btnTextCancel: styles.btnTextCancel,
						}} />
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
                        <Button transparent onPress={() => {this.setState({visibleModal: true})}}>
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
                            <TouchableOpacity onPress={() => {this.setState({visibleModal: false})}}>
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

module.exports = RescateView