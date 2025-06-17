require('dotenv').config();
const readline = require('readline');
CozeClient = require("./coze_chat_client_nodejs")

async function main() {
    const API_KEY = process.env.COZE_API_KEY;
    const BOT_ID = process.env.COZE_BOT_ID;
    const USER_ID = process.env.COZE_USER_ID;

    if (!API_KEY || !BOT_ID || !USER_ID) {
        console.error('错误: 请确保在.env文件中设置了COZE_API_KEY, COZE_BOT_ID, 和COZE_USER_ID');
        process.exit(1);
    }

    const client = new CozeClient(API_KEY, BOT_ID);
    let conversationId = null;

    console.log("Coze智能体对话开始！输入 'quit' 退出对话");
    console.log("-".repeat(50));

    // 创建readline接口
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const askQuestion = () => {
        return new Promise((resolve) => {
            rl.question('\n您: ', (answer) => {
                resolve(answer);
            });
        });
    };

    try {
        while (true) {
            const userInput = (await askQuestion()).trim();

            if (['quit', 'exit', '退出'].includes(userInput.toLowerCase())) {
                console.log("对话结束，再见！");
                break;
            }
            if (!userInput) {
                continue;
            }
            process.stdout.write("智能体: ");
            // 发送消息并获取响应
            const result = await client.streamChat(USER_ID, userInput, conversationId);

            if (result.response !== null) {
                conversationId = result.conversationId;
            }
        }
    } catch (error) {
        if (error.message === 'interrupted') {
            console.log("对话被用户中断");
        } else {
            console.error(`发生错误: ${error.message}`);
        }
    } finally {
        rl.close();
    }
}

if (require.main === module) {
    main().catch(console.error);
}