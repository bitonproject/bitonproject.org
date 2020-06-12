# A building block for a local-first Internet

## Full and light biton nodes


## Integrate biton in your project

### Available Interfaces
             
```
+------------------------+
|       OSI Model        |
+------------------------+

+------------------------+ +--------------+ +---------------+ +------------+
|      Application       | |  npm module  | | hybrid client | | web client |
+------------------------+ +--------------+ +---------------+ +------------+
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
| hybrid client | [biton/bin](https://github.com/bitonproject/biton/tree/master/bin) | Demo CLI client that supports WebRTC and TCP connections (Node.js, using the npm module) | Yes | Yes | Yes |
| web client | [biton-web](https://github.com/bitonproject/biton-web) | Web interface (React, integrating the redux middleware) | Yes | Yes | Yes |
| redux middleware | | Redux middleware (using the biton npm module) | Yes | No | No |
| libp2p transport | [js-libp2p-biton](https://github.com/bitonproject/js-libp2p-biton) | [Libp2p transport](https://github.com/libp2p/js-libp2p-interfaces/tree/master/src/transport) (Node.js using the biton npm module) | Yes | No | No |
