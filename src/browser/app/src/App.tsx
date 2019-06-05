import React, {Component} from 'react';
import './App.css';
import {ClipBoardItem} from "./types";
import ClipItem from "./components/ClipItem";
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
    throw "check why this function does not sort correctly";
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
const grid = 8;
const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle
});
const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});

interface IAppState {
    clipBoardItems: ClipBoardItem[],
}

export class App extends Component<{}, {}> {

    constructor(props: any) {
        super(props);
        this.getClipboard = this.getClipboard.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result: any) {

        console.log('drag end');
        console.log(result);

        // dropped outside the list
        if (!result.destination) {
            return;
        }

        console.log(this.state.clipBoardItems);

        const items = reorder(
            this.state.clipBoardItems || [],
            result.source.index,
            result.destination.index
        );

        console.log(items);

        this.setState({
            clipBoardItems: items
        } as IAppState);
    }

    public state: IAppState = {
        clipBoardItems: []
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

    get itemsList() {
        if (this.state.clipBoardItems.length > 0) {
            return this.state.clipBoardItems.map((item, index) => (
                <Draggable key={'item-' + index} draggableId={'item-' + index} index={index}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}
                             style={getItemStyle(
                                 snapshot.isDragging,
                                 provided.draggableProps.style
                             )}>
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
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
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
