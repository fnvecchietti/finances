const API_BASE_URL = 'http://localhost:3000'


export const endpointsV1 = {
    movements: `${API_BASE_URL}/api/v1/movements`,
    movement_type: `${API_BASE_URL}/api/v1/movements-type`,
    stocks:`${API_BASE_URL}/api/v1/stocks`, 
    register:`${API_BASE_URL}/api/v1/auth/register`, 
}