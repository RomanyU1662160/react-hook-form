import { render, screen } from '@testing-library/react';
import YoutubeForm from '../YoutubeForm';

const renderComponent = () => {
  return render(<YoutubeForm />);
};

describe('YoutubeForm ', () => {
  it('should render correctly', () => {
    renderComponent();
    const text = screen.getByText('Name');
    expect(text).toBeInTheDocument();
  });
});
