// api/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "trustdrivebyhamza@gmail.com",
      pass: "2711Amel1998", // Mot de passe d'application Gmail
    },
  });

  try {
    await transporter.sendMail({
      from: `"Formulaire TrustDrive" <trustdrivebyhamza@gmail.com>`,
      to: "trustdrivebyhamza@gmail.com",
      subject: `Nouveau message de ${name}`,
      html: `
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong><br>${message}</p>
      `,
    });

    res.status(200).json({ message: "Message envoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    res.status(500).json({ message: "Erreur interne", error });
  }
}
