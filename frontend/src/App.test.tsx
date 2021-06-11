import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

import PropertiesList from './components/PropertiesList';

test('renders loading indicator', () => {
  render(<App />);
  const loader = screen.getByRole(/progressbar/i);
  expect(loader).toBeInTheDocument();
});


test('render list with empty data', () => {
  const mockData = {
    list: [],
    openCreateForm: false,
    openEditForm: false,
    handleOpenCreate: jest.fn(),
    handleCloseCreate: jest.fn(),
    handleOpenEdit: jest.fn(),
    handleCloseEdit: jest.fn(),
    openDelete: false,
    handleOpenDelete: jest.fn(),
    handleCloseDelete: jest.fn()
  };

  render(<PropertiesList {...mockData} />);

  expect(screen.getByText('Your properties list is empty..')).toBeInTheDocument();

  const addPropertyBtn = screen.getByText('Add a property');
  expect(addPropertyBtn).toBeInTheDocument();
  fireEvent.click(addPropertyBtn);
  expect(mockData.handleOpenCreate).toBeCalled();
});
