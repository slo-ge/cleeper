import React, {Component} from "react";
import './ClipItemSettings.style.scss';
import store from "../../store";
import {deleteItem, pushItem} from "../../store/actions";
import {IClipItemProps, IClipItemState} from "../ClipItem/ClipItem";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import NoteAdd from '@material-ui/icons/NoteAdd';
import {AppUtils} from '../../App.utils';

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
        this.duplicate = this.duplicate.bind(this);
    }

    delete() {
        store.dispatch(deleteItem(this.state.clipItem));
    }

    duplicate() {
        const tempItem = {...this.state.clipItem};
        tempItem.UID = AppUtils.uuidv4();
        store.dispatch(pushItem(tempItem));
    }

    toggle() {
        this.setState({dialog: !this.state.dialog});
    }

    public render() {
        let dialog = (
            <div>
                <List>
                    <ListItem onClick={this.delete} button key="Delete">
                        <ListItemIcon><DeleteOutlinedIcon/></ListItemIcon>
                        <ListItemText primary="Delete"/>
                    </ListItem>
                    <ListItem onClick={this.duplicate} button key="duplicate">
                        <ListItemIcon><NoteAdd/></ListItemIcon>
                        <ListItemText primary="Duplicate"/>
                    </ListItem>
                </List>
            </div>
        );


        return (
            <div className="ClipItemSettings">
                <div className="task delete" onClick={this.toggle}>Edit</div>
                <Drawer anchor="top" open={this.state.dialog} onClose={this.toggle}>
                    {dialog}
                </Drawer>
            </div>
        );
    }
}

export default ClipItemSettings;
