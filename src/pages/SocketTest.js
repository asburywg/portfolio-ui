import React, { useState, useEffect } from 'react';
import { socket } from '../services/websocket/socket';
// https://socket.io/how-to/use-with-react

// file_parser
const SocketTest = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fileParserState, setFileParserState] = useState({});


    useEffect(() => {
        function onConnect() {
            console.log('connected')
            setIsConnected(true);
        }

        function onDisconnect() {
            console.log('disconnected')
            setIsConnected(false);
        }

        function onFooEvent(value) {
            console.log(value);
            setFooEvents(previous => [...previous, value]);
        }
        function onTrans(value) {
            console.log(value);
        }

        function onFileParserUpdate(value) {
            console.log(value);
            Object.entries(value).forEach(([key, value]) => {
                console.log(key);
                console.log(value);
                console.log(value['processed']);
            })
            setFileParserState(value);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('data', onFooEvent);
        socket.on('transactions', onTrans);
        socket.on('file_parser', onFileParserUpdate);

        socket.timeout(5000).emit('serve', () => {
            setIsLoading(false);
        });

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('data', onFooEvent);
            socket.off('file_parser', onFileParserUpdate);
        };
    }, []);

    function connect() {
        socket.connect();
      }
    
    function disconnect() {
        socket.disconnect();
    }

    function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        socket.timeout(5000).emit('data', value, () => {
        setIsLoading(false);
        });
    }

    // {'1': {'pending': 67, 'processed': 0}, '11': {'pending': 75, 'processed': 0}}
    return (
        <div className="App">
            <p>State: {'' + isConnected}</p>
            <div><button onClick={ connect }>Connect</button></div>
            <button onClick={ disconnect }>Disconnect</button>
            <form onSubmit={ onSubmit }>
                <input onChange={ e => setValue(e.target.value) } />
                <button type="submit" disabled={ isLoading }>Submit</button>
            </form>
            {JSON.stringify(fileParserState)}
            {/* {JSON.stringify(fileParserState['6']['pending'])} */}
        </div>
    );

}

export default SocketTest;
