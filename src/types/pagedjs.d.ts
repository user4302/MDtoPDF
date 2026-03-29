declare module 'pagedjs' {
  export class Previewer {
    preview(content: string, css: string[], container: Element): Promise<void>;
  }
}
