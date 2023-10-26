// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import mjml from 'mjml'
import Mail from "@ioc:Adonis/Addons/Mail"
import View from "@ioc:Adonis/Core/View"

export default class MailController {
    static async sendEmail(view : string, data: any, to: string){
        const emaiView = await View.render(view, data)
        await Mail.send((message) => {
            message
            .to(to)
            .html(mjml(emaiView).html)
        })
    }
}
