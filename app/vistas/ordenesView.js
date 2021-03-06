import React, {
    Component,
} from 'react';
import {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View
} from 'react-native';

import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';

class App extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            basic: true,
            listViewData: new Array(20).fill('').map((_, i) => `item #${i}`)
        };
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({listViewData: newData});
    }

    render() {
        return (
            <View style={styles.container}>
                <SwipeListView
                    dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                    renderRow={(data, secId, rowId, rowMap) => (
                        <SwipeRow
                            disableLeftSwipe={parseInt(rowId) % 2 === 0}
                            leftOpenValue={20 + Math.random() * 150}
                            rightOpenValue={-150}
                        >
                            <View style={styles.rowBack}>
                                <Text>Ver</Text>
                                <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                                    <Text style={styles.backTextWhite}>Editar</Text>
                                </View>
                                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}
                                                  onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    backTextWhite: {
        color: '#FFF'
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        width: 100,
    }
});

module.exports = App;