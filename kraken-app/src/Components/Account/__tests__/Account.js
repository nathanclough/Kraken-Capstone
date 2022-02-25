import React from 'react'
import {cleanup,fireEvent,render} from '@testing-library/react'
import KrakenLogo from '../Account'

test('Logo card renders', () => {
    expect(() => render(<Account></Account>)).not.toThrowError()
})