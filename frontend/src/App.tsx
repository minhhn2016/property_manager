import React from 'react';
import './App.css';

import PropertiesList from './components/PropertiesList';

function App() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<IAPIResponse>();

  const [openCreateForm, setOpenCreateForm] = React.useState<boolean>(false);
  const handleOpenCreate = () => setOpenCreateForm(true);
  const handleCloseCreate = () => setOpenCreateForm(false);

  const [openEditForm, setOpenEditForm] = React.useState<boolean>(false);
  const handleOpenEdit = () => setOpenEditForm(true);
  const handleCloseEdit = () => setOpenEditForm(false);

  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  React.useEffect(() => {
    (
      async () => {
        const response = await fetch('http://localhost:8080/api/properties/all');
        const json = await response.json();
        setData(json);
        setLoading(false);
      }
    )();
  }, [openEditForm, openCreateForm, openDelete]);

  if (loading) return <p>Loading</p>
  return (
    <div className="App">
      {data && (
      <PropertiesList 
        list={data.list}
        openCreateForm={openCreateForm}
        openEditForm={openEditForm}
        handleOpenCreate={handleOpenCreate}
        handleCloseCreate={handleCloseCreate}
        handleOpenEdit={handleOpenEdit}
        handleCloseEdit={handleCloseEdit}
        openDelete={openDelete}
        handleOpenDelete={handleOpenDelete}
        handleCloseDelete={handleCloseDelete}
      />
      )}
    </div>
  );
}

export default App;
