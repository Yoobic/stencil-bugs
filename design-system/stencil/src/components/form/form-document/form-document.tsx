import { Component, Element, Event, EventEmitter, Prop, Method } from '@stencil/core';
import { IFormDocument, IFile } from '@shared/interfaces';

import { getBackImageStyle, cloudinary } from '../../../utils/helpers';
import { pipes } from '../../../utils/pipes';
import { services } from '../../../services';

@Component({
    tag: 'yoo-form-document',
    styleUrl: 'form-document.scss',
    scoped: true
})
export class YooFormDocumentComponent implements IFormDocument {

    @Prop() document: IFile;
    @Prop() type: 'image' | 'document';
    @Prop() readonly: boolean;

    @Event() validityChanged: EventEmitter<boolean>;
    @Event() inputBlurred: EventEmitter<any>;
    @Event() inputFocused: EventEmitter<boolean>;
    @Event() inputChanged: EventEmitter<any>;

    @Element() host: HTMLStencilElement;
    public preview: string;
    public isVideo: boolean = false;
    public icon: string;
    public filename: string;

    componentWillLoad() {
        this.updateDocumentInfo();
    }

    @Method()
    isValid() {
        return true;
    }

    updateDocumentInfo() {
        if (this.document && this.document._downloadURL && (this.type === 'image' || services.files.isVideo(this.document._downloadURL) || (services.files.isDocument(this.document._downloadURL) && services.files.getExtension(this.document._downloadURL) === 'pdf') || services.files.isImage(this.document._downloadURL))) {
            this.preview = this.document._downloadURL;
            if (services.files.isDocument(this.document._downloadURL)) {
                this.preview = services.files.toPng(this.preview);
            }
            if (services.files.isVideo(this.preview)) {
                this.preview = services.files.toPng(this.preview);
                this.isVideo = true;
            }
        }

        if (this.document) {
            this.icon = services.files.getIcon(this.document);
            this.filename = this.document._filename;
        } else {
            this.icon = this.type === 'image' ? 'yo-image' : 'yo-document';
            this.filename = '';
        }
    }

    renderBase() {
        return <div class="container">
            {
                this.type === 'image' ?
                    <div class="image-container" style={getBackImageStyle(cloudinary(this.document._downloadURL, 500, 500))}>
                    </div>
                    :
                    <div class="document-container">
                        <yoo-card-file
                            heading={this.filename}
                            subheading={pipes.fileSize.transform(this.document.size)}
                            icon={this.icon}
                            imgSrc={this.preview}
                            class={this.host.className}
                        ></yoo-card-file>
                    </div>
            }
        </div>;
    }

    renderReadonly() {
        return this.renderBase();
    }

    renderEditable() {
        return this.renderBase();
    }

    render(): JSX.Element {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
}
