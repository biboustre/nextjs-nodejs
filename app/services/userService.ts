export const registerUser = async (name: string, email: string, password: string) => {
    const response = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to register user');
    }
  
    return response.json();
  };
  
  export const loginUser = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to login');
    }
  
    return response.json();
  };