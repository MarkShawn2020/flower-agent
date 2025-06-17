# 米塔花语智能体 (Mita Flower Language Agent)

## 项目简介

这是由赵老师研发的花语智能体项目，基于Coze平台构建的对话式AI系统。该智能体专门用于花语相关的对话和咨询，能够理解和回答关于花卉象征意义、花语文化等相关问题。

## 功能特点

- 🌸 **花语对话**：专业的花语知识问答
- 💬 **流式对话**：实时响应，流畅的对话体验
- 📚 **会话记忆**：支持多轮对话，保持上下文连贯
- 🔄 **持续会话**：自动保存对话历史

## 技术架构

- **平台**：Coze AI平台
- **语言**：Node.js
- **依赖**：axios (HTTP请求库)
- **接口**：Coze API v3

## 项目结构

```
zhaolaoshi/
├── package.json              # 项目配置文件
├── coze_chat_client_nodejs.js # Coze客户端核心类
├── coze_chat_client_demo.js   # 演示程序主入口
├── pnpm-lock.yaml            # 依赖锁定文件
└── README.md                 # 项目说明文档
```

## 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm
pnpm install
```

## 配置说明

在使用前，需要在 `coze_chat_client_demo.js` 中配置以下参数：

```javascript
const API_KEY = "your_coze_api_key";    // 替换为您的Coze API密钥
const BOT_ID = "your_bot_id";           // 替换为您的智能体ID
const USER_ID = "your_user_id";         // 替换为用户ID
```

## 使用方法

### 启动对话

```bash
node coze_chat_client_demo.js
```

### 对话操作

- 输入任何花语相关问题进行对话
- 输入 `quit`、`exit` 或 `退出` 结束对话
- 支持中文和英文退出指令

### 使用示例

```
Coze智能体对话开始！输入 'quit' 退出对话
--------------------------------------------------

您: 玫瑰花的花语是什么？
智能体: 玫瑰花的花语因颜色而异。红玫瑰代表热烈的爱情和激情...

您: 白玫瑰呢？
智能体: 白玫瑰象征纯洁、真诚的爱情，也代表着尊敬和纯真...

您: quit
对话结束，再见！
```

## 核心类说明

### CozeClient

主要的客户端类，负责与Coze API的交互。

#### 构造函数
```javascript
new CozeClient(apiKey, botId)
```

#### 主要方法
```javascript
async streamChat(userId, message, conversationId = null)
```

- `userId`: 用户唯一标识
- `message`: 用户输入的消息
- `conversationId`: 会话ID（可选，用于保持对话连续性）

## API 接口

- **基础URL**: `https://api.coze.cn/v3/chat`
- **认证方式**: Bearer Token
- **响应格式**: 流式数据（Server-Sent Events）

## 错误处理

- 网络请求超时：30秒
- JSON解析错误处理
- 流式数据接收异常处理
- 用户中断对话处理

## 开发说明

### 主要特性

1. **流式响应**：使用Server-Sent Events实现实时响应
2. **会话保持**：自动管理conversation_id实现多轮对话
3. **错误恢复**：完善的错误处理机制
4. **用户友好**：支持多种退出方式

### 扩展开发

如需扩展功能，可以修改以下文件：

- `coze_chat_client_nodejs.js`：修改API交互逻辑
- `coze_chat_client_demo.js`：修改用户界面和交互流程

## 注意事项

1. 确保API密钥的安全性，不要将其提交到版本控制系统
2. 定期检查API调用限制和配额
3. 建议将敏感配置信息存储在环境变量中

## 许可证

ISC License

## 联系方式

如有问题或建议，请联系项目维护者。

---

*本项目由赵老师研发，专注于花语文化的智能对话体验。*