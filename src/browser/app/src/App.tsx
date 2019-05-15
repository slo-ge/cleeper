import React, {Component} from 'react';
import './App.css';
import {ClipBoardItem} from "./types";

// Point Eel web socket to the instance
export const eel = window.eel;
eel.set_host('ws://localhost:8080');

// this is all fake shit
function getClipboard() {
    // this line triggers the local storage change
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'test_key',
        newValue: 'test_value'
    }));
}

// his is all fake shit
window.eel.expose(getClipboard, 'get_clipboard');
getClipboard();

interface IAppState {
    clipBoardItems: ClipBoardItem[],
}


export class App extends Component<{}, {}> {

    constructor(props: any) {
        super(props);
        this.localStorageUpdated = this.localStorageUpdated.bind(this);

    }

    public state: IAppState = {
        clipBoardItems: []
    }

    /**
     * observe local storage
     */
    public localStorageUpdated() {
        eel.get_latest_from_clipboard()((data: string) => {
            let item = ClipBoardItem.mapPythonStringDto(data);

            this.setState({
                clipBoardItems: this.state.clipBoardItems.concat(item)
            } as IAppState);

        });
    }

    public componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener('storage', this.localStorageUpdated);
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('storage', this.localStorageUpdated)
        }
    }

    public render() {
        return (
            <div className="App">
                {this.state.clipBoardItems.map(item => (
                    <div dangerouslySetInnerHTML={{__html: item.elem}}></div>
                ))}
            </div>
        );
    }
}

export default App;
