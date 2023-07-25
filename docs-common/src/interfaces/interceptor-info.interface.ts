import { ComponentProp } from "./component-props.interface";

export interface InterceptorInfo {
    name: string;
    description: string;
    tsUrl: string;
    tsSource: string;
    inputProps: Array<ComponentProp>;
    outputProps: Array<ComponentProp>;
    props: Array<ComponentProp>;
    methods: Array<ComponentProp>;
}
