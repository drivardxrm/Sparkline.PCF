import * as React from "react";
import {Sparklines, SparklinesLine, SparklinesBars, SparklinesCurve, SparklinesReferenceLine} from "react-sparklines"
import { useState, useLayoutEffect } from "react";

export interface IProps {
    values: string;
    separator: string;
    color:string;
    width: number,
    height:number,
    fill:boolean,
    referenceline:boolean,
    referencelinetype: 'max' | 'min' | 'mean' | 'avg' | 'median' | 'custom',
    sparktype:string   
}

const SparklineArea = (props : IProps): JSX.Element => {

    //STATE HOOKS VARIABLES
    const [numbers, setNumbers] = useState<number[]>(props.values.split(props.separator).map(Number));
    const [sparklineType, setSparklineType] = useState<JSX.Element>(<></>);
    const [sparklineReferenceLine, setSparklineReferenceLine] = useState<JSX.Element>(<></>);

    //LAYOUTEFFECT HOOKS - before rendering
    useLayoutEffect(() => {

        setNumbers(props.values.split(props.separator).map(Number));    

        switch (props.sparktype)
        {
            case "Line":
                setSparklineType( <SparklinesLine color={props.color} style={{fill:props.fill?"":"none"}}/>);
                break;
                
            case "Rounded":
                setSparklineType( <SparklinesCurve color={props.color}  style={{fill:props.fill?"":"none"}}/> );     
                break;

            case "Bars":
                setSparklineType( <SparklinesBars style={{fill:props.color}}/> );
                break;
            default:
                break;

        }

        props.referenceline == true ? 
            setSparklineReferenceLine(<SparklinesReferenceLine type={props.referencelinetype} />) :
            setSparklineReferenceLine(<></>) ;


    }, [props]);


    return (
        <div>
            <Sparklines data={numbers} 

                    svgWidth={props.width <= 250 ? props.width : 250}
                    svgHeight={props.height}>
                    
                {sparklineType}
                {sparklineReferenceLine}

            </Sparklines>
        </div>

        
    );
}
export default SparklineArea;
