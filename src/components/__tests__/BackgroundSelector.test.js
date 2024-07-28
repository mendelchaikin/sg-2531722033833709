import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BackgroundSelector from '../BackgroundSelector';

// Mock the toast function
jest.mock('@/components/ui/use-toast', () => ({
  toast: jest.fn(),
}));

describe('BackgroundSelector', () => {
  const mockOnSelectBackground = jest.fn();

  beforeEach(() => {
    render(<BackgroundSelector currentBackground="default" onSelectBackground={mockOnSelectBackground} />);
  });

  test('renders the change background button', () => {
    expect(screen.getByText('Change Background')).toBeInTheDocument();
  });

  test('opens the background options when clicked', () => {
    fireEvent.click(screen.getByText('Change Background'));
    expect(screen.getByText('Default')).toBeInTheDocument();
    expect(screen.getByText('Starry Night')).toBeInTheDocument();
    expect(screen.getByText('Ocean Waves')).toBeInTheDocument();
    expect(screen.getByText('Forest')).toBeInTheDocument();
    expect(screen.getByText('Geometric')).toBeInTheDocument();
  });

  test('calls onSelectBackground when a background is selected', () => {
    fireEvent.click(screen.getByText('Change Background'));
    fireEvent.click(screen.getByText('Starry Night'));
    expect(mockOnSelectBackground).toHaveBeenCalledWith('starry-night');
  });

  test('closes the background options after selection', () => {
    fireEvent.click(screen.getByText('Change Background'));
    fireEvent.click(screen.getByText('Starry Night'));
    expect(screen.queryByText('Default')).not.toBeInTheDocument();
  });

  test('selects a random background when Random is clicked', () => {
    fireEvent.click(screen.getByText('Change Background'));
    fireEvent.click(screen.getByText('Random'));
    expect(mockOnSelectBackground).toHaveBeenCalled();
  });

  test('shows preview when hovering over a background option', () => {
    fireEvent.click(screen.getByText('Change Background'));
    fireEvent.mouseEnter(screen.getByText('Starry Night'));
    expect(screen.getByTestId('background-preview')).toHaveClass('bg-starry-night');
  });

  test('hides preview when mouse leaves a background option', () => {
    fireEvent.click(screen.getByText('Change Background'));
    fireEvent.mouseEnter(screen.getByText('Starry Night'));
    fireEvent.mouseLeave(screen.getByText('Starry Night'));
    expect(screen.queryByTestId('background-preview')).not.toBeInTheDocument();
  });
});