export interface ComponentProp {
    name: string;
    type?: string;
    defaultValue?: string;
    deprecated?: boolean;
    deprecationMessage?: string;
    description?: string;
    accessModifier?: string;
    returnType?: string;
    args?: Array<any>;
}
