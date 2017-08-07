/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    AppRegistry
} from 'react-native';

var SQLite = require('react-native-sqlite-storage');

export default class PrepopulatedDatabaseExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            record: null
        }
        let db = SQLite.openDatabase({
            name: 'mntoUnidades.db',
            createFromLocation: "~mntoUnidades.db",
            location: 'Library'
        }, this.openCB, this.errorCB);
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO am_usuario VALUES ("mecanico1","password","1","Cesar","Rojas","cesar@mail.com" ,1,NULL)');
        });
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM am_usuario', [], (tx, results) => {
                console.log("Query completed");
                // Get rows with Web SQL Database spec compliance.
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    console.log(`Record: ${row.username}`);
                    this.setState({record: row});
                }
            });
        });

    }

    errorCB(err) {
        console.log("SQL Error: " + err);
    }

    successCB() {
        console.log("SQL executed fine");
    }

    openCB() {
        console.log("Database Abierta");
    }

}



modules.exports = PrepopulatedDatabaseExample;