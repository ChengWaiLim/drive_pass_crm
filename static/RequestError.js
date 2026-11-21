class RequestError extends Error {
    constructor(code, status, message) {
        var messageZh = message != null && message.message_zh != null ? String(message.message_zh) : ""
        super(messageZh)
        this.name = "RequestError"
        this.code = code
        this.status = status
        this.messageZh = messageZh
        this.messageCn = message != null ? message.message_cn : null
        this.messageEn = message != null ? message.message_en : null
        Object.setPrototypeOf(this, RequestError.prototype)
    }
}

export default RequestError
