import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/mail';

class CancellationMail {
  // o get possibilita acesso. ex: CancellationMail.key e acessar essa propriedade
  // retorna uma chave unica, pois, pra cada job precisamos de uma chave única
  get key() {
    return 'CancellationMail';
  }

  // tarefa que irá executar quando o processo for executado (handle é chamado no envio de cada e-mail)
  async handle({ data }) {
    const { appointment } = data;

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date), "d 'de' MMMM 'às' H:mm'h' ", {
          locale: pt,
        }),
      },
    });
  }
}

export default new CancellationMail();
