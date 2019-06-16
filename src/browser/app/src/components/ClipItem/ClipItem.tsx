import React, {Component} from "react";
import {ClipBoardItem} from "../../types";
import './ClipItem.style.scss';
import ClipItemSettings from "../ClipItemSettings/ClipItemSettings";

export interface IClipItemState {
    clipItem: ClipBoardItem;
}

export interface IClipItemProps {
    clipItem: ClipBoardItem
}


export class ClipItem extends Component<IClipItemProps, IClipItemState> {

    constructor(props: IClipItemProps) {
        super(props);
        this.state = {clipItem: this.props.clipItem};
    }

    public render() {
        return (
            <div>
                <ClipItemSettings clipItem={this.state.clipItem}/>
                <div className="ClipItem"
                     dangerouslySetInnerHTML={{__html: this.state.clipItem.elem}}>

                </div>
            </div>
        );
    }
}

export default ClipItem;
