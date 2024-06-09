export interface AttributeInterface {
  key: string;
  value?: string;
}

export interface ElementInterface {
  tag: string;
  children?: string | Element[];
  attributes?: AttributeInterface[];
}
