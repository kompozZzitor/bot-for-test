module.exports = {
    gameOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'понедельник', callback_data: 'понедельник'}],
                [{text: 'вторник', callback_data: 'вторник'}],
                [{text: 'среда', callback_data: 'среда'}],
                [{text: 'четверг', callback_data: 'четверг'}],
                [{text: 'пятница', callback_data: 'пятница'}],
                [{text: 'суббота', callback_data: 'суббота'}],
                [{text: 'воскресенье', callback_data: 'воскресенье'}],
            ]
        })
    },

    againOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Попробовать снова', callback_data: '/again'}]
            ]
        })
    }
}