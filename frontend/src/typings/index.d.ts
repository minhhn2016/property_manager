declare interface IAddress {
  street: string;
  number: string;
  postalCode: string;
  city: string;
  municipality: string;
  country: string;
}

declare interface IPosition {
  latitude: Number;
  longitude: Number;
}

declare interface IProperty extends IAddress {
  id?: number;
  propertyName: string;
  description: string;
  position: IPosition;
}

declare interface IAPIResponse {
  list: IProperty[],
  center: [Number, Number]
}

declare interface IPropertyFormProps {
  property?: IProperty;
  open: boolean;
  handleClose: () => void;
}