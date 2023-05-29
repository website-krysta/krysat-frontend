const handleLogout = () => {
    // Clear login data from session storage
    sessionStorage.removeItem('userData');
    // Perform any other logout logic
    // Navigate to the login page or any other appropriate route
    navigate('/login');
  };