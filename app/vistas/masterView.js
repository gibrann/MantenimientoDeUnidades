/**
 * Created by gibrann on 16/07/17.
 */

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
import styles from '../estilos/estilos'
import SideMenu from 'react-native-side-menu';
import Menu from './menuView';
import Preventivo from './preventivoView';
import Correctivo from './correctivoView';
import Rescate from './rescateView';


export class masterView extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false,
            selectedTab: 'correctivo',
            selectedItem: 'About',
        };
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({isOpen});
    }

    onMenuItemSelected = item =>
        this.setState({
            isOpen: false,
            selectedItem: item,
        });



    renderSelectedTab() {
        switch (this.state.selectedTab) {
            case 'preventivo':
                return (
                    <View>
                        <Header>
                            <Body>
                            <Title>MANTENIMIENTO PREVENTIVO</Title>
                            </Body>
                            <Right>
                                <Button transparent onPress={this.toggle}>
                                    <Icon name='menu'/>
                                </Button>
                            </Right>
                        </Header>
                        <Separator bordered/>
                        <Preventivo/>
                    </View>
                );
                break;
            case 'correctivo':
                return (
                    <View>
                        <Header>
                            <Body>
                            <Title>MANTENIMIENTO CORRECTIVO</Title>
                            </Body>
                            <Right>
                                <Button transparent onPress={this.toggle}>
                                    <Icon name='menu'/>
                                </Button>
                            </Right>
                        </Header>
                        <Separator bordered/>
                        <Correctivo/>
                    </View>
                );
                break;
            case 'rescate':
                return (
                    <View>
                        <Header>
                            <Body>
                            <Title>MANTENIMIENTO DE RESCATE</Title>
                            </Body>
                            <Right>
                                <Button transparent onPress={this.toggle}>
                                    <Icon name='menu'/>
                                </Button>
                            </Right>
                        </Header>
                        <Separator bordered/>
                        <Rescate/>
                    </View>
                );
                break;
            default:
        }
    }

    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;
        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={isOpen => this.updateMenuState(isOpen)}
                menuPosition={'right'}
            >
                <Container style={styles.container}>
                    <Content padder>
                        {this.renderSelectedTab()}
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button vertical active={this.state.selectedTab === 'correctivo'}
                                    onPress={() => this.setState({selectedTab: 'correctivo'})}>
                                <Icon name="md-settings"/>
                                <Text>Correctivo</Text>
                            </Button>
                            <Button vertical active={this.state.selectedTab === 'preventivo'}
                                    onPress={() => this.setState({selectedTab: 'preventivo'})}>
                                <Icon name="alert"/>
                                <Text>Preventivo</Text>
                            </Button>
                            <Button vertical active={this.state.selectedTab === 'rescate'}
                                    onPress={() => this.setState({selectedTab: 'rescate'})}>
                                <Icon active name="briefcase"/>
                                <Text>Rescate</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </SideMenu>
        );
    }
}

module.exports = masterView;