import {
  Directive,
  ViewContainerRef,
  Input,
  OnChanges,
  ComponentRef,
  Compiler,
  ModuleWithComponentFactories,
  Component,
  NgModule,
  Type
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Directive({
  selector: "[compile]"
})
export class CompileDirective implements OnChanges {
  @Input() compile: string;
  @Input() compileContext: any;
  @Input() compileCss: any;
  @Input() compileModules: any;

  compRef: ComponentRef<any>;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) {}

  ngOnChanges() {
    if (!this.compile) {
      if (this.compRef) {
        this.updateProperties();
        return;
      }
    }

    this.vcRef.clear();
    this.compRef = null;

    const component = this.createDynamicComponent(this.compile, this.compileCss);
    const module = this.createDynamicModule(component, this.compileModules);
    this.compiler
      .compileModuleAndAllComponentsAsync(module)
      .then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
        let compFactory = moduleWithFactories.componentFactories.find(
          x => x.componentType === component
        );

        this.compRef = this.vcRef.createComponent(compFactory);
        this.updateProperties();
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateProperties() {
    for (var prop in this.compileContext) {
      this.compRef.instance[prop] = this.compileContext[prop];
    }
  }

  private createDynamicComponent(template: string, compileCss : any) {
    @Component({
      selector: "custom-dynamic-component",
      template: template,
      styles: compileCss
    })
    class CustomDynamicComponent {}
    return CustomDynamicComponent;
  }

  private createDynamicModule(component: Type<any>, importModules: Type<any>) {
    @NgModule({
      // You might need other modules, providers, etc...
      // Note that whatever components you want to be able
      // to render dynamically must be known to this module
      imports: [CommonModule, importModules],
      declarations: [component]
    })
    class DynamicModule {}
    return DynamicModule;
  }
}