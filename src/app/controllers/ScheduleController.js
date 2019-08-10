import { startOfDay, parseISO, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import User from '../models/Users';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const checkIfUser = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!checkIfUser) {
      return res.status(400).json({
        error: 'Sorry, 🐱 but you must be a provider to access schedules',
      });
    }

    const { date } = req.query;
    const parseDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
      },
      order: ['date'],
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
