const uuid = require("uuid").v4;

class MessageService {
  constructor() {
    this.messages = [];
  }

  async find() {
    return this.messages;
  }

  async create(data) {
    const now = new Date();

    const newMessage = {
      id: uuid(),
      created: now,
      modified: now,
      text: data.text,
      history: data.history == null ? [] : data.history,
      user: data.user
    }

    this.messages.push(newMessage);

    return newMessage;
  }

  async remove(data) {
    const deleteIdx = this.messages.findIndex((x) => x.id === data.id);
    if (deleteIdx !== -1) {
      const toDelete = this.messages[deleteIdx];
      this.messages.splice(deleteIdx, 1);
      return toDelete;
    }
    return {
      err: `Message not found with id: ${data.id}`
    }
  }

  async clearHistory(data) {
    const clearIdx = this.messages.findIndex((x) => x.id === data.id);
    if (clearIdx !== -1) {
      this.messages[clearIdx].history = [];
      return this.messages[clearIdx];
    }
    return {
      err: `Message not found with id: ${data.id}`
    }
  }
}

module.exports = MessageService;