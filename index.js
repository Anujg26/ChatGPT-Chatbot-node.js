import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
  console.log(colors.bold.green('Welcome to the Chatbot Program!'));
  console.log(colors.bold.green('You can start chatting with the bot.'));

  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow('You: '));

    try {
      const messages = chatHistory.map(([role, content]) => ({ role, content }));
      messages.push({ role: 'user', content: userInput });

      // OpenAI v4+ syntax
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
      });

      const completionText = completion.choices[0].message.content;

      if (userInput.toLowerCase() === 'exit') {
        console.log(colors.green('Bot: ') + completionText);
        return;
      }

      console.log(colors.green('Bot: ') + completionText);
      chatHistory.push(['user', userInput], ['assistant', completionText]);
    } catch (error) {
      console.error(colors.red('Error:'), error.message);
      return;
    }
  }
}

main();