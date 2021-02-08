import {
    bot,
    texts,
    tools,
    Users,
    config,
    buttons,
    connectToDb
} from './imports.js'

async function startBot() {
    await connectToDb(config.dbName)
    bot.use(async (ctx, next) => {
        ctx.text = async (text, extra = {}) => {
            await bot.telegram.sendMessage(
                ctx.from.id,
                text,
                Object.assign(extra, {
                    parse_mode: 'HTML',
                    disable_web_page_preview: true
                })
            )
        }
        ctx.edit = ctx?.message?.text || ctx?.callbackQuery?.message?.text ? ctx.editMessageText : ctx.editMessageCaption
        ctx.removeKeyboard = async () => await ctx.editMessageReplyMarkup({})
        ctx.error = async error => await ctx.text(texts.errors[error])
        ctx.reply = async (text, keyboard) => await ctx.text(texts[text] || text, buttons[keyboard])
        ctx.goToMainMenu = async () => {
            await Users.set(ctx.from.id, {
                state: 'free'
            })
            await ctx.reply('mainMenu', 'mainMenu')
        }
        await next()
    })
    bot.start(handleStart)
    bot.on('text', handleText)
    bot.on('callback_query', handleCbQuery)
    bot.on(['photo', 'video', 'document', 'audio', 'voice', 'animation'], handleMedia)
    bot.run()
}

async function handleStart(ctx, next) {
    const refLink = ctx.startPayload
    let user = await Users.get(ctx.from.id)
    if (user === null) {
        user = await Users.add(ctx.from.id)
        await ctx.reply('greeting', 'mainMenu')
        if (refLink) {
            // Referal system
        }
    } else {
        if (user.state === 'free') {
            await ctx.reply('restart', 'mainMenu')
        } else {
            await next()
        }
    }
}

async function handleText(ctx) {
    const text = ctx?.message?.text
    const userId = ctx.from.id
    let user = await Users.get(userId)
    const [state, value] = user.state.split('_')

    switch (state) {
        case 'free': {
            await ctx.text(text)
            break
        }
        default: {
            switch (text) {
                default: {
                    await ctx.goToMainMenu()
                }
            }
        }
    }
}

async function handleCbQuery(ctx) {
    const cbQuery = ctx.callbackQuery
    const cbQueryDataSet = cbQuery.data.split('_')
    const [action, data] = cbQueryDataSet
    const dataSet = cbQueryDataSet.slice(2)

    const userId = ctx.from.id
    let user = await Users.get(userId)

    switch (action) {
        default: {
            await ctx.answerCbQuery(texts.errors.oldButton, true)
        }
    }
}

async function handleMedia(ctx) {
    const userId = ctx.from.id
    const mediaType = ctx.updateSubTypes[0]
    const fileId = (ctx?.photo?.[0] || ctx[mediaType])?.fileId
    let user = await Users.get(userId)
}

startBot()