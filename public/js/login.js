const loginFormHandler = async (event) => {
      event.preventDefault();

      // Collect values from the login form
      const email = document.querySelector('#email-login').value.trim();
      const password = document.querySelector('#password-login').value.trim();

      if (email && password) {
        try {
          // Send a POST request to the API endpoint
          const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (!response.ok) {
            throw new Error('Login failed. Please check your credentials.');
          }

          // If successful, redirect the browser to the profile page
          document.location.replace('/profile');
        } catch (error) {
          console.error('Error during login:', error);
          alert(error.message);
        }
      } else {
        alert('Email and password are required.');
      }
    };

    const signupFormHandler = async (event) => {
      event.preventDefault();

      // Collect values from the signup form
      const name = document.querySelector('#name-signup').value.trim();
      const email = document.querySelector('#email-signup').value.trim();
      const password = document.querySelector('#password-signup').value.trim();

      if (name && email && password) {
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (!response.ok) {
            throw new Error('Signup failed. Please try again later.');
          }

          document.location.replace('/profile');
        } catch (error) {
          console.error('Error during signup:', error);
          alert(error.message);
        }
      } else {
        alert('All fields are required for signup.');
      }
    };

    // Add event listeners
    document.getElementById('login-form').addEventListener('submit', loginFormHandler);
    document.getElementById('signup-form').addEventListener('submit', signupFormHandler);




