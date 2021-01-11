import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Pagination from '../components/Pagination';
// import { mount } from 'enzyme';


import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


test('paginate page renders bar', () => {
    const component = renderer.create(<Pagination pagination={[2,50,(count) => {console.log('hello '+count)}]}/>);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});

//React 17 is not compatiable with enzyme. Unable to test these out. Intital test examples I did not find this out until I was done with the project

/*
test('paginate page renders bar without arrow when page starts at one', () => {
    const wrapper = mount(<Pagination pagination={[1,50,(count) => {console.log('hello '+count)}]}/>);

    let button = wrapper.first('button');
    expect(button).hasClass('hidden');

});

test('paginate page renders bar without arrow when page starts at the last page number', () => {
    const wrapper = mount(<Pagination pagination={[1,50,(count) => {console.log('hello '+count)}]}/>);

    let button = wrapper.last('button');
    expect(button).hasClass('hidden');

});
*/