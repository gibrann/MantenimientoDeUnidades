
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

import {obtenerUnidades} from '../repositorios/generalRepository';

class AutocompleteExample extends Component {
    static renderUnidad(unidad) {
        const { num_placa,num_economico,clase_vehiculo } = unidad;

        return (
            <View>
                <Text style={styles.titleText}>{num_placa}. {title}</Text>
                <Text style={styles.titleText}>({num_economico})</Text>
                <Text style={styles.openingText}>{clase_vehiculo}</Text>
            </View>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            unidades: [],
            query: ''
        };
    }

    componentDidMount() {
        var _unidades = [];
        _unidades = obtenerUnidades('');
        _that=this;
        setTimeout(function () {
            _that.setState({ unidades: _unidades });
            console.log("Se asgnaron unidades");
            console.log("Unidades: "+_unidades)
        },5000);

    }

    findUnidad(query) {
        if (query === '') {
            return [];
        }
        console.log("Aplicando regex");
        const { unidades } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return unidades.filter(unidad => unidad.num_placa.search(regex) >= 0);
    }

    render() {
        const { query } = this.state;
        const unidades = this.findUnidad(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return (
            <View style={styles.container}>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.autocompleteContainer}
                    data={unidades.length === 1 && comp(query, unidades[0].num_placa) ? [] : unidades}
                    defaultValue={query}
                    onChangeText={text => this.setState({ query: text })}
                    placeholder="Ingrese su numero de placa"
                    renderItem={({ num_placa, num_economico }) => (
                        <TouchableOpacity onPress={() => this.setState({ query: title })}>
                            <Text style={styles.itemText}>
                                {title} ({release_date.split('-')[0]})
                            </Text>
                        </TouchableOpacity>
                    )}
                />
                <View style={styles.descriptionContainer}>
                    {unidades.length > 0 ? (
                        AutocompleteExample.renderUnidad(unidades[0])
                    ) : (
                        <Text style={styles.infoText}>
                            Ingrese numero de Placa
                        </Text>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 25
    },
    autocompleteContainer: {
        marginLeft: 10,
        marginRight: 10
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 8
    },
    infoText: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    }
});

module.exports = AutocompleteExample;
