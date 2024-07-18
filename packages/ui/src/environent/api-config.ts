
export const API_BASE_URL = 'http://localhost:3000'


export const endpointsV1 = {
    movements: `${API_BASE_URL}/api/v1/movements`,
    movement_type: `${API_BASE_URL}/api/v1/movements-type`,
    stocks:`${API_BASE_URL}/api/v1/stocks`, 
    register:`${API_BASE_URL}/api/v1/auth/register`, 
    login:`${API_BASE_URL}/api/v1/auth/login`, 
    prompt:`${API_BASE_URL}/api/v1/ai/prompt`, 
    validate_token: (token:string)=> `${API_BASE_URL}/api/v1/auth/token/validate?token=${token}`, 
}