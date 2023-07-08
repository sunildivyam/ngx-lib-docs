import {
  Component,
  ComponentRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DocsData, DocsParserService, ComponentProp } from '@annuadvent/ngx-lib-docs/docs-common';
import { ComponentInfo } from '@annuadvent/ngx-lib-docs/docs-common';

@Component({
  selector: 'anu-component-usage',
  templateUrl: './component-usage.component.html',
  styleUrls: ['./component-usage.component.scss'],
})
export class ComponentUsageComponent implements OnInit, OnChanges {
  /**
   * Component info, that usually comes from the compdoc generated json.
   */
  @Input() componentInfo: ComponentInfo = null;
  /**
   * Component Class, eg. MenuComponent, TabsComponent etc.
   */
  @Input() componentType: Type<any> = null;
  /**
   * Component Usage sample data, usually comes from "component-name.docs.ts" file
   * present in the component's folder.
   */
  @Input() componentData: DocsData = null;
  /**
   * Container where the component renders.
   */
  @ViewChild('vc', { static: true, read: ViewContainerRef }) cmpContainer: ViewContainerRef;

  cmpRef: ComponentRef<any>;
  cmpInstance: any;
  cmpContent: Array<Array<any>>;
  usageSource: string;
  outputPropResults: Array<any> = [];

  // Properties Form Vars
  inputPropsValues: any = {};

  constructor(
    @Inject(Renderer2) private readonly renderer: Renderer2,
    private docsParserService: DocsParserService) { }

  ngOnInit(): void {
    this.renderComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.renderComponent();
  }

  private renderComponent() {
    this.cmpContainer.clear();
    if (this.cmpRef) this.cmpRef.destroy();
    this.cmpInstance = null;
    this.inputPropsValues = {};
    this.outputPropResults = [];

    if (!this.componentInfo || !this.componentType) return;

    this.cmpRef = this.cmpContainer.createComponent(this.componentType, {
      index: 0,
      projectableNodes: this.getContentToProject()
    })

    this.cmpInstance = this.cmpRef.instance;

    // Init form InputProps
    this.componentInfo.inputProps.forEach(prop => {
      const propValue = this.componentData?.inputPropsValues?.[prop.name] || prop.defaultValue;
      this.inputPropsValues[prop.name] = this.docsParserService.parsePropValueToStr(prop, propValue);
    });

    // Set Input props
    this.setInputProps();
    this.setOutputProps();
    this.buildUsageSource();
  }

  private getContentToProject(): any {
    const el = this.renderer.createElement('div');
    el.innerHTML = this.componentData?.projectionContent || '';
    const componentContent = [];
    for (let chNode of el.childNodes) {
      componentContent.push([chNode])
    }

    return componentContent;
  }

  private setInputProps() {
    if (!this.componentInfo) return;
    this.componentInfo.inputProps.map(prop => {
      this.cmpInstance[prop.name] = this.docsParserService.parsePropValue(prop, this.inputPropsValues[prop.name]);
    })

    // Due to a Bug in angular, ngOnChanges() does not gets triggered for dynamically generated components. So we need to call it explicitly.
    // But we can not pass changes param to it, so DO NOT use changes in your dynamically generated components.
    if (this.cmpInstance['ngOnChanges']) this.cmpInstance['ngOnChanges']();
  }

  private setOutputProps() {
    if (!this.componentInfo) return;
    const outputProps = this.componentInfo.outputProps || [];

    for (let prop of outputProps) {
      this.cmpInstance[prop.name]
      if (this.cmpInstance[prop.name]) this.cmpInstance[prop.name].unsubscribe();
      this.cmpInstance[prop.name] = null;
      this.cmpInstance[prop.name] = new EventEmitter<any>();
      this.cmpInstance[prop.name].subscribe(result => {
        let resultStr = '';
        try {
          resultStr = JSON.stringify(result, null, '\t');
        } catch (error: any) {
          resultStr = result;
        }
        setTimeout(() => {
          this.outputPropResults.push({ prop, resultStr });
        });
      })
    }
  }

  private buildUsageSource(): string {
    const componentInfo = this.componentInfo;

    if (!componentInfo) return '';
    // Open the tag
    let usageSrc = `<${componentInfo.selector} `;

    // Add Properties
    componentInfo.inputProps.forEach(prop => {
      const propVal = this.inputPropsValues[prop.name];
      usageSrc += `\n\t[${prop.name}]='${propVal}'`
    })

    // add projectedContent source
    const projectedContent = this.componentData?.projectionContent || '';
    usageSrc += projectedContent ? `>\n\t${projectedContent}` : '>';

    // Close the tag
    usageSrc += `\n</${componentInfo.selector}>`;
    this.usageSource = usageSrc;

    return usageSrc;
  }

  public inputPropsChanged(event: any, prop: ComponentProp): void {
    if (prop.type === 'boolean') {
      this.inputPropsValues[prop.name] = event;
    }

    this.buildUsageSource();
    this.setInputProps();
  }

  public clearOutputPropResults(event: any): void {
    event.preventDefault();
    this.outputPropResults = [];
  }
}
