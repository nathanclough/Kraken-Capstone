import React from 'react'
import {cleanup,fireEvent,render} from '@testing-library/react'
import Account from '../Account'

test('Account Renders', () => {
    expect(() => render(<Account></Account>)).not.toThrowError()
})