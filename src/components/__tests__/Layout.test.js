import React from 'react';
import { render, act } from '@testing-library/react';
import Layout from '../Layout';
import { GameProvider } from '@/context/GameContext';

// Mock the components used in Layout
jest.mock('../Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('../ThemeToggle', () => () => <div data-testid="theme-toggle">ThemeToggle</div>);
jest.mock('../BackgroundSelector', () => () => <div data-testid="background-selector">BackgroundSelector</div>);
jest.mock('next/router', () => ({
  useRouter: () => ({
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}));

describe('Layout', () => {
  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => null);
    Storage.prototype.setItem = jest.fn(() => null);
  });

  it('renders all components and children', () => {
    const { getByTestId, getByText } = render(
      <GameProvider>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </GameProvider>
    );

    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByTestId('footer')).toBeInTheDocument();
    expect(getByTestId('theme-toggle')).toBeInTheDocument();
    expect(getByTestId('background-selector')).toBeInTheDocument();
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('loads saved background from localStorage', () => {
    Storage.prototype.getItem.mockReturnValue('ocean-waves');

    const { container } = render(
      <GameProvider>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </GameProvider>
    );

    expect(container.firstChild).toHaveClass('bg-ocean-waves');
  });

  it('changes background when BackgroundSelector triggers change', async () => {
    const { container, getByTestId } = render(
      <GameProvider>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </GameProvider>
    );

    const backgroundSelector = getByTestId('background-selector');

    await act(async () => {
      backgroundSelector.dispatchEvent(new CustomEvent('selectBackground', { detail: 'starry-night' }));
    });

    expect(container.firstChild).toHaveClass('bg-starry-night');
    expect(localStorage.setItem).toHaveBeenCalledWith('selectedBackground', 'starry-night');
  });

  it('applies transition class during route changes', async () => {
    const { container } = render(
      <GameProvider>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </GameProvider>
    );

    await act(async () => {
      window.dispatchEvent(new Event('routeChangeStart'));
    });

    expect(container.firstChild).toHaveClass('opacity-50');

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(container.firstChild).not.toHaveClass('opacity-50');
  });
});