import fetch from 'isomorphic-unfetch';


export default async function mailchimpSusc (req, res)  {
  // 1. Destructure the email address from the request body.
  console.log(req)
  const { email } = req;

  if (!email) {
    // 2. Throw an error if an email wasn't provided.
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // 3. Fetch the environment variables.
    const LIST_ID = process.env.NEXT_PUBLIC_API_URL_MAILCHIMPLISTID; //5731324a36
    const API_KEY = process.env.NEXT_PUBLIC_API_URL_MAILCHIMPAPIKEY; // 1af674e6c92ffd26a97110eaa1c72cec-us4
    console.log(API_KEY)
    // 4. API keys are in the form <key>-us3.
    const DATACENTER = API_KEY.split('-')[1];

    // 5. The status of 'subscribed' is equivalent to a double opt-in.
    const data = {
      email_address: email,
      status: 'subscribed',
    };

    // 6. Send a POST request to Mailchimp.
    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${API_KEY}`,
        },
        method: 'POST',
      }
    );

    // 7. Swallow any errors from Mailchimp and return a better error message.
    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the newsletter. Shoot me an email at [demo@demo.io] and I'll add you to the list.`,
      });
    }

    // 8. If we made it this far, it was a success! 🎉
    return res.status(201).json({ error: '' });
  } catch (error) {
      console.log(error)
  }
};
