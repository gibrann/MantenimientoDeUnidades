import React from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
} from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    menu: {
        flex: 2,
        width: window.width,
        height: window.height,
        backgroundColor: 'white',
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        position: 'relative',
        left: 70,
        top: 15,
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
    banner: {
        width: 210,
        height: 50
    },
});

export default function Menu({onItemSelected,username}) {
    return (
        <ScrollView scrollsToTop={false} style={styles.menu} scrollEnabled={false}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.banner}
                    source={require('../imagenes/final.png')}
                />
                <Text style={styles.name}>Usuario: {username}</Text>
            </View>

            <Text
                onPress={() => onItemSelected('Registro')}
                style={styles.item}
            >
                Registro Ordenes
            </Text>

            <Text
                onPress={() => onItemSelected('Bandeja')}
                style={styles.item}
            >
                Bandeja Ordenes
            </Text>
            <Text
                onPress={() => onItemSelected('Salir')}
                style={styles.item}
            >
                Salir
            </Text>
        </ScrollView>
    );
}

Menu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
};