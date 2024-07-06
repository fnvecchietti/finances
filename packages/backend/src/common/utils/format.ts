import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

export const convertToFloat = (input: string): number => {
    let cleanedString = input.replace(/[$.]/g, '');
    // Step 2: Replace the comma with a dot
    cleanedString = cleanedString.replace(',', '.');
    // Step 3: Parse the resulting string as a float
    const result = parseFloat(cleanedString);
    
    // Optional: Check if the result is a valid number
    if (isNaN(result)) {
        throw new Error('Invalid number format');
    }
    
    return result;
};

export const convertDate = (input:string, inputFormat: string) : Date => {
    const result = dayjs(input,inputFormat);
    return result.toDate();
};