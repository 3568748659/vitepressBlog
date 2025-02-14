const myList = [
    {
        text: 'java',
        items: [
            { text: 'springBoot', link: '/java/springBoot' },
            { text: 'spring第三方库', link: '/java/springThirdPartyLibrary' },
            { text: 'mybatis', link: '/java/mybatis' },
            { text: 'mybatisPlus', link: '/java/mybatisPlus' },
            { text: 'springDataRedis', link: '/java/springDataRedis' },
            { text: 'javaAPI', link: '/java/javaAPI' },
            { text: 'java基础', link: '/java/java' },
        ]
    },
    {
        text: 'js',
        items: [
            { text: 'vue', link: '/js/vue' },
            { text: 'html&&css', link: '/js/htmlcss' },
            { text: 'js基础', link: '/js/js' },
            { text: 'js库', link: '/js/jsThirdPartyLibrary' }
        ]
    },
    {
        text: '数据库',
        items: [
            { text: 'mysql', link: '/sql/mysql' },
            { text: 'redis', link: '/sql/redis' }
        ]
    },
    {
        text: '其他',
        items: [
            { text: 'linux命令', link: '/other/linux' },
            { text: 'git相关', link: '/other/git' },
        ]
    }
]


export default {
    title: "笔记文档库", // 网站标题
    description: "笔记文档库", // 网站描述
    head: [ // 配置网站的图标（显示在浏览器的 tab 上）
        ['link', { rel: 'icon', href: '/public/favicon.ico' }],
    ],
    themeConfig: { //页面顶部导航栏
        nav: [
            { text: '首页', link: '/' },
            { text: '导航', link: '/guide/' },
            { text: '关于', link: '/about/' },
            {
                text: '更多',
                items: [
                    { text: 'GitHub', link: 'https://github.com/3568748659' },
                    { text: 'git', link: 'https://gitee.com/hyl19' }
                ]
            }
        ],
        sidebar: {
            '/guide/': myList,
            '/java/': myList,
            '/js/': myList,
            '/sql/': myList,
            '/other/': myList
        }
    }
}