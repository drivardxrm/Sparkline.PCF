import * as React from 'react';
import {Sparklines, SparklinesLine, SparklinesBars, SparklinesCurve} from 'react-sparklines'

export interface IProps {
    values: string;
    separator: string;
    color:string;
    width: number,
    height:number,
    fill:boolean,
    type:string
    
}

export interface IState {
    values: string;
    separator: string;
    color:string;
    width:number,
    height:number,
    fill:boolean,
    type:string,

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
                        type:props.type,

                        numbers:props.values.split(props.separator).map(Number)}
                        
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(props: IProps) {
        this.setState({values : props.values ,
                        separator: props.separator,
                        color: props.color,
                        width:props.width,
                        height:props.height,
                        fill:props.fill,
                        type:props.type,
                        numbers:props.values.split(props.separator).map(Number)})
                        
    }

    handleChange(e: any) {
        
    }

    render() {
        console.log(this.state.color);
        
        switch (this.state.type)
            {
                case "Line":
                    return (
                            <Sparklines data={this.state.numbers} 
                                        svgWidth={this.state.width} 
                                        svgHeight={this.state.height}>
                                <SparklinesLine color={this.state.color} 
                                                style={{fill:this.state.fill?"":"none"}}/>
                            </Sparklines>
                    );
                    
                case "Rounded":
                    return (
                            <Sparklines data={this.state.numbers} 
                                        svgWidth={this.state.width} svgHeight={this.state.height}>
                                <SparklinesCurve color={this.state.color} 
                                                style={{fill:this.state.fill?"":"none"}}/>
                            </Sparklines>
                    );
                case "Bars":
                    return (
                        <Sparklines data={this.state.numbers} 
                                    svgWidth={this.state.width} svgHeight={this.state.height}>
                            <SparklinesBars style={{fill:this.state.color}}/>
                        </Sparklines>
                    );
                    break;
                default:
                    null

            }
        
        
        

    }

}