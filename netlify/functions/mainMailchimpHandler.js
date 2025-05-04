import { prepareSubscriberData } from './prepareSubscriberData.js';
import { checkContactExists } from './checkContactExists.js';
import { createOrUpdateContact } from './createOrUpdateContact.js';

exports.handler = async (event, context) => {
    // Load environment variables

    const headers = {
        "Access-Control-Allow-Origin": "*", // Allows all domains
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": "true" // if credentials are needed
    };


    const mailChimpAPI = process.env.MAILCHIMP_API_KEY;
    const mailChimpListID = process.env.MAILCHIMP_LIST_ID;
    const mailChimpRegion = process.env.MAILCHIMP_REGION || 'us4'; // Default to 'us4' if not specified

        // Handle preflight requests for CORS
        if (event.httpMethod === "OPTIONS") {
            return {
                statusCode: 204,
                headers,
                body: ""
            };
        }

    try {
        const body = JSON.parse(event.body);
        const data = prepareSubscriberData(body);
        const existingContact = await checkContactExists(data.email_address, mailChimpAPI, mailChimpRegion, mailChimpListID);
        const exists = existingContact!=null
        console.log("existing contact", existingContact)
        await createOrUpdateContact(data, exists, mailChimpAPI, mailChimpRegion, mailChimpListID);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Contact processed successfully" })
        };
    } catch (error) {
        console.error("Error processing contact:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
