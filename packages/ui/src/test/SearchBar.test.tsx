import { describe, it, expect, afterEach } from 'vitest';
import {cleanup, render, screen} from '@testing-library/react'
import { Searchbar } from '../components/common/Searchbar/index';

describe('Testing SearchBar Component', ()=> {
    afterEach(cleanup)
    it('should be a funciton', () => {
        expect(typeof Searchbar).toBe('function')
    })

    it('should be renderer', () => {
        const setFilter = (_: any) => {}        

        render(<Searchbar setFilter={setFilter}/>)
        
        const inputElement = screen.getByPlaceholderText('type to search')
        
        expect(inputElement).toBeTruthy()
    })

    it('it should render an input with a placeholder', ()=> {
        const setFilter = (_: any) => {} 
        
        render(<Searchbar setFilter={setFilter}/>)

        const inputElement = screen.getByPlaceholderText('type to search')

        expect(inputElement).toBeTruthy()
    })



})