import { Type } from "@angular/core";
import { ClassInfo } from "./class-info.interface";
import { ComponentInfo } from "./component-info.interface";
import { DirectiveInfo } from "./directive-info.interface";
import { DocsData } from "./docs-common.interface";
import { GuardInfo } from "./guard-info.interface";
import { InterceptorInfo } from "./interceptor-info.interface";
import { InterfaceInfo } from "./interface-info.interface";
import { ServiceInfo } from "./service-info.interface";

export interface ComponentTypes {
    [key: string]: Type<any>;
}

export interface ServiceTypes {
    [key: string]: Type<any>;
}

export interface ComponentData {
    [key: string]: DocsData;
}

export interface LibAssetsInfo {
    components?: Array<ComponentInfo>;
    services?: Array<ServiceInfo>;
    directives?: Array<DirectiveInfo>;
    interfaces?: Array<InterfaceInfo>;
    guards?: Array<GuardInfo>;
    classes?: Array<ClassInfo>;
    interceptors?: Array<InterceptorInfo>;
}

export type LibAssetInfo = ComponentInfo | ServiceInfo | DirectiveInfo | InterfaceInfo | GuardInfo | ClassInfo | InterceptorInfo;

export interface LibInfo {
    name: string;
    fullName: string;
    version: string;
    description: string;        // from package.json description, can be used for metaInfo
    descriptionHtml: string;    // from readme.md
    keywords: Array<string>;    // from package.json keywords, can be used for metaInfo
    homepage: string;
    bugs: string;
    git: string;
    dependencies: Array<string>;
    node: string;
    npm: string;
    libAssetsInfo?: LibAssetsInfo;
    componentTypes?: ComponentTypes;
    serviceTypes?: ServiceTypes;
    componentData?: ComponentData;
}

export interface LibsInfo {
    [key: string]: LibInfo;
}
