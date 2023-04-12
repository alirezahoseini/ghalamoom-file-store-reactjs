import { v4 as uuid } from 'uuid';

const addNewMessage = (text = 'defalt message', duration = 3000, messages, setMessages) => {
  const messageId = uuid();
  setMessages([...messages, {
    id: messageId,
    title: text,
    duration
  }])
  setTimeout(() => {
    setMessages(prevMessages => {
      const newMessages = prevMessages.filter(message => message.id !== messageId);
      return newMessages;
    })
  }, 2000);

}

export {addNewMessage}
