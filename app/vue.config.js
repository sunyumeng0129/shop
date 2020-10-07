let data = require('./src/mock/index.js')
const pxtorem = require('postcss-pxtorem')


module.exports = {
    devServer: {
        before(app) {
            app.get('/list', (req, res) => {
                res.send(data)
            })
        },
        proxy: 'http://localhost:7001',
    },
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*'],
                        selectorBlackList: ['van-circle__layer']
                    })
                ]
            }
        }
    }
}