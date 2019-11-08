import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {SparklineArea, IProps} from "./SparklineArea";

export class Sparkline implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	//private _value:string;
	// private _values:string;
	// private _separator:string;
	// private _color:string;
	// private _width:number;
	// private _height:number;

	private _notifyOutputChanged:() => void;
	private _container: HTMLDivElement;
	private props: IProps = { values : "", 
								separator : "", 
								color: "", 
								width:0,
								height:0,
								fill:true,
								type:""}
	
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, 
				notifyOutputChanged: () => void, 
				state: ComponentFramework.Dictionary, 
				container:HTMLDivElement)
	{
		// Add control initialization code
		this._notifyOutputChanged = notifyOutputChanged;
		this._container = document.createElement("div");
		// this.props.values = context.parameters.values.raw || "";
		// this.props.separator = context.parameters.separator.raw || ",";
		// this.props.color = context.parameters.separator.raw || "blue";
		// this.props.width = context.parameters.width.raw || 0;
		// this.props.height = context.parameters.height.raw || 0;



		container.appendChild(this._container);
	}

	// notifyChange(values:string, separator:string, color:string) {
	// 	this._values = values;
	// 	this._separator = separator;
	// 	this._color = color;
	// 	this._notifyOutputChanged();
	// }


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		// this._values = context.parameters.values.raw || "";
		// this._separator = context.parameters.separator.raw || ",";
		// this._color = context.parameters.color.raw || "blue";
		// this._width = context.parameters.width.raw || 0;
		// this._height = context.parameters.height.raw || 0;


		this.props.values = context.parameters.values.raw || "";
		this.props.separator = context.parameters.separator.raw || ",";
		this.props.color = context.parameters.color.raw || "blue";
		this.props.width = context.parameters.width.raw || 0;
		this.props.height = context.parameters.height.raw || 0;
		this.props.fill = context.parameters.fill.raw;
		this.props.type = context.parameters.type.raw;

		ReactDOM.render(
			React.createElement(SparklineArea, this.props)
			, this._container
		);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	// public getOutputs(): IOutputs

	// {
	// 	return {
	// 		// values : this._values,
	// 		// separator : this._separator,
	// 		// color : this._color
	// 	};
	// }

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
		ReactDOM.unmountComponentAtNode(this._container);
	}
}