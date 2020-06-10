const path = require('path')

function getGuideSidebar (intro, tech, run) {
    return [
        {
            title: intro,
            collapsable: false,
            children: [
                '',
                'intro/threat-model',
                'intro/developers'
            ]
        },
        {
            title: tech,
            collapsable: false,
            children: [
                'tech/technical',
                'tech/specification'
            ]
        },
        {
            title: run,
            collapsable: false,
            children: [
                'run/',
                ['run/biton', 'biton hybrid client'],
                ['run/biton-web', 'biton Web client']
            ]
        }
    ]
}

module.exports = {
    title: 'biton',
    description: 'biton is a peer-to-peer network around local communities. Re-build the Internet, together!',
    head: [
        ['meta', { name:'keywords', content: 'biton decentralized peer-to-peer privacy secure network internet freedom'}]
    ],
    themeConfig: {
        sidebar: {
            sidebarDepth: 2,
            '/guide/': getGuideSidebar('Introduction', 'Technical design', 'Running biton'),
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
        ],
        repo: 'https://github.com/bitonproject',
        lastUpdated: 'Last Updated',
        smoothScroll: true,
    }
}
