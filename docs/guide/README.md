# Evading information controls with biton

*We celebrate the Internet as a safe space, where we communicate and express
ourselves free of censorship and surveillance, connecting through the people we
trust. And you are invited!*

biton is a [peer-to-peer network](https://en.wikipedia.org/wiki/Peer-to-peer)
for anonymous routing and storage. As much as we like to think of the Internet
as a safe space, putting trust in central entities has paved the way for
censorship and surveillance that harm our digital freedoms. biton joins the
long-running efforts for [decentralized
networking](https://www.petsymposium.org/2017/papers/issue4/paper87-2017-4-source.pdf),
where users cooperate in running services and hosting data, effectively
bypassing information controls by third-party platforms or infrastructure.

Our approach is to interconnect decentralized applications, leverage the
existing long-lived connections with trusted peers, and mix traffic in ways that
an adversary cannot know who is the originator or recipient of a request.
Furthermore, we employ techniques such as encrypted content replication to serve
as cover traffic and in this way hide metadata about user activity. Users
participate according to their capacity; the more resources they can contribute,
the better the anonymity and performance for themselves, their friends, and the
biton network overall. With this setup biton can support decentralized anonymous
applications for group messaging, social media, file sharing, blockchains, and
similar use cases.


## A network stack for decentralized anonymous applications

biton is built around the concept of *swarms* — groups of peers that store
encrypted files and relay requests through one another. These swarms operate in
two levels. First, they enable communities to create their own isolated *local*
networks for services and content that is relevant to their members. Second,
biton interconnects peers across community networks in order to create a
*global* network that can support anonymous applications.

Compared to other peer-to-peer overlay networks, biton differs by (1) building
upon social trust, (2) supporting both low-latency routing and redundant
storage, (3) accounting for node heterogeneity with regards to availability,
bandwidth and storage, and (4) its special focus in evading surveillance and
censorship.

Strong anonymity requires a large diversified userbase (anonymity set), diverse
applications (i.e. an anonymity network for a specific use case reveals
information about the interests of its users), constant traffic (to conceal
metadata about user activity from network adversaries), and some confidence
about the peers who relay requests (adversaries can infer information about
user actions either by passively observing or actively manipulating the requests
of the nodes they are connected to).

With that in mind, we believe that the way forward is to develop biton as a
peer-to-peer network stack. This will allow us to build a general purpose
anonymity layer by combining the trust relationships and the traffic load of
independent applications.

biton will provide the following building blocks for developers:

### Identity management

A unified way to control cryptographic identities, and to generate [unlinkable
pseudonymous accounts](https://dl.acm.org/doi/abs/10.1145/2994620.2994637) that
can be shared across applications built over biton. Each account has separate
privacy policies (compartmentalization), that also concern
[routing](https://arxiv.org/pdf/1305.5236.pdf).

### Bottom-up trust models

biton provides flexible trust models that prioritize social relationships rather
than relying on central authorities. In effect, we build a [Web of
Trust](https://en.wikipedia.org/wiki/Web_of_trust) for biton user identities
that comes with [privacy controls](https://claimchain.github.io), as users can
select who gets access to their social graph. These trust relationships are
available to decentralized applications, e.g. for discovering content and
preventing spammers. In addition, trust is embedded into routing decisions so as
to thwart adversaries from isolating nodes (route capture and eclipse attacks).

### The overlay network

[![POSTER: Circumventing online censorship with biton](/img/biton_poster.png)](/pdf/biton_poster.pdf)

biton introduces a way to build a scalable overlay for routing and storage based
on a variant of the [Content Addressable
Network](https://en.wikipedia.org/wiki/Content_addressable_network). This
approach performs consecutive partitions of the address space into zones as more
nodes join the network. Users occupy adjacent zones in the address space that
match their identity prefix according to their capacity to contribute bandwidth
and storage resources. Requests to remote zones are relayed through the existing
connections, taking into consideration trust relationships and other peer
profiling metrics.

This mechanism for addressing nodes and files can be replicated for isolated,
application-specific namespaces, which co-exist with the global biton network.
In this way biton can also be used over mesh topologies and community networking
infrastructures, and in so it can function during Internet shutdowns as far as
users can connect with other biton nodes in their region.


## Balancing Anonymity – Performance – Resources

Anonymity techniques, such as mixing messages and adding delays or cover
traffic to hide user activity, come [at a cost of bandwidth and latency
overhead](https://eprint.iacr.org/2017/954.pdf). Overall, nodes who allocate
more resources get in return better performance and anonymity for their
requests, as well as to some extend for the requests of their friends and of all
other users. This is further reinforced by the incentives built into the biton
routing and peer profiling mechanisms. In specific, nodes who contribute lots of
resources ("supernodes") benefit from the following:

* Being connected to many peers makes it more difficult for adversaries to infer
  whether a request originates with the supernode, since it could possibly be
  forwarded by one of its peers the adversary does not control (plausible
  deniability). This guarantee gets stronger when peers are verified.
* Long-lived connections are important for maintaining the anonymity set over
  time. Otherwise, internal adversaries can perform intersection attacks (narrow
  down the anonymity set based on who was online and any differences in the
  routing path during subsequent requests with the same destination).
* Relaying lots of traffic means that supernodes can inject more of their own
  requests into the network without altering their traffic pattern.
* Improved efficiency, as they can process more requests, and are better
  connected with peers in remote zones of the address space, therefore they can
  forward requests to a node that is closer to the destination in fewer hops.

[![biton routing operations and the Anonymity – Performance – Resources trilemma](/img/biton_operations_trilemma.png)](/img/biton_operations_trilemma.png)

biton aims to give users control over the Anonymity – Performance – Resources
trade-off via a layered approach, where they select an operation mode according
to their individual needs, and "unlock" thresholds in certain anonymity
functions as far as they comply with the respective criteria — such as
connections with verified peers, ability to sustain constant traffic,
application-specific accounts, and execution environment. This is done in
collaboration with the application developers, who specify the minimum privacy
level for their application.

For scenarios that do not require network-level anonymity, users can participate
in application-specific swarms, or they can establish end-to-end encrypted
connections directly to the destination. In this case, routing does not require
additional resources.

When users need to conceal their network identifiers or their activity, biton
offers the following operations:

* **Recursive routing:** Users relay the requests of their friends and peers in
  the global swarm to gain *plausible deniability*.
* **Onion routing:** Users encapsulate their messages into layers of encryption,
  so that each node in the path can only know the previous and next hop. Again,
  [social trust relationships](https://arxiv.org/pdf/1208.6326.pdf) are crucial
  in constructing paths that avoid attacks by malicious nodes.
* **Delays:** Onion routing messages are delayed at each hop following a
  [distribution](https://www.usenix.org/conference/usenixsecurity17/technical-sessions/presentation/piotrowska),
  in order to protect from [traffic analysis attacks](https://en.wikipedia.org/wiki/Traffic_analysis).
* **Storage replication:** Idle nodes can maintain a constant traffic pattern by
  replicating the encrypted files that correspond to their zone in the biton
  overlay. This operation also provides resistance to censorship, as cached
  content can be retrieved through the decentralized storage, even if the
  original inserter goes offline.
* **Swarm broadcasts:** Recipients can listen to requests that match a prefix of
  their biton address. In doing so, their anonymity set comprises of the honest
  nodes that share that prefix.


## Prototype implementation

In the context of the OTF fellowship we also developed a prototype
implementation of biton that can run as a standalone application or in the
browser. You can find more information at the [protocol
specification](/guide/tech/specification.html) and [source code
repositories](https://github.com/bitonproject/biton). Moreover, you can try a
demo by visiting https://demo.bitonproject.org .

In detail, biton is implemented as an extension to
[WebTorrent](https://webtorrent.io), a BitTorrent client written in Javascript.
Peer discovery is facilitated by the decentralized [Mainline
DHT](https://www.bittorrent.org/beps/bep_0005.html) using BitTorrent magnet
links that encode application secrets, which peers need to prove they know upon
joining a swarm. Communications are end-to-end encrypted using the
[Noise-C](https://noiseprotocol.org) library compiled to
[WebAssembly](https://webassembly.org).


## The Internet potluck

::: tip “But let us cultivate our garden.”

\- Voltaire, [*Candide*](https://www.gutenberg.org/ebooks/19942) (originally released anonymously)

:::

The next challenge is to further develop biton with an emphasis on usability,
equally for end users and application developers. The future of the Internet
might as well reside in the local "swarms" with people we share common
interests, building up to a global network where our fundamental digital rights
are protected.

We are grateful for the early feedback from participants at [Our
Networks](https://ournetworks.ca), the [32nd Multi-Service Networks workshop
(MSN 2020)](https://coseners.net), the [Privacy, Infrastructures, Policy
Workshop](https://uwaterloo.ca/cybersecurity-privacy-institute/events/privacy-infrastructures-policy),
[CrySP seminars](https://crysp.uwaterloo.ca), [HackFS](https://hackfs.com), and
the [Spark University
Hackathon](https://medium.com/encode-club/spark-university-hackathon-summary-and-winners-3c5e5a743b12).
Finally, we would like to thank Ian Goldberg, Professor at the University of
Waterloo, for his invaluable support throughout the OTF Information Controls
fellowship.

If you would be interested in adopting the biton network stack for your project,
please do reach out at [info@bitonproject.org](mailto:info@bitonproject.org)
