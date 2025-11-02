import { generateUser } from './dataGenerator.js';

/**
 * Simulates handling an API request to fetch users.
 * @param {URLSearchParams} params - The query parameters from the URL.
 * @returns {object} The standardized API response object.
 */
export function handleUsersRequest(params) {
    let results = parseInt(params.get('results') || 1, 10);
    
    // Clamp results to a reasonable limit (Max 50)
    if (results < 1) results = 1;
    if (results > 50) results = 50; 

    const users = [];
    for (let i = 0; i < results; i++) {
        // Generating users dynamically
        users.push(generateUser()); 
    }

    const info = {
        seed: 'simulated_seed', // Placeholder, could be based on Date.now() if needed
        results: users.length,
        page: 1, // Assuming page 1 for simplicity
        version: '1.0.0'
    };

    return {
        results: users,
        info: info
    };
}
