import React, {Component} from 'react';
import './App.css';
import {ClipBoardItem} from "./types";
import ClipItem from "./components/ClipItem/ClipItem";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

// Point Eel web socket to the instance
export const eel = window.eel;
eel.set_host('ws://localhost:8080');

export enum Exposables {
    getClipBoard = 'getClipBoard'
}

// dispatchEvent for Rect
function getClipboard() {
    window.dispatchEvent(new CustomEvent(Exposables.getClipBoard));
}

window.eel.expose(getClipboard, 'get_clipboard');
getClipboard();

const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

interface IAppState {
    clipBoardItems: ClipBoardItem[],
}

export type AppState = IAppState;


export class App extends Component<{}, {}> {
    public state: IAppState = {
        clipBoardItems: []
    }

    constructor(props: any) {
        super(props);
        this.getClipboard = this.getClipboard.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    public getClipboard() {
        eel.get_latest_from_clipboard()((data: string) => {
            let item = ClipBoardItem.mapPythonStringDto(data);
            this.setState({
                clipBoardItems: this.state.clipBoardItems.concat(item)
            } as IAppState);
        });
    }

    public componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener(Exposables.getClipBoard, this.getClipboard);
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener(Exposables.getClipBoard, this.getClipboard)
        }
    }

    onDragEnd(result: any) {
        if (!result.destination) {
            return;
        }
        const items = reorder(
            this.state.clipBoardItems || [],
            result.source.index,
            result.destination.index
        );
        this.setState({
            clipBoardItems: items
        } as IAppState);
    }

    get itemsList() {
        if (this.state.clipBoardItems.length > 0) {
            return this.state.clipBoardItems.map((item, index) => (
                <Draggable key={item.UID} draggableId={item.UID} index={index}>
                    {(provided) => (
                        <div ref={provided.innerRef}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}>
                            <ClipItem clipItem={item}/>
                        </div>
                    )}
                </Draggable>
            ));

        } else {
            return <div>NO Clip Board available use STRG+L to insert</div>
        }
    }

    public render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {this.itemsList}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default App;
