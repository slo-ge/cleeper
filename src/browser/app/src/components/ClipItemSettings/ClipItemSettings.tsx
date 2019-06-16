import React, {Component} from "react";
import './ClipItemSettings.style.scss';
import store from "../../store";
import {deleteItem} from "../../store/actions";
import {IClipItemProps, IClipItemState} from "../ClipItem/ClipItem";

export class ClipItemSettings extends Component<IClipItemProps, IClipItemState> {

    constructor(props: IClipItemProps) {
        super(props);
        this.state = {clipItem: this.props.clipItem};
        this.delete = this.delete.bind(this);
    }

    delete() {
        store.dispatch(deleteItem(this.state.clipItem));
    }

    public render() {
        return (
            <div className="ClipItemSettings">
                <div onClick={this.delete}>
                    Delete
                </div>
            </div>
        );
    }
}

export default ClipItemSettings;
