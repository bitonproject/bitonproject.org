# A building block for a local-first Internet


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

| Interface | Repository | Implementation | Proxying | Storage |
|----------:|:----------:|:--------------:|:--------:|:-------:|
| npm module | <https://github.com/bitonproject/biton> | Extension to [WebTorrent](https://github.com/WebTorrent) (Node.js) | Yes | Yes |
| hybrid client | <https://github.com/bitonproject/biton/bin> | CLI client (Node.js) | Yes | Yes |
| web client | <https://github.com/bitonproject/biton-web> | Web interface | Yes | Yes |
| redux middleware | | | |
| libp2p transport | <https://github.com/bitonproject/js-libp2p-biton> | Libp2p transport | Yes | No |
