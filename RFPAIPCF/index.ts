import { IInputs, IOutputs } from "./generated/ManifestTypes";
import App from "./src/App";
import * as React from "react";
import * as ReactDOM from "react-dom";

export class RFPAIPCF implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    constructor()
    {

    }
    public init(
        context: ComponentFramework.Context<IInputs>, 
        notifyOutputChanged: () => void, 
        state: ComponentFramework.Dictionary, 
        container:HTMLDivElement): void
    {
        this.container = container;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // Add code to update control view
        ReactDOM.render(React.createElement(App), this.container)
    }

    public getOutputs(): IOutputs
    {
        return {};
    }

    public destroy(): void
    {
        
    }
}
