const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options');
const token = '6092645641:AAGScg5UmrmJU0Ux0MV_TUIBiwxMiyCunk8';

const bot = new TelegramApi(token, {polling: true});

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Попробуй угадать какой сегодня день недели:))`);
    let weekday = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'][new Date().getDay()];
    chats[chatId] = weekday;
    await bot.sendMessage(chatId, 'Отгадывай)', gameOptions);
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начадбное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадай день недели'}
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if(text === '/start') {
            bot.sendSticker(chatId, 'https://media.giphy.com/media/1wpaCOVdglMSYgjCum/giphy.gif');
            return bot.sendMessage(chatId, 'Добро пожаловать!');
        }
        if(text === '/info') {
            return bot.sendMessage(chatId, `Привет ${msg.from.first_name} ${msg.from.last_name}`);
        }
        if(text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!');
    })

    bot.on('callback_query', async msg => {
        let day = msg.data;
        const chatId = msg.message.chat.id;
        if(day === '/again') {
            return startGame(chatId);
        }
        if(day === chats[chatId]) {
            return bot.sendMessage(chatId, `Поздравляю, ты угадал! Сегодня ${chats[chatId]}`)
        } else {
            bot.sendSticker(chatId, 'https://media.giphy.com/media/xUPGcdeU3wvdNPa1Py/giphy.gif');
            return bot.sendMessage(chatId, `Не угадал! Сегодня другой день недели!`, againOptions)
        }
    })
}

start();