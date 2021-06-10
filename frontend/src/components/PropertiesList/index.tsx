import React from 'react';

import { Button, List, ListItem, ListItemText } from '@material-ui/core';

import PropertyForm from './PropertyForm';

const PropertiesList = ({ list }: IAPIResponse) => {
  const [openForm, setOpenForm] = React.useState<boolean>(false);
  const handleOpen = () => setOpenForm(true);
  const handleClose = () => setOpenForm(false);
  return (
    <div>
      {list.length ? (
        <List>
          {list.map(item => <ListItem>
            <ListItemText primary={item.propertyName} />
          </ListItem>)}
        </List>
      ) : (
        <p>Your properties list is empty..</p>
      )}
      <Button onClick={handleOpen}>
        Add a property
      </Button>
      <PropertyForm
        open={openForm}
        handleClose={handleClose}
      />
    </div>
  )
}

export default PropertiesList;