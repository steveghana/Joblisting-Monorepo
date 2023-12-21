// New test file
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Clients from './index';
import userEvent from '@testing-library/user-event';

// Mock RTK Query hook
jest.mock('../../../store/services/client.service', () => ({
  useGetClientsQuery: jest.fn(),
}));

// Tests here
const mockedNavigate = jest.requireMock('react-router-dom').useNavigate;
// Loading state
it('displays loading indicator when fetching data', async () => {
  // Mock loading state
  require('../../../store/services/client.service').useGetClientsQuery.mockReturnValue({
    isLoading: true,
  });

  render(<Clients />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

// Error state
it('displays error message on data fetch failure', async () => {
  // Mock error state
  require('../../../store/services/client.service').useGetClientsQuery.mockReturnValue({
    isError: true,
  });

  render(<Clients />);

  expect(screen.getByText('Error fetching data')).toBeInTheDocument();
});

// More tests...

// Navigation
it('navigates to add client page when button clicked', () => {
  // Mock navigation
  const navigate = jest.fn();

  render(<Clients />);

  userEvent.click(screen.getByText('Add new Client'));

  expect(mockedNavigate).toHaveBeenCalledWith('/dashboard/customers/clients/add');
});
