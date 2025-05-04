export async function createOrUpdateContact(data, exists, mailChimpAPI, mailChimpRegion, mailChimpListID) {
  console.log("data", data);
  const url = `https://${mailChimpRegion}.api.mailchimp.com/3.0/lists/${mailChimpListID}/members/${exists ? data.email_address : ''}`;

  const method = exists ? 'PATCH' : 'POST';
  console.log("exists", exists);

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Authorization': `Basic ${Buffer.from('apikey:' + mailChimpAPI).toString('base64')}`,
      'Content-Type': 'application/json'
    }
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(`Mailchimp ${exists ? 'update' : 'creation'} failed: ${responseData.detail}`);
  }

  // On successful creation or update, send an event
  await sendUTMEvent(data.email_address, data.utm_params, data.merge_fields.MESSAGE, mailChimpAPI, mailChimpRegion, mailChimpListID);
}

async function sendUTMEvent(email_address, utm_params, message, mailChimpAPI, mailChimpRegion, mailChimpListID) {
  console.log("event email", email_address);
  console.log("utm_params", utm_params);
  
  const eventUrl = `https://${mailChimpRegion}.api.mailchimp.com/3.0/lists/${mailChimpListID}/members/${email_address}/events`;
  
  const eventData = {
    name: "utm_received",
    properties: {
      ...utm_params,
      ...(message && { message }),  // Conditionally include the message field if it exists
      occured_at: new Date().toISOString()
    }
  };

  const eventResponse = await fetch(eventUrl, {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Authorization': `Basic ${Buffer.from('apikey:' + mailChimpAPI).toString('base64')}`,
      'Content-Type': 'application/json'
    }
  });

  console.log("eventresponse", eventResponse);
  if (!eventResponse.ok) {
    const errorData = await eventResponse.json();
    throw new Error(`Failed to send UTM event: ${errorData.detail}${errorData.type}`);
  }
}
