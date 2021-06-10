import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Typography } from '@material-ui/core';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';


const PropretyForm = (props: IPropertyFormProps) => {
  const [formValue, setFormValue] = React.useState<IProperty>(props.property || {
    propertyName: "",
    description: "",
    street: "",
    number: "",
    postalCode: "",
    city: "",
    municipality: "",
    country: "",
    position: {
      latitude: 0,
      longitude: 0
    }
  });
  const { open, handleClose } = props;
  const headerText = props.property ? 'Edit your property' : 'Add a new property';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({...formValue , [event.target.name] : event.target.value});
  };

  function handleSelect(value: any) {
    const { properties: {
      street, housenumber, postcode, city, county, country, lat, lon
    }} = value
    setFormValue({
      ...formValue,
      street: street,
      number: housenumber,
      postalCode: postcode,
      city: city,
      municipality: county,
      country: country,
      position: {
        latitude: lat,
        longitude: lon
      }
    })
    return {}
  }

  function onSuggectionChange(value: any) {
    console.log(value);
    return {};
  }

  function preprocessHook(value: any) {
    return `${value}`
  }

  function postprocessHook(feature: any) {
    return `${feature.properties.address_line1} - ${feature.properties.address_line2}`;
  }

  function suggestionsFilter(suggestions: any) {
    const processedStreets: any[] = [];

    const filtered = suggestions.filter((value : any)=> {
      if (!value.properties.street || processedStreets.indexOf(value.properties.street) >= 0) {
        return false;
      } else {
        processedStreets.push(value.properties.street);
        return true;
      }
    })

    return filtered;
  }

  const handleSave = (property: IProperty) => {
    (
      async () => {
        const requestSettings = props.property
          ? {
            method: 'PUT',
            url: `http://localhost:8080/api/properties/${props.property.id}`,
            body: JSON.stringify(Object.assign(property, {id: props.property.id}))
          } : {
            method: 'POST',
            url: `http://localhost:8080/api/properties`,
            body: JSON.stringify(property)
          }

        console.log('body', requestSettings)
        await fetch(requestSettings.url, {
          method: requestSettings.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: requestSettings.body,
        });
      }
    )();
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{headerText}</DialogTitle>
      <DialogContent style={{ minHeight: '600px' }}>
        <form>
          <div>
            <Typography variant="caption" component="p" gutterBottom>
              Search and select your property address:
            </Typography>
            <GeoapifyContext apiKey="54dccf9d67834b61b39d32d61229e4e6">
              <GeoapifyGeocoderAutocomplete 
                placeholder="Enter address here"
                // type={type}
                // lang={language}
                // position={position}
                // countryCodes={countryCodes}
                limit={10}
                value={""}
                placeSelect={handleSelect}
                suggestionsChange={onSuggectionChange}
                preprocessHook={preprocessHook}
                postprocessHook={postprocessHook}
                suggestionsFilter={suggestionsFilter}
              />
            </GeoapifyContext>
            <TextField 
              fullWidth
              name="street"
              label="Street"
              value={formValue.street}
              disabled
            />
            <TextField 
              fullWidth
              name="number"
              label="Number"
              value={formValue.number}
              disabled
            />
            <TextField 
              fullWidth
              name="postalCode"
              label="Postal Code"
              value={formValue.postalCode}
              disabled
            />
            <TextField 
              fullWidth
              name="city"
              label="City"
              value={formValue.city}
              disabled
            />
            <TextField 
              fullWidth
              name="municipality"
              label="Municipality"
              value={formValue.municipality}
              disabled
            />
            <TextField 
              fullWidth
              name="country"
              label="Country"
              value={formValue.country}
              disabled
            />
            <Divider variant="middle" />
            <Typography variant="caption" component="p" gutterBottom>
              Enter some information about the property:
            </Typography>
            <TextField
              fullWidth
              name="propertyName"
              required label="Property Name" 
              defaultValue={props.property?.propertyName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="description" 
              multiline 
              label="Description"
              defaultValue={props.property?.description} 
              onChange={handleChange}
            />

          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSave(formValue)}>
          Save
        </Button>
        <Button onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PropretyForm