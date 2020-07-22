import tools from 'satanic'

async function main() {
    tools.updateClasses(/* Prototypes to update */)

    const env = tools.readEnv()
    const hideErrors = env.HIDE_ERRORS === 'true'
    const bot = tools.bot(env.TOKEN, hideErrors, () => {
        tools.doAtDate(env.SAVING_DATA_CRON, async () => {
            await saveAll()
        })
    })
    const admins = env.ADMINS.split(', ').map(id => +id)

    async function saveAll() {

    }

    async function handleText(ctx) {
        const text = ctx.message.text
        const userId = ctx.from.id
        const chatId = ctx.chat.id

        if (admins.includes(userId)) {

        } else {

        }
    }
    async function handleCbQuery(ctx) {
        const cb = ctx.callbackQuery
        const data = cb.data
        const userId = ctx.from.id


    }

    bot.on('text', handleText)
    bot.on('callback_query', handleCbQuery)

    bot.start()
}
main()
