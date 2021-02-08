import tools from 'satanic'

const texts = {
    greeting: '👋 Привет',
    mainMenu: '🏠 Главное меню:',
    restart: '👋 Привет снова',
    errors: {
        oldButton: '💢 Это действие сейчас недоступно.'
    }
}

const buttons = {
    mainMenu: simple([
        // Main menu buttons
    ])
}


function simple(keys, onetime) {
    let keyboard = tools.Markup
        .keyboard(keys)
        .resize()
    keyboard = onetime ? keyboard.oneTime() : keyboard
    return Object.assign(
        { parse_mode: 'HTML' },
        keyboard.extra()
    )
}

function inline(keyboard) {
    return Object.assign(
        { parse_mode: 'HTML' },
        tools.Markup.inlineKeyboard(
            keyboard.map(
                row => row.map(
                    key => tools.Markup.callbackButton(...key)
                )
            )
        ).extra()
    )
}

export {
    texts,
    buttons,
    simple,
    inline
}