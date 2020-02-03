import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SparklineArea, {IProps} from "./SparklineArea";


export class Sparkline implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	

	private _notifyOutputChanged:() => void;
	private _container: HTMLDivElement;
	private props: IProps = { values : "", 
								separator : "", 
								color: "", 
								width:0,
								height:0,
								fill:false,
								referenceline:false,
								referencelinetype:"median",
								sparktype:""}
	
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

		container.appendChild(this._container);
	}

	


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view

		this.props.values = context.parameters.values.raw || "";
		this.props.separator = context.parameters.separator.raw || ",";
		this.props.color = context.parameters.color.raw || "blue";
		this.props.width = context.parameters.width.raw || 0;
		this.props.height = context.parameters.height.raw || 0;
		
		this.props.fill = this.GetBoolFrom(context.parameters.fill.raw)
		this.props.referenceline = this.GetBoolFrom(context.parameters.referenceline.raw);
		this.props.referencelinetype = this.GetReferenceLineType(context.parameters.referencelinetype.raw || "");
		
		this.props.sparktype = context.parameters.sparktype.raw;

		ReactDOM.render(
			React.createElement(SparklineArea, this.props)
			, this._container
		);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs

	{
		return {
			
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
		ReactDOM.unmountComponentAtNode(this._container);
	}

	public GetBoolFrom(prop: any):boolean
	{
		switch(typeof(prop))
		{
			case "boolean":
				return prop;
			case "string":
				return prop.toLowerCase() == "true" ;
			case "number":  //Assumes that 1 = true
					return prop == 1 ;
			default:
				return false;	
			
		}

	}

	public GetReferenceLineType(value:string):'max' | 'min' | 'mean' | 'avg' | 'median' | 'custom'
    {
        switch(value.toLowerCase())
        {
            case "max":
                return 'max';
            case "min":
                return 'min';
            case "mean":
                return 'mean';
            case "avg":
                return 'avg';
            case "median":
                return 'median';

            default:
                return 'mean';

        }
    }
}