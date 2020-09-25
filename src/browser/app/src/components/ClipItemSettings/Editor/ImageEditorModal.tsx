import React, { Component } from "react";
import { IClipItemProps, IClipItemState } from "../../ClipItem/ClipItem";
import ImageEditor from "./ImageEditor";
import { Modal } from "@material-ui/core";

export interface ImageEditorModalState extends IClipItemState {
    showModal: boolean;
}

export class ImageEditorModal extends Component<IClipItemProps, ImageEditorModalState> {

    constructor(props: IClipItemProps) {
        super(props);
        this.state = {
            clipItem: this.props.clipItem,
            showModal: false
        };
        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal() {
        console.log('show modal');
        this.setState({showModal: true});
    }

    public render() {
        return (
            <div>
                <div onClick={this.toggleModal}>
                    open modal
                </div>

                <Modal open={this.state.showModal}>
                    <div className="Modal">
                        <ImageEditor clipItem={this.state.clipItem}/>
                    </div>
                </Modal>
            </div>

        );
    }
}

export default ImageEditorModal;

