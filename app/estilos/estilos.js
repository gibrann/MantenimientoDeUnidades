import React, {Component} from 'react';
import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    // Estilos de Login
    contenedorPrincipal: {
        paddingTop: 40,
        flex: 1,
        alignItems: 'center',
        width: null,
        height: null
    },
    cajaLogin: {
        width: 400,
        height: 350,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        alignItems: 'center',
        paddingTop: 20,
        marginBottom: 10
    }, boton: {
        width: 300,
        height: 30,
        backgroundColor: '#e08231',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomColor: '#dbdbdb'
    }, botonRed: {
        width: 300,
        height: 30,
        backgroundColor: '#e03a34',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomColor: '#dbdbdb'
    }, botonAlt: {
        width: 300,
        height: 30,
        backgroundColor: '#5ba7ac',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomColor: '#dbdbdb'
    },
    textoBoton: {
        textAlign: 'center',
        color: 'white'
    },
    tituloLogin: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Lato, sans-serif',
        marginBottom: 20
    },
    banner: {
        width: 210,
        height: 50
    },
    input: {
        width: 300,
        height: 35,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingTop: 3,
        marginBottom: 10
    },
    //Estilos de formularios
    inputFm: {
        width: 100,
        height: 35,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingTop: 3,
        marginBottom: 10,
        borderColor: 'gray'
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    }, modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
        backgroundColor: 'white'
    },
    modalScroll: {
        backgroundColor: 'white',
        width: 900,
    },
    textoInfoBox: {
        textAlign: 'center',
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: 'Lato, sans-serif',
        marginBottom: 20
    },
});

export default styles;