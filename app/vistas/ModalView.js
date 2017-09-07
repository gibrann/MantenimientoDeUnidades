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
import Modal from 'react-native-modal';

export default class ModalView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleModal: false,
        }
    };


    render() {
        return (
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
                        <Text>Hello!</Text>

                        <Item floatingLabel>
                            <Label># Placa</Label>
                            <Input />
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
        );
    }
};
module.exports = ModalView;