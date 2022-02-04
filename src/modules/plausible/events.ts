// Plausible events

// newsletter subscription
export const trackNewsletterSubscription = async () => {
  try {
    // send subscribption event to plausible
    const response = await fetch('https://plausible.io/api/event', {
      body: JSON.stringify({
        name: 'Newsletter subscription',
        url: 'https://michaelschmitt.io/newsletter/',
        domain: 'michaelschmitt.io',
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '127.0.0.1',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36 OPR/71.0.3770.284',
      },
      method: 'POST',
    });

    // check response
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
  } catch (error) {
    throw new Error((error as { message: string })?.message || (error as string));
  }
};

export const trackContactFormRequest = async () => {
  try {
    // send subscribption event to plausible
    const response = await fetch('https://plausible.io/api/event', {
      body: JSON.stringify({
        name: 'Contact form request',
        url: 'https://michaelschmitt.io/contact/',
        domain: 'michaelschmitt.io',
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '127.0.0.1',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36 OPR/71.0.3770.284',
      },
      method: 'POST',
    });

    // check response
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
  } catch (error) {
    throw new Error((error as { message: string })?.message || (error as string));
  }
};
