export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const formData = await request.formData();

        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const token = formData.get('cf-turnstile-response');
        const ip = request.headers.get('CF-Connecting-IP');

        if (!token || !name || !email || !message) {
            return new Response('Missing fields', { status: 400 });
        }

        // Validate Turnstile
        const isValid = await verifyTurnstile(token, ip, env);
        if (!isValid) {
            return new Response('Captcha failed', { status: 403 });
        }

        // Send the email
        await sendMail(name, email, message, env);

        return new Response('Message sent!', { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response('Internal Server Error', { status: 500 });
    }
}

async function verifyTurnstile(token, ip, env) {
    const form = new FormData();
    form.append('secret', env.TURNSTILE_SECRET_KEY);
    form.append('response', token);
    form.append('remoteip', ip);

    const res = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
            method: 'POST',
            body: form
        }
    );

    const data = await res.json();
    return data.success;
}

async function sendMail(name, email, message, env) {
    const mailData = {
        personalizations: [
            {
                to: [{ email: env.CONTACT_EMAIL_TO }]
            }
        ],
        from: {
            email: email || 'no-reply@stefan-nicolau.com',
            name: name || 'Website Visitor'
        },
        subject: 'New Contact Form Submission',
        content: [
            {
                type: 'text/plain',
                value: `📩 New message:\n\nName: ${name}\nEmail: ${email}\n\n${message}`
            }
        ]
    };

    const res = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mailData)
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error('MailChannels Error:', errorText);
        throw new Error('Failed to send email');
    }
}
