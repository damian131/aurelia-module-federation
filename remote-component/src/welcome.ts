import { Container, inject } from "aurelia-framework";

@inject(Container)
export class Welcome {
  constructor(private readonly container: Container) {
    this.rootContainer = container.root;
  }

  private rootContainer: Container;

  resolvables: string[] = [];

  activate(): void {
    const resolvers = (this.rootContainer as Record<string, any>)["_resolvers"] as Map<any, any>;
    const keys = Array.from(resolvers.keys());
    this.resolvables = keys.map(r =>
      typeof r === "function" ?
        (/^function\s+([^(]+)/.exec(r.toString())?.[1] ?? r.toString()) + " (ctor)" :
        r.constructor.name + " (instance)"
    ).sort();
  }
}
