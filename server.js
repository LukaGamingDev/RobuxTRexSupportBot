require("dotenv").config()

const commands = require("./commands")
const {Client, MessageEmbed} = require("discord.js")
const client = new Client()

client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.me && reaction.count > 1) {
        if (reaction.emoji.name === "GreenTick") {
            const usersGuild = reaction.message.client.guilds.resolve("733760690317164676")
           
            if (usersGuild) {
                const support = usersGuild.members.resolve("733751647980879894")
                
                if (support) {
                    const newEmbed = new MessageEmbed(reaction.message.embeds[0])
                    newEmbed.setAuthor(user.tag)
                    newEmbed.title = "Issue"
                    newEmbed.description = ""

                    support.send({
                        embed: newEmbed
                    })
                    .then(() => {
                        reaction.message.delete()
                        reaction.message.channel.send({
                            embed: {
                                title: "Sent",
                                description: "Your message has been sent",
                                color: 0x002e01
                            }
                        })
                    })
                    .catch(() => {
                        reaction.message.delete()
                        reaction.message.channel.send({
                            embed: {
                                title: "Error",
                                description: "An error occured while sending your message",
                                color: 0x520000
                            }
                        })
                    })
                }
            }
        }
        if (reaction.emoji.name === "RedCross") {
            reaction.message.delete()
            reaction.message.channel.send({
                embed: {
                    title: "Canceled",
                    description: "Your message has been canceled",
                    color: 0x520000
                }
            })
        }
    }
})

client.on("message", (msg) => {
    if (msg.channel.type === "dm" && msg.author.id != client.user.id) {
        if (msg.content[0] === "!") {
            const slice = msg.content.substring(1).split(" ")
            const commandName = slice.shift().toLowerCase()

            const command = commands.find(cmd => cmd.name === commandName)

            if (command == null) return

            let missingArgument
            const meetsRequirements = command.arguments.every((arg, index) => {
                if (arg[0] == "?") return true
                if (slice[index] == null) {
                    missingArgument = arg
                    return false
                }
                return true
            })

            if (meetsRequirements) {
                command.callback(msg, slice)
            }else{
                msg.channel.send(`Command Syntax: \`${commandUsage(command)}\``)
            }
        }
    }
})

function commandUsage(command) {
    let result = `!${command.name} `
    command.arguments.forEach(arg => {
        if (arg[0] == "?") {
            result += `[${arg.substring(1)}] `
        }else{
            result += `<${arg}> `
        }
    });
    return result
}

client.login(process.env.BOT_TOKEN)