import React, { Component } from 'react';
import './App.css';
import { ClipBoardItem, Exposables } from "./types";
import ClipItem from "./components/ClipItem/ClipItem";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import store from "./store";
import { pushItem } from "./store/actions";
import { AppUtils } from "./App.utils";


export const eel = AppUtils.initializeEel();

interface IAppState {
    clipBoardItems: ClipBoardItem[],
}

export type AppState = IAppState;

export class App extends Component<{}, {}> {
    public state: IAppState = {
        clipBoardItems: []
    };

    constructor(props: any) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        store.subscribe(() => {
            // set the state of the current clipboard items
            this.setState({
                clipBoardItems: store.getState().clipBoardItems
            } as IAppState);
        });
    }

    public getClipboard() {
        eel.get_latest_from_clipboard()((data: string) => {
            const item = ClipBoardItem.mapPythonStringDto(data);
            store.dispatch(pushItem(item));
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
        const items = AppUtils.reorder(
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
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}
                             className={snapshot.isDragging ? 'dragging': ''}
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
                        <div className="ItemList"
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
