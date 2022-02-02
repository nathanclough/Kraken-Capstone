import React from 'react'
import {cleanup,fireEvent,render} from '@testing-library/react'
import Navbar from '../Navbar'

test('Navbar renders', () => {
    expect(() => render(<Navbar></Navbar>)).not.toThrowError()
})

test('Navbar has project Title', () => {
    const {queryByText} = render(<Navbar></Navbar>)
    
    expect(queryByText(/KrakNFT/i)).toBeTruthy()
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

test('Navbar shows network connection',
() =>{
    const {queryByText} = render(<Navbar network="main" connected={false}></Navbar>)

    expect(queryByText(/main/i)).toBeTruthy()
}) 