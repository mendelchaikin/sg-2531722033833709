import { render, screen, fireEvent } from '@testing-library/react';
import BackgroundSelector from '../BackgroundSelector';

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
});