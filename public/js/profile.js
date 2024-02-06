document.addEventListener('DOMContentLoaded', () => {
  const userData = {
    user_name: 'John Doe',
    user_location: 'City, Country', // Replace this with the actual user data
  };

  // Function to render user data
  const renderUserData = () => {
    document.querySelector('.mb-4 p:first-child').textContent = userData.user_name;
    document.querySelector('.mb-4 p:last-child').textContent = userData.user_location;
  };

  // Example data for three saved pets
  const savedPetsData = [
    {
      image: 'path/to/pet1.jpg',
      name: 'Buddy',
      breed: 'Labrador',
      location: 'Park',
    },
    {
      image: 'path/to/pet2.jpg',
      name: 'Charlie',
      breed: 'Golden Retriever',
      location: 'Beach',
    },
    {
      image: 'path/to/pet3.jpg',
      name: 'Max',
      breed: 'German Shepherd',
      location: 'City',
    },
  ];

  // Function to render saved pets
  const renderSavedPets = () => {
    savedPetsData.forEach((petData, index) => {
      const petElement = document.getElementById(`pet${index + 1}`);
      petElement.querySelector('.card-img-top').src = petData.image;
      petElement.querySelector('.card-title').textContent = petData.name;
      petElement.querySelector('.card-text:nth-child(2)').textContent = `Breed: ${petData.breed}`;
      petElement.querySelector('.card-text:last-child').textContent = `Location: ${petData.location}`;
    });
  };

  // Call functions to render initial data
  renderUserData();
  renderSavedPets();

  



})





// This is example code- does not correlate to this project. Will need to be changed

// const newFormHandler = async (event) => {
//   event.preventDefault();

//   const name = document.querySelector('#project-name').value.trim();
//   const needed_funding = document.querySelector('#project-funding').value.trim();
//   const description = document.querySelector('#project-desc').value.trim();

//   if (name && needed_funding && description) {
//     const response = await fetch(`/api/projects`, {
//       method: 'POST',
//       body: JSON.stringify({ name, needed_funding, description }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to create project');
//     }
//   }
// };

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/projects/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to delete project');
//     }
//   }
// };

// document
//   .querySelector('.new-project-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
