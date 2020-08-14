import tools from 'satanic'

const env = tools.readEnv()
const hideErrors = env.HIDE_ERRORS === 'true'
const admins = env.ADMINS.split(', ').map(id => +id)
const bot = tools.bot(env.TOKEN, hideErrors)
const client = bot.telegram

async function main() {
    tools.updateClasses(/* Prototypes to update */)
    tools.doAtDate(env.SAVING_DATA_CRON, async () => {
        await saveAll()
    })
    bot.on('text', handleText)
    bot.on('callback_query', handleCbQuery)
    bot.start()
}

async function saveAll() {
    
}

async function handleText(ctx) {
    const text = ctx.message.text
    const userId = ctx.from.id
    const chatId = ctx.chat.id

    if (admins.includes(userId)) {
        // admin
    } else {
        // user
    }
}

async function handleCbQuery(ctx) {
    const cb = ctx.callbackQuery
    const data = cb.data
    const userId = ctx.from.id


}

main()
