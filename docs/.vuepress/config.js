function getGuideSidebar(groupA, groupB, groupC) {

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
            '/guide/': getGuideSidebar('Introduction', 'Threat model', 'Technical design'),
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
        ],
        repo: 'https://github.com/bitonproject',
        editLinks: true,
        editLinkText: 'Help us improve this page!',
        lastUpdated: 'Last Updated',
        smoothScroll: true,
    }
}

function getGuideSidebar (groupA, groupB, groupC) {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                ''
            ]
        },
        {
            title: groupB,
            collapsable: false,
            children: [
                'threat-model'
            ]
        },
        {
            title: groupC,
            collapsable: false,
            children: [
                'technical'
            ]
        }
    ]
}
