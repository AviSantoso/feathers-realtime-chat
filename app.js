const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");

const MessageService = require("./message-service.js");

const app = express(feathers());

const PORT = process.env.PORT || 3000;

app.use('messages', new MessageService());

app.service('messages').on('created', message => {
  console.log(`New message with id: '${message.id}' and message: '${message.text}'. ${message.history.length} changes so far.`);
})

app.service('messages').on('removed', message => {
  console.log(`Removed message with id: '${message.id}'`);
})

app.listen(PORT).on('listening', () => console.log(`Server listening on PORT: ${PORT}`))

const main = async () => {
  await app.service('messages').create({
    text: "Server created.",
    history: []
  });
  const message = (await app.service('messages').find())[0];
  await app.service('messages').remove({
    id: message.id
  })
}

main();