import React from 'react'
import {cleanup,fireEvent,render} from '@testing-library/react'
import KrakenLogo from '../KrakenLogo'

test('Logo card renders', () => {
    expect(() => render(<KrakenLogo></KrakenLogo>)).not.toThrowError()
})

test('Logo has team title', () => {
    const {queryByText} = render(<KrakenLogo></KrakenLogo>)
    
    expect(queryByText(/Team Kraken/i)).toBeTruthy()
})