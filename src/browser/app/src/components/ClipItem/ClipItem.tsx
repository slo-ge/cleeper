import React, {Component} from "react";
import {ClipBoardItem} from "../../types";
import './ClipItem.style.scss';

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
    }

    public render() {
        return (
            <div className="ClipItem" dangerouslySetInnerHTML={{__html: this.state.clipItem.elem}}></div>
        );
    }
}

export default ClipItem;
