import React from 'react';

import { Button, Dialog, DialogActions, DialogTitle, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import PropertyForm from './PropertyForm';

const PropertiesList = (props: IPropertiesListProps) => {
  const {
    list, 
    openCreateForm, 
    openEditForm, 
    handleCloseCreate, 
    handleCloseEdit, 
    handleOpenCreate, 
    handleOpenEdit,
    openDelete,
    handleOpenDelete,
    handleCloseDelete,
  } = props

  const handleDeteleProperty = (id: number | undefined) => {
    (
      async () => {
        await fetch(`http://localhost:8080/api/properties/${id}`, {
          method: 'DELETE',
        })
        handleCloseDelete();
      }
    )();
  }

  return (
    <div>
      {list.length ? (
        <List>
          {list.map(item => 
            <ListItem key={`property-${item.id}`}>
              <ListItemText
                primary={item.propertyName}
                secondary={`${item.street} ${item.number}, ${item.postalCode} ${item.city}, ${item.country}`}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="edit" onClick={handleOpenEdit}>
                  <CreateIcon />
                </IconButton>
                <PropertyForm
                  property={item}
                  open={openEditForm}
                  handleClose={handleCloseEdit}
                />
                <IconButton aria-label="delete" onClick={handleOpenDelete}>
                  <DeleteIcon />
                </IconButton>
                <Dialog
                  open={openDelete}
                  onClose={handleCloseDelete}
                >
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogActions>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => handleDeteleProperty(item.id)}
                    >
                      Yes
                    </Button>
                    <Button onClick={handleCloseDelete}>
                      No
                    </Button>
                  </DialogActions>
                </Dialog>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      ) : (
        <p>Your properties list is empty..</p>
      )}
      <Button variant="contained" onClick={handleOpenCreate}>
        Add a property
      </Button>
      <PropertyForm
        open={openCreateForm}
        handleClose={handleCloseCreate}
      />
    </div>
  )
}

export default PropertiesList;