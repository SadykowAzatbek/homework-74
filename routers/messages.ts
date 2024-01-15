import {Router} from 'express';
const messagesRouter = Router();

interface Message {
  message: string;
  dateTime: string;
}

const messages: Message[] = [];

messagesRouter.get('/', (req, res) => {
  res.send(messages);
});

messagesRouter.get('/:id', (req, res) => {
  res.send('здесь должно быть 1 сообщение');
});

messagesRouter.post('/', (req, res) => {
  console.log(req.body);

  const message: Message = {
    message: req.body.message,
    dateTime: Date(),
  };

  messages.push(message);

  res.send('создать сообщение');
});

export default messagesRouter;