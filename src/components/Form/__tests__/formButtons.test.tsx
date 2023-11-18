import { render, screen } from '@testing-library/react';
import FormButtons from '../formButtons';
import { it, describe, expect } from 'vitest';

const renderComponent = () => {
  return render(<FormButtons />);
};

describe('FormButtons', () => {
  it('should render correctly', () => {
    renderComponent();
    const text = screen.getByText("Please tell us why you don't want to claim");
    expect(text).toBeInTheDocument();
  });
});
