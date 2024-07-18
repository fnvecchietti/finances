import { afterEach, describe, expect, it } from "vitest";
import { CustomTable } from "../components/CustomTable";
import { cleanup, render, screen } from "@testing-library/react";


describe('Test Custom Table Component', ()=> {

    afterEach(cleanup)

    it('it should be a funcion', ()=> {
        expect(typeof CustomTable).toBe('function')
    })

    it('should render loading', async ()=> {
        render(<CustomTable data={undefined as any} rowCount={0} />)

        const result = await screen.getByText('loading...')

        expect(result).toBeTruthy();
        
    })

    it('should render a table', async ()=> {
        const mockData = [
            {
                id: 1,
                some_data: 'data'
            }
        ]
        render(<CustomTable data={mockData} rowCount={0} />)

        const result = await screen.findByRole('table-content')

        expect(result).toBeTruthy()
    })


    it('should render a table with headers based on the data object', async ()=> {

        const mockData = [{
            some_property: 'something',
            testing_data: 'test',
            header_with_multiple_underscores: 'multiple'
        }]

        render(<CustomTable data={mockData} rowCount={0}/>);

        const somePropertyHeader = screen.getByText('SOME PROPERTY');
        const testing_data = screen.getByText('TESTING DATA');
        const header_with_multiple_underscores = screen.getByText('HEADER WITH MULTIPLE UNDERSCORES');


        expect(somePropertyHeader.textContent).toBe('SOME PROPERTY');
        expect(somePropertyHeader.tagName).toBe('TH');
        expect(testing_data.textContent).toBe('TESTING DATA');
        expect(testing_data.tagName).toBe('TH');
        expect(header_with_multiple_underscores.textContent).toBe('HEADER WITH MULTIPLE UNDERSCORES');
        expect(header_with_multiple_underscores.tagName).toBe('TH');
    });
})