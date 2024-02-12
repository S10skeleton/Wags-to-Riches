
document.addEventListener('DOMContentLoaded', () => {
  const userData = {
    user_name: '',
    user_location: '', // this should be replaced with the actual user data
  };

  //Function to render user data
  const renderUserData = () => {
    document.querySelector('.mb-4 p:first-child').textContent = userData.user_name;
    document.querySelector('.mb-4 p:last-child').textContent = userData.user_location;
  };

  //example data for the three saved pets
  const savedPetsData = [
    {
      image: 'image/path',
      name: 'Sam',
      breed: 'Labrador',
      location: 'Park',
    },
    {
      image: 'image/path',
      name: 'Charlie',
      breed: 'Tabby',
      location: 'Beach',
    },
    {
      image: 'image/path',
      name: 'Max',
      breed: 'German Shepherd',
      location: 'City',
    },
  ];

  // Function to render saved pets on the user profile page
  const renderSavedPets = () => {
    savedPetsData.forEach((petData, index) => {
      const petElement = document.getElementById(`pet${index + 1}`);
      petElement.querySelector('.card-img-top').src = petData.image;
      petElement.querySelector('.card-title').textContent = petData.name;
      petElement.querySelector('.card-text:nth-child(2)').textContent = `Breed: ${petData.breed}`;
      petElement.querySelector('.card-text:last-child').textContent = `Location: ${petData.location}`;
    });

  }
  

  //Call functions to render initial data
  renderUserData();
  renderSavedPets();



  });




