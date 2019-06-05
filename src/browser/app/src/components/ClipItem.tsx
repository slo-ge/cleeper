import React, {Component} from "react";
import {ClipBoardItem} from "../types";

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
            <div dangerouslySetInnerHTML={{__html: this.state.clipItem.elem}}></div>
        );
    }
}

export default ClipItem;
