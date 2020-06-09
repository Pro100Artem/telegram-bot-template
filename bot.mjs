import tools from 'darkness-tools'
import dotenv from 'dotenv';

(async () => {
    
    tools.updateClasses(/* Prototypes to update */)
    
    const env = (dotenv.config({
        path: 'config.env'
    })).parsed

    const bot = tools.bot(env.TOKEN, () => {
        await tools.doAtDate(env.SAVING_DATA_CRON, async () => {
            await saveAll()
        })
    }, env.HIDE_ERRORS === 'true', env.LIBKEY)

    const admins = env.ADMINS.split(', ').map(id => +id)

    async function saveAll() {
        //saving all data
    }

    bot.on('text', (ctx) => {
        (async () => {
            const text = ctx.message.text
            const userId = ctx.from.id

            if (admins.includes(userId)) {

            } else {
                
            }
        })()
    })

    bot.on('callback_query', (ctx) => {
        (async () => {
            const cb = ctx.callbackQuery
            const data = cb.data
            const userId = ctx.from.id


        })()
    })
    bot.start()
    
})()
