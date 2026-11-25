const sls = require('serverless-http')
const binaryMimeTypes = require('./binaryMimeTypes')
const nuxt = require('./nuxtBuild')

const handler = sls(nuxt, {
    binary: binaryMimeTypes
})

// API Gateway removes the stage from event.path. Nuxt router.base still includes it.
function withStagePath(event) {
    var stage = event.requestContext && event.requestContext.stage
    if (stage == null || stage === "")
        return event
    var prefix = "/" + stage
    var path = event.path || "/"
    if (path === prefix || path.startsWith(prefix + "/"))
        return event
    event.path = path === "/" ? prefix + "/" : prefix + path
    return event
}

module.exports.nuxt = (event, context) => handler(withStagePath(event), context)