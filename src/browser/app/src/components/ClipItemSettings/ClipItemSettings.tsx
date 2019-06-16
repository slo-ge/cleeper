import React, {Component} from "react";
import './ClipItemSettings.style.scss';
import store from "../../store";
import {deleteItem} from "../../store/actions";
import {IClipItemProps, IClipItemState} from "../ClipItem/ClipItem";

interface ClipItemSettingsState extends IClipItemState {
    dialog: boolean;
}

export class ClipItemSettings extends Component<IClipItemProps, ClipItemSettingsState> {
    constructor(props: IClipItemProps) {
        super(props);
        this.state = {
            clipItem: this.props.clipItem,
            dialog: false
        };
        this.delete = this.delete.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    delete() {
        store.dispatch(deleteItem(this.state.clipItem));
    }

    toggle() {
        this.setState({dialog: !this.state.dialog});
    }

    public render() {
        let toggleDeleteDialog = this.state.dialog;
        let dialog;
        if (toggleDeleteDialog) {
            dialog =
                <div className="task delete dialog" onClick={this.toggle}>
                    <div>Are you sure</div>
                    <div className="yesno">
                        <span className="yes" onClick={this.delete}>yes</span>
                        <span className="no" onClick={this.toggle}>no</span>
                    </div>
                </div>;
        } else {
            dialog = <div className="task delete" onClick={this.toggle}>Delete</div>;
        }

        return (
            <div className="ClipItemSettings">
                {dialog}
            </div>
        );
    }
}

export default ClipItemSettings;
