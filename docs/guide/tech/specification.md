# Protocol specification <Badge text="alpha" type="warning"/>


## Versioning

```biton.VERSION = “biton” | bitonCrypto.VERSION | “_” | biton.TRANSPORT```

This document outlines the specification for ```biton0_BitTorrent```.


## Notation

* x | y is the concatenation of x and y.
* x || y concatenates x and y with an ampersand character ('&') as separator. For null/empty fields we write no bytes but still add the separator.
* \[ ] denotes uint8_t arrays.
* s[:n] is the first n bytes of s.
* All numeric fields in the wire protocol are transmitted as Big Endian (Network byte order) values.
* For fields of variable length, we write the field length followed by the field value.


## bitonCrypto.VERSION = 0

* Proxying based on NoiseSocket and the noise-c library
  * ```bitonCrypto.NOISE_PROTOCOL = NOISE_*_25519_ChaChaPoly_Blake2b```
* Chunks encrypted with libsodium crypto_secretstream
  * ```bitonCrypto.secretstream = secretstream_xchacha20poly1305```
* Generic hash algorithm
  * ```bitonCrypto.hash = Blake2b_256```


## biton client address

```
keypair = bitonCrypto.generateKeyPair().x25519
identity = bitonCrypto.base58.encode(keypair.public)
peerId = WebTorrent.VERSION_PREFIX[:8] | identity[:12]
```

> Example: for```identity = BkZgDsGD94DtZ83BwsHgce4Q4j2qr5PQGpjPQnPj8BGs```:  
``` peerId = -WW0008-BkZgDsGD94Dt``` in utf8,  
or ```peerId  = 2d5757303030382d426b5a674473474439344474``` in hex.


## biton swarm address

```swarmId = bitonCrypto.hash( biton.VERSION || networkMagic || swarmSecret || swarmPath )[:20]```

* ```bitonVersion = “biton” | bitonCrypto.VERSION``` (e.g. “biton0”)
* ```networkMagic```: 4 “magic” bytes for specifying a network (e.g. [0, 0, 0, 0] for the main network, and [0x74, 0x65, 0x73, 0x74] for the test network)
* ```swarmSeed```: the secret seed for connecting to a private swarm (e.g. “orbit#biton”, or null for global swarms)
* ```swarmPath```: the path from root to the corresponding node in the CAN partition tree,  or null for the root swarm


> Example: ```swarmId = bitonCrypto.hash ( “biton0” || [0, 0, 0, 0] || null || 0x5 )[:20]```


## biton data chunk address

* ```chunkHash = bitonCrypto.hash(chunk)```
* ```chunkId = bitonCrypto.hash(biton.VERSION || networkMagic || swarmSecret || chunkHash)```
* Mesospore wire header: ```sporeId = spore.VERSION | networkMagic | chunkId | capabilities | chunk```

Chunks are 1KB or 32KB parts of a bitonCrypto.secretstream

> Example: ```sporeId = “spore0” | [0, 0, 0, 0] | chunkId | capabilities | chunk```


## Wire message format

```“5biton” | version | networkMagic | command | command headers | payload```


| Field size (bytes) | Description | Data type | Comments |
|--------------------|:-----------:|:---------:|:--------:|
| 6 | Protocol | char[6] | protocol name length, followed by protocol name in ASCII```5biton``` |
| 1 | Crypto version | uint8_t | 1 byte of zero (\[0]) for bitonCrypto.VERSION = 0 |
| 4 | Destination network magic bytes | uint32_t | Magic bytes for specifying biton network. Main net is 4 bytes of 0 [0, 0, 0, 0]. Test net is [0x74, 0x65, 0x73, 0x74] |
| 1 | biton command | uint8_t | |
| variable | Command headers | \[ ] | |
| variable | Payload | \[ ] | Must be padded to one of the supported payload lengths (1KB or 32KB) |


## BitTorrent transport

* Referred to as ```biton*_BitTorrent```
* WebTorrent extension implementing ```BEP 10```
* Extended message ID is ```biton```
* bencode for serialization
* Only load extension on wires to peers in biton swarms
