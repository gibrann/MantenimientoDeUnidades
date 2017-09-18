import React, {Component} from 'react';
import {
    StyleSheet
} from 'react-native';
import Dimensions from 'Dimensions';

var screenWidth = Dimensions.get('window').width;

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
    inputPicker: {
        width: screenWidth * 0.9,
        height: 35,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingTop: 3,
        marginBottom: 10,
        paddingLeft: 0,
        flex: 1
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
    },
    cancel: {
        backgroundColor: '#BDBDBD',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: 600
    }, modalSignature: {
        flex: 1,
        backgroundColor: 'white',
        height: 800
    },
    viewSignature: {
        flex: 1,
        flexDirection: "column",
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
        backgroundColor: 'white'
    },
    scroll: {
        backgroundColor: '#FFF',
    },
    modalScroll: {
        backgroundColor: '#FFF',
        width: screenWidth * 0.9,
    },
    textoInfoBox: {
        textAlign: 'center',
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: 'Lato, sans-serif',
        marginBottom: 20
    },
    suggestionsWrapper: {
        marginTop: 5,
        marginBottom: 5
    },
    suggestion: {
        height: 30,
        padding: 5,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    suggestionText: {
        fontSize: 15
    },
    inputA: {
        fontSize: 15
    },
    wrapper: {
        flex: 1
    },
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    },
    buttonEnd: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: "red",
        margin: 10,
    },
    autocompleteContainer: {
        marginLeft: 10,
        marginRight: 10
    },
    autocompleteInModal: {
        width: 300
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    itemTextInModal: {
        flex: 1,
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 5
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
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    },
    datePicker: {
        width: screenWidth * 0.7
    },
    datePickerInput: {
        borderColor: 'transparent',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    textPickerInput: {
        fontSize: 17,
        color: '#000'
    },
    btnTextConfirm: {
        color: '#000'
    },
    btnTextCancel: {
        color: '#000'
    },
    ontainer: {
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
    leftBtn:{
      backgroundColor: 'blue',
        width: 75
    },
    backLeftBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        top: 0,
        width: 75
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
    },
    switchButton: {
        paddingLeft: 10,
    }
});

export default styles;