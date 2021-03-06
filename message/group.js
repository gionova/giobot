const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")
const moment = require("moment-timezone")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')

let setting = JSON.parse(fs.readFileSync('./settings.json'))
prefix = setting.prefix

module.exports = welcome = async (giie, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await giie.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await giie.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://i.postimg.cc/SN54m6LW/SAVE-20210728-133334.jpg'
            }
            if (anu.action == 'add' && mem.includes(giie.user.jid)) {
            giie.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik ${prefix}menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(giie.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await giie.groupMetadata(anu.jid)
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = giie.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
                time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
                teks = `Hae ${anu_user} 🐒`
	            buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/welcome?nama=${anu_user}&descriminator=${time_wel}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.ibb.co/LRY5KTY/Portfolio-Archivi-Page-2-of-7-Federica-Iossa.jpg`)
                buttons = [{buttonId: `#lol`,buttonText:{displayText: `Hai
*AKU SAYANG KAMU GIIE* , kamu lagi sibuk ya ? aku cuma mau bilang kalau aku tuh selama ini memendam perasaan sama kamu 😔, jujur aku gak kuat jika harus dipendam ini semua sendirian 🙍‍♂️, ketika mata ini memandang raut wajahmu yang indah, hanya tiga kata yang terucap dari lubuk hatiku yang paling dalam, aku cinta kamu yogi 🥰,
Aku hanya manusia biasa yang memiliki banyak kekurangan dan mungkin tak pantas mengharapkan cintamu 😞. Namun, jika kamu bersedia menerimaku menjadi kekasih, aku berjanji akan melakukan apa pun yang terbaik untukmu. Maukah kamu menerima cintaku gi 🌹 ? `},type:1}]
                imageMsg = (await giie.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage
                buttonsMessage = { contentText: `${teks}`, footerText: '_Developer by: AyogiAk_', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
                prep = await giie.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                giie.relayWAMessage(prep)
}
            if (anu.action == 'remove' && !mem.includes(giie.user.jid)) {
            if (!welkom.includes(anu.jid)) return
                mdata = await giie.groupMetadata(anu.jid)
            	num = anu.participants[0]
                let w = giie.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = w.vname || w.notify || num.split('@')[0]
                time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
                memeg = mdata.participants.length
                out = `Dadaahh ${anu_user} 🐕`
                buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/goodbye?nama=${anu_user}&descriminator=${time_wel}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.ibb.co/8gHPzt9/UR-Tsushima-Yoshiko-What-Do-I-Do-What-Do-I-Do-Angel-of-Eden-Cards-list-All-Stars-Idol-Story-Love-Liv.jpg`)
                buttons = [{buttonId: `#lol`,buttonText:{displayText: `Bye
*AKU SAYANG KAMU GIIE*, kamu lagi sibuk ya ? aku cuma mau bilang kalau aku tuh selama ini memendam perasaan sama kamu 😔, jujur aku gak kuat jika harus dipendam ini semua sendirian 🙍‍♂️, ketika mata ini memandang raut wajahmu yang indah, hanya tiga kata yang terucap dari lubuk hatiku yang paling dalam, aku cinta kamu yogi 🥰,
Aku hanya manusia biasa yang memiliki banyak kekurangan dan mungkin tak pantas mengharapkan cintamu 😞. Namun, jika kamu bersedia menerimaku menjadi kekasih, aku berjanji akan melakukan apa pun yang terbaik untukmu. Maukah kamu menerima cintaku gi 🌹 ? `},type:1}]
                imageMsg = (await giie.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage
                buttonsMessage = { contentText: `${out}`, footerText: '_Developer by: AyogiAk_', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
                prep = await giie.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                giie.relayWAMessage(prep)
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
