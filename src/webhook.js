export async function setWebhook() {
  try {
    const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: env.WORKER_URL })
    });
    console.log('Webhook setup response:', await response.json());
  } catch (error) {
    console.error('Error setting webhook:', error);
  }
}

setWebhook();
