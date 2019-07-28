import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';
import User from '../models/Users';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ error: 'user not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'user not found2' });
    }

    const { id, name } = user;
    return res.json({
      user: { id, name, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });

    /* obs: O primeitro parametro do jwt.sign({}) é o payload, o segundo
    parametro do é uma string. No caso foi gerado no site md5 digitando
    RocketSeatGoBarber. O terceiro parâmetro é o tempo de expiração do Token
    O segundo e terceiro parametro estao no arquivo authConfig que esta dentro
    da pagina config  */
  }
}

export default new SessionController();
