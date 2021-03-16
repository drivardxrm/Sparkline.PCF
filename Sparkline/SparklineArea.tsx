import * as React from "react";
import { useCallback } from "react";
import {Sparklines, SparklinesLine, SparklinesBars, SparklinesCurve, SparklinesReferenceLine} from "react-sparklines"

export interface IProps {
    values?: string;
    separator?: string;
    color?:string;
    width?: number,
    height?:number,
    min?:number,
    max?:number,
    fill?:boolean,
    referenceline?:boolean,
    referencelinetype?: "max" | "min" | "mean" | "avg" | "median" | "custom",
    sparktype?:"Line"|"Rounded"|"Bars"   
}

const SparklineArea = (props : IProps): JSX.Element => {

    
    const numbers = useCallback(():number[] => {

        return props.values?.split(props.separator || ",").map(Number) || [];    

    }, [props.values]);



    return (
        <div>
            <Sparklines data={numbers()} 

                    svgWidth={(props.width || 0) <= 250 ? props.width : 250}
                    svgHeight={props.height}
                    min={props.min}
                    max={props.max}>


                {props.sparktype === "Bars" ?
                    <SparklinesBars style={{fill:props.color}}/> :
                    (props.sparktype === "Line" ? 
                        <SparklinesLine color={props.color} style={{fill:props.fill?"":"none"}}/> : 
                        (props.sparktype === "Rounded" ? 
                            <SparklinesCurve color={props.color}  style={{fill:props.fill?"":"none"}}/> :
                            <></>
                        )
                    )
                }

                {props.referenceline ? <SparklinesReferenceLine type={props.referencelinetype} /> : <></>}

            </Sparklines>
        </div>

        
    );
}
export default SparklineArea;
