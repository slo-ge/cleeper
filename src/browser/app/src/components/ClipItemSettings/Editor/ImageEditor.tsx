import React, { Component } from "react";
import { IClipItemProps, IClipItemState } from "../../ClipItem/ClipItem";


export class ImageEditor extends Component<IClipItemProps, IClipItemState> {

    constructor(props: IClipItemProps) {
        super(props);
        this.state = {clipItem: this.props.clipItem};
    }

    public render() {
        return (
            <div className="ClipItem">
                <div dangerouslySetInnerHTML={{__html: this.state.clipItem.elem}}>

                </div>
            </div>
        );
    }
}

export default ImageEditor;
