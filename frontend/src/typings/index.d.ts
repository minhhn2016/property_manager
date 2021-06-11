declare interface IAddress {
  street: string;
  number: string | null | undefined;
  postalCode: string;
  city: string;
  municipality: string;
  country: string;
}

declare interface IPosition {
  latitude: number;
  longitude: number;
}

declare interface IProperty extends IAddress {
  id?: number;
  propertyName: string;
  description: string;
  position: IPosition;
}

type CoordinatesList = [number, number]
declare interface IAPIResponse {
  list: IProperty[];
  center: CoordinatesList;
}

declare interface IPropertyFormProps {
  property?: IProperty;
  open: boolean;
  handleClose: () => void;
}

declare interface IPropertiesListProps {
  list: IProperty[],
  openCreateForm: boolean;
  handleOpenCreate: () => void;
  handleCloseCreate: () => void;
  openEditForm: boolean;
  handleOpenEdit: () => void;
  handleCloseEdit: () => void;
  openDelete: boolean;
  handleOpenDelete: () => void;
  handleCloseDelete: () => void;
}

declare module 'react-leaflet-markercluster';