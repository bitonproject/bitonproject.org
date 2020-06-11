# A building block for a local-first Internet


## Available biton0_BitTorrent0_js interfaces
             
```
+------------------------+
|       OSI Model        |
+------------------------+

+------------------------+ +--------------+ +----------------+ +------------+
|      Application       | |  npm module  | | node.js client | | web client |
+------------------------+ +--------------+ +----------------+ +------------+
|      Presentation      |
+------------------------+                               +------------------+
|        Session         |                               | redux middleware |
+------------------------+ +----------------------------++------------------+
|       Transport        | | libp2p transport interface |
+------------------------+ +----------------------------+
|       Internet         |
+------------------------+
```
