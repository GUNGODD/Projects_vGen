const http = require('http');
const fs = require('fs');

// Read the conversion rates JSON file
const conversionRates = JSON.parse(fs.readFileSync('conversion_rates.json', 'utf8'));

const server = http.createServer((req, res) => {
  // Set the response content type
  res.setHeader('Content-Type', 'application/json');

  // Handle different API endpoints
  if (req.url === '/api/products' && req.method === 'GET') {
    // Handle GET request for /api/products
    const products = [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
      { id: 3, name: 'Product 3', price: 30 }
    ];

    // Get the query parameters
    const url = new URL(req.url, `http://${req.headers.host}`);
    const currency = url.searchParams.get('currency');

    if (currency && conversionRates[currency]) {
      // Convert prices to the requested currency
      const convertedProducts = products.map(product => {
        const convertedPrice = product.price * conversionRates[currency];
        return { ...product, price: convertedPrice };
      });

      // Return the converted products as JSON response
      res.statusCode = 200;
      res.end(JSON.stringify(convertedProducts));
    } else {
      // Return the products as JSON response (default currency)
      res.statusCode = 200;
      res.end(JSON.stringify(products));
    }
  } else {
    // Handle 404 - Not Found for other endpoints
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
