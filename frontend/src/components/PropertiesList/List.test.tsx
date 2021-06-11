import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import PropertiesList from './index';
import PropertyForm from './PropertyForm';
import userEvent from '@testing-library/user-event';

let mockData = {
  list: [
    {
      "id":0,
      "propertyName":"my house",
      "description":"",
      "street":"Markkinatie",
      "number":"12",
      "postalCode":"00780",
      "city":"Helsinki",
      "municipality":"Uusimaa",
      "country":"Finland",
      "position":{
        "latitude":60.250595,
        "longitude":25.003704
      }
    }
  ],
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

test('render list with some data', () => {
  render(<PropertiesList {...mockData} />);

  expect(screen.getByText('my house')).toBeInTheDocument();
  expect(screen.getByText('Markkinatie 12, 00780 Helsinki, Finland')).toBeInTheDocument();

  const addPropertyBtn = screen.getByText('Add a property');
  expect(addPropertyBtn).toBeInTheDocument();
  fireEvent.click(addPropertyBtn);
  expect(mockData.handleOpenCreate).toBeCalled();

  const editPropertyBtn = screen.getByLabelText('edit');
  expect(editPropertyBtn).toBeInTheDocument();
  fireEvent.click(editPropertyBtn);
  expect(mockData.handleOpenEdit).toBeCalled();

  const deletePropertyBtn = screen.getByLabelText('delete');
  expect(deletePropertyBtn).toBeInTheDocument();
  fireEvent.click(deletePropertyBtn);
  expect(mockData.handleOpenDelete).toBeCalled();
});

test('render create form', async () => {
  const mockCreateFormData = {
    open: true,
    handleClose: mockData.handleCloseCreate
  }

  render(<PropertyForm {...mockCreateFormData} />);

  expect(screen.getByText('Add a new property')).toBeInTheDocument();
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  const allInputs = screen.getAllByRole('textbox')
  expect(allInputs.map(item => item.textContent === "")).toBeTruthy();

  const addressSearchBox = screen.getByPlaceholderText('Enter address here');

  userEvent.type(addressSearchBox, 'Markkinatie 12');
  expect(addressSearchBox).toHaveValue('Markkinatie 12');

  await waitFor(() => expect(screen.getByText(/Markkinatie 12/ig)), {timeout: 1500});
  fireEvent.click(screen.getByText(/Markkinatie 12/ig));
  expect(allInputs.map(item => item.textContent !== "")).toBeTruthy();

  const propertyName = screen.getByLabelText('propertyName');
  const description = screen.getByLabelText('description');

  expect(propertyName).toHaveTextContent('Property Name');
  expect(description).toHaveTextContent('Description');

  const closeBtn = screen.getByText('Close');
  fireEvent.click(closeBtn);
  expect(mockCreateFormData.handleClose).toBeCalled();

});

test('render edit form', async () => {
  const mockEditFormData = {
    property: mockData.list[0],
    open: true,
    handleClose: mockData.handleCloseCreate
  }

  const {
    id,
    position,
    ...Visible
  } = mockEditFormData.property

  render(<PropertyForm {...mockEditFormData} />);

  expect(screen.getByText('Edit your property')).toBeInTheDocument();
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  Object.keys(Visible).forEach(key => {
    expect(screen.getByLabelText(key)).toBeDefined();
  })

});