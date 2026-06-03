const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(req, res, next) {
  const { name, email, phone, message } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ message: 'Please enter a valid name.' });
  }

  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (!phone || phone.trim().length < 7) {
    return res.status(400).json({ message: 'Please enter a valid phone number.' });
  }

  if (!message || message.trim().length < 10) {
    return res.status(400).json({ message: 'Please enter a message with at least 10 characters.' });
  }

  next();
}
