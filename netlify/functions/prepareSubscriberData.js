export function prepareSubscriberData(body) {
    return {
      email_address: body.formData.email,
      status: "subscribed",
      tags: body.TAGS || [],
      merge_fields: {
        FNAME: body.formData.FNAME,
        LNAME: body.formData.LNAME,
        PHONE: body.formData.PHONE,
        COMPANY: body.formData.COMPANY,
        PAGESOURCE: body.formData.PAGESOURCE,
        MESSAGE: body.formData.MESSAGE
      },
      utm_params: {
        utm_source: body.utmParams.utm_source || '',
        utm_medium: body.utmParams.utm_medium || '',
        utm_campaign: body.utmParams.utm_campaign || '',
        utm_term: body.utmParams.utm_term || '',
        utm_content: body.utmParams.utm_content || ''
      }
    };
  }
