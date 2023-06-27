import { renderHook } from '@testing-library/react';
import {useState, useEffect} from 'react';

test('Hooks', () => {
    const { result } = renderHook(() => {
        const [saldo, setSaldo] = useState(0);
        useEffect(() => {
            setSaldo(50);
        }, [])

        return saldo;
    })

    expect(result.current).toBe(50);
})