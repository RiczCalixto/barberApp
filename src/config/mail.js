export default {
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'f2065aa3632d98',
    pass: '979709806a5348',
  },
  secure: false,
  default: {
    from: 'Equipe goBarber <noreply@gobarber.com>',
  },
};

// Uso do mailtrap para testar em ambiente de dev.
// Outros serviços: Amazon SES, Mailgun, Sparkpost
