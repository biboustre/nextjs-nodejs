export const fetchProducts = async () => {
    const response = await fetch('http://localhost:5000/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  };
  
  export const createProduct = async (name: string, description: string, price: number, stock: number) => {
    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, price, stock }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
  
    return response.json();
  };