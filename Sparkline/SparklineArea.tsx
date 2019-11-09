import * as React from 'react';
import {Sparklines, SparklinesLine, SparklinesBars, SparklinesCurve, SparklinesReferenceLine, SparklinesNormalBand, SparklinesSpots, SparklinesText} from 'react-sparklines'

export interface IProps {
    values: string;
    separator: string;
    color:string;
    width: number,
    height:number,
    fill:boolean,
    referenceline:boolean,
    referencelinetype:string,

    sparktype:string
    
}

export interface IState {
    values: string;
    separator: string;
    color:string;
    width:number,
    height:number,
    fill:boolean,
    referenceline:boolean,
    referencelinetype:'max' | 'min' | 'mean' | 'avg' | 'median' | 'custom',

    sparktype:string,

    numbers:number[]
}

export class SparklineArea extends React.Component<IProps, IState> {

    constructor(props: Readonly<IProps>) {
        super(props);

        this.state = { values: props.values, 
                        separator: props.separator,
                        color:props.color,
                        width:props.width,
                        height:props.height,
                        fill:props.fill,
                        referenceline:props.referenceline,
                        referencelinetype:this.getReferenceLineType(props.referencelinetype),
  
                        sparktype:props.sparktype,

                        numbers:props.values.split(props.separator).map(Number)}
                        
        //this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(props: IProps) {
        this.setState({values : props.values ,
                        separator: props.separator,
                        color: props.color,
                        width:props.width,
                        height:props.height,
                        fill:props.fill,
                        referenceline:props.referenceline,
                        referencelinetype:this.getReferenceLineType(props.referencelinetype),

                        sparktype:props.sparktype,
                        numbers:props.values.split(props.separator).map(Number)})
                        
    }

    // handleChange(e: any) {
        
    // }
    getReferenceLineType(value:string):'max' | 'min' | 'mean' | 'avg' | 'median' | 'custom'
    {
        console.log(value);
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

    render() {
        console.log(this.state.referenceline);
        
        var sparklinesType = <></> ;
        switch (this.state.sparktype)
        {
            case "Line":
                sparklinesType = <SparklinesLine color={this.state.color} 
                                                    style={{fill:this.state.fill?"":"none"}}/>
                break;
                
            case "Rounded":
                sparklinesType = <SparklinesCurve color={this.state.color} 
                                                    style={{fill:this.state.fill?"":"none"}}/>      
                break;

            case "Bars":
                sparklinesType = <SparklinesBars style={{fill:this.state.color}}/>
                    
                break;
            default:
                return (<div>ERROR: Accepted values for 'SparkType' are 'Line,Rounded,Bars'</div>)

        }

        var sparklinesReferenceLine = this.state.referenceline == true ? 
                                        <SparklinesReferenceLine type={this.state.referencelinetype} /> :
                                        <></> ;

        

        return (
            <Sparklines data={this.state.numbers} 
                        svgWidth={this.state.width}
                        width={this.state.width}
                        svgHeight={this.state.height}
                        height={this.state.height}
                        >
                        
                {sparklinesType}
                {sparklinesReferenceLine}

            </Sparklines>
        );
        
        
        

    }

}