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
    Separator,
    StyleProvider
} from 'native-base';
import {NavigationActions} from 'react-navigation';
import SideMenu from 'react-native-side-menu';
import styles from '../estilos/estilos'
import Menu from './menuView';
import Bandeja from './bandejaView'
import Correctivo from './mntoCorrectivoView';
import Preventivo from './mntoPreventivoView';
import Rescate from './mntoRescateView';
import getTheme from '../../native-base-theme/components';


export class masterView extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            username: this.props.navigation.state.params.username,
            isOpen: false,
            selectedTab: 'correctivo',
            selectedItem: 'Registro',
            enableToggle: true
        };
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    updateMenuState(isOpen) {
        this.setState({isOpen});
    }

    onMenuItemSelected = item =>
        this.setState({
            isOpen: false,
            selectedItem: item,
        });

    toBandeja = () => {
        this.setState({selectedItem: 'Bandeja'});
    };

    renderSelectedTab() {
        switch (this.state.selectedTab) {
            case 'preventivo':
                return (
                    <StyleProvider style={getTheme()}>
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
                            <Preventivo username={this.state.username} onSave={this.toBandeja}/>
                        </View>
                    </StyleProvider>
                );
                break;
            case 'correctivo':
                return (
                    <StyleProvider style={getTheme()}>
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
                            <Correctivo username={this.state.username} onSave={this.toBandeja}/>
                        </View>
                    </StyleProvider>
                );
                break;
            case 'rescate':
                return (
                    <StyleProvider style={getTheme()}>
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
                            <Rescate username={this.state.username} onSave={this.toBandeja}/>
                        </View>
                    </StyleProvider>
                );
                break;
            default:
                break;
        }
    }

    renderItem() {
        switch (this.state.selectedItem) {
            case 'Registro':
                return (
                    <Container style={styles.container}>
                        <Content>
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
                );
                break;
            case 'Bandeja':
                return (
                    <Container style={styles.container}>
                        <Header>
                            <Body>
                            <Title>BANDEJA DE ORDENES</Title>
                            </Body>
                            <Right>
                                <Button transparent onPress={this.toggle}>
                                    <Icon name='menu'/>
                                </Button>
                            </Right>
                        </Header>
                        <Bandeja username={this.state.username}/>
                    </Container>
                );
                break;
            case 'Salir':
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Login', params: {username: ''}})
                    ]
                });
                this.props.navigation.dispatch(resetAction);
                break;
        }
    };

    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected} username={this.state.username}/>;
        return (
            <StyleProvider style={getTheme()}>
                <SideMenu
                    menu={menu}
                    isOpen={this.state.isOpen}
                    onChange={isOpen => this.updateMenuState(isOpen)}
                    menuPosition={'right'}
                    disableGestures={true}
                >
                    {this.renderItem()}
                </SideMenu>
            </StyleProvider>
        );
    }
}

module.exports = masterView;