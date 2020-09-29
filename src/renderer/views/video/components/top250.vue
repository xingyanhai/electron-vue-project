<!--
  创建人：xyh
  创建时间：2020年9月29日11:44:07
  页面描述：top250
-->
<template>
    <div>

    </div>
</template>

<script>
    // vuex等插件

    // 组件

    // 枚举

    // 方法

    // 接口
    import {timeout} from '../../../../util/util'
    import fetch from '../../../../util/fetch'
    const cheerio = require('cheerio')
    export default {
        // 组件
        components: {},

        // 数据对象，本页面用到的所有数据
        data () {
            return {
                list: []
            }
        },

        // 计算属性
        computed: {},

        // 监控
        watch: {},

        // 方法与事件处理
        methods: {
            async getData () {
                for (let i = 0; i < 1; i += 25) {
                    let data = await this.getMovieList({
                        start: i
                    })
                    this.list.push(...data)
                }
                console.log(this.list)
            },
            async getMovieList (data) {
                let returnData
                // 打开页面时间
                const startTime = new Date()
                // 渲染URL
                const url = `https://movie.douban.com/top250`
                try {
                    console.log('------1', data)
                    const fetchParams = {
                        url,
                        params: {
                            start: data.start
                        },
                        method: 'get',
                        timeout: 60000
                    }
                    console.log('------2')
                    const html = await fetch(fetchParams)
                    console.log('------3')
                    console.log(html)
                    // 载入并初始化cheerio
                    const $ = cheerio.load(html)
                    let $list = $('.grid_view .item')
                    console.log($list.length)
                    let saveData = []
                    for (let i = 0; i < $list.length; i++) {
                        console.log(`------------------第${i + 1}个------------`)
                        let $item = $($list[i])
                        let url = $item.find('.info a').attr('href')
                        let index = Number($item.find('.pic em').text())
                        let coverImgSrc = $item.find('.pic img').attr('src')
                        let name = $item.find('.info a span').eq(0).text()
                        let totalName = $item.find('.info a').text()
                        let infoList = $item.find('.info .bd p').eq(0).text().split('\n')
                        let actorText = infoList[1].trim()
                        let typeText = infoList[2].trim()
                        let score = $item.find('.info .rating_num').text()
                        let commitCount = $item.find('.star span').last().text()
                        let oneWord = $item.find('.info .quote .inq').text()
                        let detailData = {}
                        detailData = await this.getMovieDetail({
                            url
                        })
                        await timeout(1000 + i)

                        saveData.push({
                            url,
                            movieId: url.split('/')[url.split('/').length - 2],
                            index,
                            coverImgSrc,
                            name,
                            totalName,
                            actorText,
                            typeText,
                            score,
                            commitCount,
                            oneWord,
                            ...detailData
                        })
                    }
                    returnData = saveData
                } catch (err) {
                    throw err
                }
                console.log(`页面耗时: ${new Date() - startTime}ms，渲染页URL：${url}`)
                return returnData
            }
        },

        // 组件生命周期钩子，一般常用的是 mounted
        mounted () {
            this.getData()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>
