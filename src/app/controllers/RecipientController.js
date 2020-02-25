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

    const recipientExist = await Recipient.findOne({
      where: { name, street, number },
      attributes: ['id', 'name', 'street', 'number'],
    });

    if (recipientExist) {
      return res.status(400).json({ error: 'Destinatário já existe.' });
    }

    const newRecipient = await Recipient.create(req.body);

    return res.json(newRecipient);
  }

  async update(req, res) {
    const { name, street, number, complement, city, state, zipcode } = req.body;

    const recipient = await Recipient.findOne({
      where: { name },
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
        'zipcode',
      ],
    });

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

    if (!recipient) {
      return res.status(401).json({ error: 'Destinatário não existe' });
    }

    if (recipient.name === name) {
      const {
        street,
        number,
        complement,
        state,
        city,
        zipcode,
      } = await recipient.update(req.body);

      return res.json({
        name,
        street,
        number,
        complement,
        state,
        city,
        zipcode,
      });
    }
    return res.status(401).json({ error: 'Destinatário não atualizado' });
  }
}

export default new RecipientController();
