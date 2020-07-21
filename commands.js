const dateRegex = /\d{2}\/\d{2}\/\d{4}/
const timeRegex = /\d{2}:\d{2}/

module.exports = [
    {
        name: "playerreport",
        arguments: [],
        callback: function(msg) {
            msg.channel.send(
                "Read the server's rules e.t.c. and DM support of the server. We cannot help you with this."
            )
            .catch(console.log)
        }
    },
    {
        name: "botissue",
        arguments: ["date (DD/MM/YYYY)", "time (HH:MM 24 hour)", "timezone (XXX)", "issue", "?cause"],
        callback: function(msg, [date, time, zone, ...issueAndCause]) {
            if (!dateRegex.test(date)) return msg.channel.send("Enter a valid Date (DD/MM/YYYY)")
            if (!timeRegex.test(time)) return msg.channel.send("Enter a valid Time (HH:MM 24 hour)")

            zone = zone.toUpperCase()

            try {
                msg.channel.send({
                    embed: {
                        title: "Confirm",
                        type: "rich",
                        description: "Please confirm the message",
                        fields: [
                            {
                                name: "Date",
                                value: date,
                                inline: true,
                            },
                            {
                                name: "Time",
                                value: time,
                            },
                            {
                                name: "Timezone",
                                value: zone
                            },
                            {
                                name: "Issue & Cause",
                                value: issueAndCause
                            },
                            {
                                name: "Type",
                                value: "Bot Issue"
                            }
                        ]
                    }
                })
                .then(async (msg) => {
                    const emojiGuild = msg.client.guilds.resolve("733760690317164676")
                    if (emojiGuild) {
                        const yesEmoji = emojiGuild.emojis.cache.find(emoji => emoji.name == "GreenTick")
                        const noEmoji = emojiGuild.emojis.cache.find(emoji => emoji.name == "RedCross")
                        if (yesEmoji && noEmoji) {
                            msg.react(yesEmoji),
                            msg.react(noEmoji)
                        }
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
            }catch (e){
                console.log(e)
            }
        }
    },
    {
        name: "serverissue",
        arguments: ["date (DD/MM/YYYY)", "time (HH:MM 24 hour)", "timezone (XXX)", "server-name", "issue", "?cause", "?extra's"], 
        callback: function(msg, [date, time, zone, ...issueAndCauseAndExtra]) {
            if (!dateRegex.test(date)) return msg.channel.send("Enter a valid Date (DD/MM/YYYY)")
            if (!timeRegex.test(time)) return msg.channel.send("Enter a valid Time (HH:MM 24 hour)")

            zone = zone.toUpperCase()

            try {
                msg.channel.send({
                    embed: {
                        title: "Confirm",
                        type: "rich",
                        description: "Please confirm the message",
                        fields: [
                            {
                                name: "Date",
                                value: date,
                                inline: true,
                            },
                            {
                                name: "Time",
                                value: time,
                            },
                            {
                                name: "Timezone",
                                value: zone
                            },
                            {
                                name: "Server, Issue, Cause & Extra's",
                                value: issueAndCauseAndExtra.join(" ")
                            },
                            {
                                name: "Type",
                                value: "Server Issue"
                            }
                        ]
                    }
                })
                .then(async (msg) => {
                    const emojiGuild = msg.client.guilds.resolve("733760690317164676")
                    if (emojiGuild) {
                        const yesEmoji = emojiGuild.emojis.cache.find(emoji => emoji.name == "GreenTick")
                        const noEmoji = emojiGuild.emojis.cache.find(emoji => emoji.name == "RedCross")
                        if (yesEmoji && noEmoji) {
                            msg.react(yesEmoji),
                            msg.react(noEmoji)
                        }
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
            }catch (e){
                console.log(e)
            }
        }
    }
]