// api/contact.js
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'trustdrivebyhamza@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD, // à configurer dans les variables Vercel
    },
  });

  try {
    await transporter.sendMail({
      from: `"TrustDrive Contact" <trustdrivebyhamza@gmail.com>`,
      to: 'trustdrivebyhamza@gmail.com',
      subject: `Message de ${name}`,
      text: message,
      html: `<p><strong>Nom:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l’envoi de l’email.' });
  }
};
