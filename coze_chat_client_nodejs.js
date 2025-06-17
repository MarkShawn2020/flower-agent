const axios = require('axios');

class CozeClient {
    constructor(apiKey, botId) {
        this.botId = botId; // 智能体ID
        this.baseUrl = "https://api.coze.cn/v3/chat";
        this.headers = {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        };
    }

    /**
     * 发送消息并获取流式响应
     * @param {string} userId - 用户ID
     * @param {string} message - 用户消息
     * @param {null} conversationId - 会话ID(可选)
     * @returns {Promise<{response: null, conversationId: null}>}
     */
    async streamChat(userId, message, conversationId = null) {
        console.log("======" + conversationId)
        const payload = {
            bot_id: this.botId,
            user_id: userId,
            stream: true,
            auto_save_history: true,
            additional_messages: [{
                    content: message,
                    content_type: "text",
                    role: "user",
                    type: "question"
            }]
        };

        // 如果有会话ID，添加到请求中
        if (conversationId) {
            payload.conversation_id = conversationId;
        }
        console.info(payload)
        try {
            const response = await axios.post(this.baseUrl, payload, {
                headers: this.headers,
                responseType: 'stream',
                timeout: 30000
            });

            if (response.status !== 200) {
                console.error(`错误: HTTP ${response.status}`);
                return { response: null, conversationId: null };
            }

            return new Promise((resolve, reject) => {
                let fullResponse = "";
                let newConversationId = null;

                response.data.on('data', (chunk) => {
                    const lines = chunk.toString().split('\n');
                    for (const line of lines) {
                        if (line.startsWith('data:')) {
                            const dataStr = line.substring(5); // 移除 'data:' 前缀
                            if (dataStr.trim()) {
                                try {
                                    const data = JSON.parse(dataStr);
                                    // 获取会话ID
                                    if (data.conversation_id) {
                                        newConversationId = data.conversation_id;
                                    }
                                    if (data.type === 'answer') {
                                        const content = data.content || '';
                                        if (content) {
                                            process.stdout.write(content);
                                            fullResponse += content;
                                        }
                                    }
                                } catch (e) {
                                    console.error(`JSON解析错误: ${e.message}`);
                                }
                            }
                        }
                    }
                });
                response.data.on('end', () => {
                    resolve({ response: fullResponse, conversationId: newConversationId });
                });
                response.data.on('error', (error) => {
                    console.error(`流式响应错误: ${error.message}`);
                    reject(error);
                });
            });
        } catch (error) {
            return { response: null, conversationId: null };
        }
    }
}

module.exports = CozeClient;