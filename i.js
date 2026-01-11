// The base URL of your successfully running API
const API_BASE_URL = 'http://localhost:3000/api/v1/products'; 
const container = document.getElementById('products-container');

// New function definition to accept multiple filters
function fetchProductsByAisle(categories, isOrganic) {
    let url = API_BASE_URL;
    let params = [];

    // 1. Add Categories to Parameters
    if (categories) {
        params.push(`category=${categories}`); // e.g., category=Fruits,Vegetables
    }

    // 2. Add Organic Filter to Parameters
    if (isOrganic) {
        params.push('is_organic=true'); // e.g., is_organic=true
    }

    // 3. Construct the Final API URL
    if (params.length > 0) {
        url += '?' + params.join('&');
    }
    
    // Example URL will now be: http://localhost:3000/api/v1/products?category=Fruits,Vegetables&is_organic=true

    container.innerHTML = '<div>Loading organic produce...</div>';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); 
        })
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            container.innerHTML = `<div>Error: ${error.message}. Check your API.</div>`;
            console.error('Fetch error:', error);
        });
}

// Ensure you call the new function on initial load if needed
fetchProductsByAisle('', false);