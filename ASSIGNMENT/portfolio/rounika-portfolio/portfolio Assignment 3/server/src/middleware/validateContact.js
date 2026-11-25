const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // strip HTML tag brackets
    .trim();
}

export function validateContact(req, res, next) {
  const { name, email, subject, message } = req.body ?? {};

  // Check required presence and types
  const errors = [];
  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('Name is required.');
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email address is required.');
  }
  if (!subject || typeof subject !== 'string' || !subject.trim()) {
    errors.push('Subject is required.');
  }
  if (!message || typeof message !== 'string' || !message.trim()) {
    errors.push('Message is required.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: errors[0],
      errors,
    });
  }

  const cleanName = sanitizeInput(name);
  const cleanEmail = sanitizeInput(email).toLowerCase();
  const cleanSubject = sanitizeInput(subject);
  const cleanMessage = sanitizeInput(message);

  // Length validations
  if (cleanName.length > 80) {
    return res.status(400).json({ status: 'error', message: 'Name must not exceed 80 characters.' });
  }
  if (cleanEmail.length > 120) {
    return res.status(400).json({ status: 'error', message: 'Email must not exceed 120 characters.' });
  }
  if (cleanSubject.length > 150) {
    return res.status(400).json({ status: 'error', message: 'Subject must not exceed 150 characters.' });
  }
  if (cleanMessage.length > 3000) {
    return res.status(400).json({ status: 'error', message: 'Message must not exceed 3000 characters.' });
  }

  // Email format validation
  if (!EMAIL_REGEX.test(cleanEmail)) {
    return res.status(400).json({ status: 'error', message: 'Please provide a valid email address.' });
  }

  req.contact = {
    name: cleanName,
    email: cleanEmail,
    subject: cleanSubject,
    message: cleanMessage,
  };

  next();
}
