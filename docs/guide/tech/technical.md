# The biton overlay

The biton overlay is constructed by mapping overloaded Content Addressable Network (CAN) coordinate zones to BitTorrent swarms. This mapping is done in a deterministic way and for multiple levels of partitioning, so as to maintain connectivity and cached content livability while handling node churn. Peer discovery and estimation of swarm size is facilitated by BitTorrent MainlineDHT.

Users maintain long-lived connections with peers within their own and neighboring swarms, and routing across swarms follows the CAN protocol. Each node locally keeps track of the capacity of its neighbors to successfully and efficiently deliver messages to hidden services (peer profiling). Based on that, they can make game-theoretic stochastic decisions on how to perform routing. This principle builds in the right incentives for users to contribute bandwidth and storage resources, and to fairly execute the biton protocol, so as to get the best performance and privacy. Nodes connected over bandwidth-metered connections can still use the network but with weaker privacy guarantees. Moreover, biton's routing strategy improves fault tolerance and can be adapted to mesh topologies. We expect super-nodes that naturally emerge in BitTorrent, to improve the performance of biton and the availability of the cached content.

## Bypassing information controls

biton aims to addresses the capabilities of modern Information Controls adversaries. Specifically, biton defends against:

1. protocol fingerprinting and traffic analysis attacks
2. the establishment of national intranets
3. bridge enumeration and blocking

The design can support both low-latency proxying and redundant file storage, with plausible deniability. For that, we construct a peer-to-peer overlay network on top of BitTorrent.

For (1. protocol fingerprinting and traffic analysis attacks), biton is extending the BitTorrent protocol. BitTorrent is an ideal candidate because of its widespread adoption both by end-users and by corporations, that makes biton traffic less suspicious to network observers and raises the collateral damage of blocking it. There is no central directory to keep track of which swarms a user is connected to. Users maintain long-lived packet-switched encrypted connections that, together with file replication to serve as decoy traffic, do not leak metadata about user actions.

Defending against (2. the establishment of national intranets) is possible because of biton's decentralized nature and the support for redundant storage. In addition, biton can  work as a sneakernet and in mesh topologies.

With regards to (3. bridge enumeration and blocking), biton provides a scalable routing mechanism for reaching "hidden services" within a swarm without knowing their identifiers.


## Poster

[![POSTER: Circumventing online censorship with biton](/img/biton_poster.png)](/pdf/biton_poster.pdf)
