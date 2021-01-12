# A building block for peer-to-peer applications

## Full and light biton nodes


## Integrate biton in your project

### Available Interfaces
             
```
+------------------------+
|       OSI Model        |
+------------------------+

+------------------------+ +--------------+ +------------+ +---------+
|      Application       | |  npm module  | | hybrid app | | web app |
+------------------------+ +--------------+ +------------+ +---------+
|      Presentation      |
+------------------------+                              +------------------+
|        Session         |                              | redux middleware |
+------------------------+ +----------------------------+------------------+
|       Transport        | | libp2p transport interface |
+------------------------+ +----------------------------+
|       Internet         |
+------------------------+
```

| Interface | Repository | Implementation | Proxying | Storage | Full node |
|----------:|:----------:|:--------------:|:--------:|:-------:|:---------:|
| biton npm module | [biton](https://github.com/bitonproject/biton) | Extending [WebTorrent](https://github.com/WebTorrent) (Node.js) | Yes | Yes | Yes |
| biton hybrid app | [biton/bin](https://github.com/bitonproject/biton/tree/master/bin) | Demo CLI that supports WebRTC and TCP connections (Node.js, using the npm module) | Yes | Yes | Yes |
| web app | [biton-web](https://github.com/bitonproject/biton-web) | Web interface (React, integrating the redux middleware) | Yes | Yes | Yes |
| redux middleware | | Redux middleware (using the biton npm module) | Yes | No | No |
| libp2p transport | [js-libp2p-biton](https://github.com/bitonproject/js-libp2p-biton) | [Libp2p transport](https://github.com/libp2p/js-libp2p-interfaces/tree/master/src/transport) (Node.js using the biton npm module) | Yes | No | No |
