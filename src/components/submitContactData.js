const submitContactData = async (formData) => {

  console.log('form data====>', formData)
    try {
      const response = await fetch('/.netlify/functions/mainMailchimpHandler', { // Adjust the function endpoint name as necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit contact data');
      }
  
      return await response.json(); // Parses JSON response into native JavaScript objects
    } catch (error) {
  console.error('Error submitting contact data:', error);
  throw error; // Re-throw the error for handling in the component if necessary
    }
  };
  
  export { submitContactData };
  