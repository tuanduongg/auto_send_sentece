const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
    console.log(`Bot đã đăng nhập với tên ${client.user.tag}`);

    cron.schedule('30 6 * * *', () => { // Gửi lúc 6:30 sáng hằng ngày
        const channel = client.channels.cache.get(process.env.CHANNEL_ID);
        if (channel) {
            const selectedMessages = [];
            while (selectedMessages.length < 3) {
                const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
                if (!selectedMessages.includes(randomMessage)) {
                    selectedMessages.push(randomMessage);
                }
            }
            channel.send(selectedMessages.join('\n'));
        } else {
            console.log("Không tìm thấy kênh!");
        }
    });
});

client.login(process.env.TOKEN);

