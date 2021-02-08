import tools from 'satanic'
import { config } from './config.js'

const bot = tools.bot(
    config.telegramToken,
    null,
    null,
    { newRunner: true }
)

export {
    bot
}