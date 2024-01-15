import {Router} from 'express';
import {promises as fs} from 'fs';
import path from 'path';

const messagesRouter = Router();

interface Message {
  message: string;
  dateTime: string;
}

messagesRouter.get('/', async (req, res) => {
  const messagesFolder = './messages';

  try {
    const txtFiles = await fs.readdir(messagesFolder);

    const messagesContent = txtFiles.map(async (file) => {
      const files = path.join(messagesFolder, file);
      const content = await fs.readFile(files);
      return {filename: file, message: content.toString()};
    });


    const promises =  await Promise.all(messagesContent);

    res.send(promises);
  } catch (err) {
    console.error('Not found! Error:', err);
  }
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