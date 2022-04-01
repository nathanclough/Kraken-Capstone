import React from 'react'
import {cleanup,fireEvent,render} from '@testing-library/react'
import Navbar from '../Navbar'

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom',()=> ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}))

test('Navbar renders', () => {
    expect(() => render(<Navbar></Navbar>)).not.toThrowError()
})


test('Navbar has \"Connect Wallet\" when user is not connected',
() =>{
    const {queryByText} = render(<Navbar connected={false}></Navbar>)

    expect(queryByText(/Connect/i)).toBeTruthy()
}) 

test('Navbar has \"Connected\" when user is connected',
() =>{
    const {queryByText} = render(<Navbar connected={true}></Navbar>)

    expect(queryByText(/Connected/i)).toBeTruthy()
})