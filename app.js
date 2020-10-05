const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");

const MessageService = require("./message-service.js");

const app = express(feathers());

const PORT = process.env.PORT || 3000;

app.use('messages', new MessageService());

app.service('messages').on('created', message => {
  console.log(`New message created by user ${message.user} with id: '${message.id}' and message: '${message.text}'`);
})

app.service('messages').on('removed', message => {
  console.log(`Removed message with id: '${message.id}'`);
})

app.listen(PORT).on('listening', () => console.log(`Server listening on PORT: ${PORT}`))

const main = async () => {
  await app.service('messages').create({
    text: "Server created.",
    user: "Admin"
  });
  const message = (await app.service('messages').find())[0];
  await app.service('messages').remove({
    id: message.id
  })
}

main();