import {Router} from 'express';
import {promises as fs} from 'fs';

const messagesRouter = Router();

interface Message {
  message: string;
  dateTime: string;
}

const messages: Message[] = [];

messagesRouter.get('/', (req, res) => {
  res.send(messages);
});

messagesRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const path = `./messages/${id}.txt`;

  try {
    const content = await fs.readFile(path);
    res.send(content.toString());
  } catch (error) {
    console.error('Error reading file:', error);
  }
});

messagesRouter.post('/', (req, res) => {
  console.log(req.body);

  const message: Message = {
    message: req.body.message,
    dateTime: new Date().toISOString(),
  };

  messages.push(message);

  res.send('создать сообщение');

  const path = './messages/' + message.dateTime + '.txt';

  const run = async () => {
    try {
      await fs.writeFile(path, message.message);
    } catch (err) {
      console.log('Not found! Error: ' + err);
    }
  };

  void run();

});
export default messagesRouter;