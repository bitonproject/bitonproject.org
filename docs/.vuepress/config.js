function getGuideSidebar (groupA, groupB) {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                '',
                'threat-model',
                'developers'
            ]
        },
        {
            title: groupB,
            collapsable: false,
            children: [
                'technical',
                'specification'
            ]
        }
    ]
}

module.exports = {
    title: 'biton',
    description: 'biton is a peer-to-peer network built around local communities. Re-build the Internet, together!',
    head: [
        ['meta', { name:'keywords', content: 'biton decentralized peer-to-peer privacy secure network'}]
    ],
    themeConfig: {
        sidebar: {
            sidebarDepth: 2,
            '/guide/': getGuideSidebar('Introduction', 'Technical design'),
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
