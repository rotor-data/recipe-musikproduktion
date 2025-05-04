export async function checkContactExists(email, mailChimpAPI, mailChimpRegion, mailChimpListID) {
  const url = `https://${mailChimpRegion}.api.mailchimp.com/3.0/search-members?query=${email}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Basic ${Buffer.from('apikey:' + mailChimpAPI).toString('base64')}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null; // Contact does not exist
    } else {
      throw new Error(`Error checking contact: ${response.statusText}`);
    }
  }

  const data = await response.json();
  if (data.exact_matches.total_items > 0) {
    return data.exact_matches.members[0]; // Contact exists
  }

  return null; // Contact does not exist
}
