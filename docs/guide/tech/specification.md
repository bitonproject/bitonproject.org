# Protocol specification <Badge text="alpha" type="warning"/>


## Versioning

* `biton.VERSION = "biton" || bitonCrypto.VERSION`
* `biton.PROTOCOL = biton.VERSION || "_" || biton.TRANSPORT`

This document outlines the specification for protocol `biton0_BitTorrent`.


## Notation

* `x || y` is the concatenation of x and y without a separator.
* `x |: y` concatenates x and y with a colon character (':') as separator. You must use this concatenation when a field is optional. In that case, we write no bytes for the empty fields, but still add the separator.
* `[ ]` denotes byte (uint8_t) arrays.
* `s[:n]` is the first n bytes of s.
* All numeric fields in the wire protocol are transmitted as Big Endian (Network byte order) values.
* For fields of variable length, we write the field length followed by the field value.


## bitonCrypto.VERSION = 0

* Proxying based on NoiseSocket and the noise-c library
  * `bitonCrypto.NOISE_PROTOCOL = NOISE_*_25519_ChaChaPoly_Blake2b`
* Chunks encrypted with libsodium crypto_secretstream
  * `bitonCrypto.secretstream = secretstream_xchacha20poly1305`
* Generic hash algorithm
  * `bitonCrypto.hash = Blake2b_256`


## biton node address

```
keypair = bitonCrypto.generateKeyPair().x25519
bitonId = bitonCrypto.base58.encode(keypair.public)

For biton*_BitTorrent:
peerId = WebTorrent.VERSION_PREFIX[:8] || bitonId[:12]
```

> Example: for `bitonId = BkZgDsGD94DtZ83BwsHgce4Q4j2qr5PQGpjPQnPj8BGs`, `peerId = -WW0008-BkZgDsGD94Dt` in utf8, or `peerId = 2d5757303030382d426b5a674473474439344474` in hex.


## Network magic

* `networkMagic`: 4 “magic” bytes for specifying a network (e.g. `[0x74, 0x65, 0x73, 0x74]` for the test network), or no bytes for the main network


## biton swarm address

* `swarmId = biton.VERSION |: networkMagic |: swarmPath |: swarmSeed`
* `swarmHash = bitonCrypto.hash( swarmId )[:20]`

Where: 

* `swarmPath`: the path from root to the corresponding swarm in the CAN partition tree, or no bytes for the root swarm
* `swarmSeed`: the seed for connecting to an application swarm (e.g. `"orbit#biton"`), or no bytes for the global swarm

> Example: `swarmId = bitonCrypto.hash ( "biton0" |: (no bytes for main net) |: 0x5 |: (no bytes for global swarm) )[:20]`


## biton data chunk address

* `chunk`s are 1KiB, 16KiB, 128KiB, or 256KiB parts of `bitonCrypto.secretstream`
* `chunkHash = bitonCrypto.hash(chunk)`
* `chunkId = bitonCrypto.hash(biton.VERSION |: networkMagic |: swarmSeed |: chunkHash)`
* Mesospore wire header: `sporeId = spore.VERSION |: networkMagic |: chunkHash |: capabilities |: chunk`

> Example: `sporeId = "spore0" |: [0x74, 0x65, 0x73, 0x74] |: chunkHash |: capabilities |: chunk`


## Wire message format

`"5biton" || bitonCrypto.VERSION || networkMagic || command || command headers || payload`


| Field size (bytes) | Description | Data type | Comments |
|--------------------|:-----------:|:---------:|:--------:|
| 6 | Protocol | char[6] | protocol name length, followed by protocol name in ASCII (`5biton`) |
| 1 | Crypto version | uint8_t | 1 byte of zero (\[0]) for bitonCrypto.VERSION = 0 |
| 4 | Destination network magic bytes | uint32_t | Magic bytes for specifying biton network. Main net is 4 bytes of 0 `[0, 0, 0, 0]`. Test net is `[0x74, 0x65, 0x73, 0x74]` |
| 1 | biton command | uint8_t | |
| variable | Command headers | \[ ] | |
| variable | Payload | \[ ] | |


## `BitTorrent` transport

* Referred to as `biton*_BitTorrent`
* WebTorrent extension implementing [`BEP 10`](http://www.bittorrent.org/beps/bep_0010.html)
* Extended message ID is `biton`
* Serialization using [`bencode`](https://www.bittorrent.org/beps/bep_0003.html)
* Only load extension on wires of peers in biton swarms
* Require MSE/PE encryption for the full connection
