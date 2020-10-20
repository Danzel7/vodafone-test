import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './index';
 
Enzyme.configure({ adapter: new Adapter() });

describe('Button tests', () => {
    it('should call mock function when button is clicked', () => {
        const mockFunction = jest.fn();
        const tree = shallow(
            <Button onClick={mockFunction} />
        );
        tree.simulate('click');
        expect(mockFunction).toHaveBeenCalled();
    });

    it('should render button with correct text', () => {
        const { queryByText } = render(<Button>Test</Button>);
        expect(queryByText("Test")).toBeTruthy(); 
    });
});