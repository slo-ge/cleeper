import React, {Component} from "react";
import {ClipBoardItem} from "../../types";
import './ClipItem.style.scss';
import store from "../../store";
import {deleteItem} from "../../store/actions";

interface IClipItemState {
    clipItem: ClipBoardItem;
}

interface IClipItemProps {
    clipItem: ClipBoardItem
}


export class ClipItem extends Component<IClipItemProps, IClipItemState> {

    constructor(props: IClipItemProps) {
        super(props);
        this.state = {clipItem: this.props.clipItem};
        this.delete = this.delete.bind(this);
    }

    delete() {
        console.log('delete');
        store.dispatch(deleteItem(this.state.clipItem));
    }

    public render() {
        return (
            <div onClick={this.delete}
                 className="ClipItem"
                 dangerouslySetInnerHTML={{__html: this.state.clipItem.elem}}>

            </div>
        );
    }
}

export default ClipItem;
