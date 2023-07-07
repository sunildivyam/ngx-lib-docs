import { ComponentProp } from "./component-props.interface";

export interface ComponentInfo {
    name: string;
    description: string;
    selector: string;
    styleUrl: string;
    styleSource: string;
    templateUrl: string;
    templateSource: string;
    tsUrl: string;
    tsSource: string;
    inputProps: Array<ComponentProp>;
    outputProps: Array<ComponentProp>;
    props: Array<ComponentProp>;
    methods: Array<ComponentProp>;
}
