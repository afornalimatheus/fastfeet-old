import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const { name, street, number, complement, state, city, zipcode } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos inválidos.' });
    }

    // const recipientExist = Recipient.findOne({
    //   where: {
    //     name: req.body.name,
    //     street: req.body.street,
    //     number: req.body.number,
    //   },
    // });

    // if (recipientExist) {
    //   return res.status(400).json({ error: 'Destinatário já existe.' });
    // }

    const newRecipient = Recipient.create(req.body);

    return res.json(newRecipient);
  }
}

export default new RecipientController();
