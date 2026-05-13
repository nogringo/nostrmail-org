import type { ImageMetadata } from 'astro';
import derek from '../assets/avatars/derek.jpg';
import darthcoin from '../assets/avatars/darthcoin.jpg';
import kusnachter from '../assets/avatars/kusnachter.jpg';
import lmqevp from '../assets/avatars/lmqevp.jpg';
import soda from '../assets/avatars/soda.png';
import ppatel from '../assets/avatars/ppatel.png';
import niko from '../assets/avatars/niko.jpg';
import dadel from '../assets/avatars/dadel.jpg';

export type NostrEvent = {
	kind: number;
	id: string;
	pubkey: string;
	created_at: number;
	tags: string[][];
	content: string;
	sig: string;
};

export type CommunityQuote = {
	event: NostrEvent;
	name: string;
	npub: string;
	nevent: string;
	displayText: string;
	avatar?: ImageMetadata;
};

export const quotes: CommunityQuote[] = [
	{
		event: {"kind": 1, "id": "d2b8dbb2ee6e740cf2e983357251d3c13b61ae881d110773f890cc32d98e2048", "pubkey": "3f770d65d3a764a9c5cb503ae123e62ec7598ad035d836e2a810f3877a745b24", "created_at": 1776109304, "tags": [["client", "Ditto", "31990:781a1527055f74c1f70230f10384609b34548f8ab6a0a6caa74025827f9fdae5:ditto"]], "content": "interesting... https://nostrmail.org", "sig": "2022c928be0f8dc1642359eb198377277860f32ecb510222c9b00cbed2aad190c130f42b4f5e99a8474343f3388811f652dcc6f8c198846fc08d1db2beedb0dd"},
		name: "Derek Ross",
		npub: "npub18ams6ewn5aj2n3wt2qawzglx9mr4nzksxhvrdc4gzrecw7n5tvjqctp424",
		nevent: "nevent1qqsd9wxmkthxuaqv7t5cxdtj28fuzwmp46yp6yg8w0ufpnpjmx8zqjqzyqlhwrt96wnkf2w9edgr4cfruchvwkv26q6asdhz4qg08pm6w3djgjatps7",
		displayText: "interesting…",
		avatar: derek,
	},
	{
		event: {"kind": 1111, "id": "bd9fabeee6212bada86753237c296aae4e065479eb94d855d92f07e3f109cc01", "pubkey": "f9acb0b034c4c1177e985f14639f317ef0fedee7657c060b146ee790024317ec", "created_at": 1774852871, "tags": [["A", "32267:b22b06b051fd5232966a9344a634d956c3dc33a7f5ecdcad9ed11ddc4120a7f2:app.nostrmail.client"], ["K", "32267"], ["P", "b22b06b051fd5232966a9344a634d956c3dc33a7f5ecdcad9ed11ddc4120a7f2"], ["a", "32267:b22b06b051fd5232966a9344a634d956c3dc33a7f5ecdcad9ed11ddc4120a7f2:app.nostrmail.client"], ["k", "32267"], ["p", "b22b06b051fd5232966a9344a634d956c3dc33a7f5ecdcad9ed11ddc4120a7f2"], ["v", "0.7.2"]], "content": "Great app!\nI test it with Rusell and was very helpful.\nThis could open more doors for nostr.", "sig": "4e652899cc8a4dc0b8fd38614699616fc55c2c93846597ab20815de607a16ecc883e1517fdf692054ea0f126a29ca205d0683c5aa6cce71b651d008530de676a"},
		name: "DarthCoin ₿⚡️",
		npub: "npub1lxktpvp5cnq3wl5ctu2x88e30mc0ahh8v47qvzc5dmneqqjrzlkqpm5xlc",
		nevent: "nevent1qqstm8atamnzz2ad4pn4xgmu9942unsx23u7h9xc2hvj7plr7yyucqgzyru6ev9sxnzvz9m7np03gculx9l0plk7uajhcpstz3hw0yqzgvt7cs39d89",
		displayText: "Great app!\nI test it with Rusell and was very helpful.\nThis could open more doors for nostr.",
		avatar: darthcoin,
	},
	{
		event: {"kind": 1, "id": "b5503f39c5c18d3ed027482329f99f6f7a95eb1e51bcad7aa991201c546dcbe0", "pubkey": "6bd20b331bd499d0dc6b4974a048c5b636cd3111771782ced5103d6613258658", "created_at": 1778615571, "tags": [["alt", "A short note: Tested two new apps today.\n\n#Nmail (https://nostrm..."], ["p", "04f4e607604cc3f89a1cf148c4e10190abd13539a256a53e6096dc0429514b3a", "wss://directory.yabu.me/"], ["t", "Nmail"], ["t", "nmail"], ["t", "Noscall"], ["t", "noscall"], ["r", "https://nostrmail.org/"], ["client", "Amethyst"]], "content": "Tested two new apps today.\n\n#Nmail (https://nostrmail.org) worked great!\nI enjoyed using it! Email through a free protocol!\n\n#Noscall didn't worked that well, relays had connectivity issues. The calling was coming through, connection couldn't be established.\nVery promising for the future! I would love to see this getting better!  ✌✌✌\n\nnostr:nprofile1qqsqfa8xqasyeslcngw0zjxyuyqep273x5u6y4498esfdhqy99g5kwsprpmhxue69uhkg6tjv43hgmmj0yh8jctzw5hx6ef0qy2hwumn8ghj7un9d3shjtnyv9kh2uewd9hj7qg6waehxw309ac8ymmxd9kx2uewdehhxarjxyhxxmmd9ul8szxa ", "sig": "d0ea5a1109f9877fac705459cf420a6eb548eb8f2786ac2d3007502195b2e822daf660c24430270d06a7508f6e60112f21d1f35cc839c8bf7f609e58d4987fc0"},
		name: "Küsnachter",
		npub: "npub1d0fqkvcm6jvaphrtf962qjx9kcmv6vg3wutc9nk4zq7kvye9sevqexc04a",
		nevent: "nevent1qqst25pl88zurrf76qn5sgeflx0k7754av09r09d025ezgqu23kuhcqpp4mhxue69uhkummn9ekx7mqzyp4ayzenr02fn5xuddyhfgzgckmrdnf3z9m30qkw65gr6esnykr9skjlmj8",
		displayText: "Tested two new apps today. #Nmail worked great! I enjoyed using it! Email through a free protocol! …",
		avatar: kusnachter,
	},
	{
		event: {"kind": 1, "id": "179097f4ed0209f33234350c3a4a3b129e870c98ece0141d788ecc3d16a05921", "pubkey": "12440c6494e02dc0864d2ebfbfd15d7693c83989aad971fcad5d4ab3ee814254", "created_at": 1778417944, "tags": [["client", "Primal Web"]], "content": "wtf\nWhy didn't I know about nostrmail.org earlier?\nI want to talk to nostr customer support to file a complaint.\n", "sig": "3b11b35d2d54e318d7366b034803bb4ffa4b7ad052c6ff480df3f494387db6ef05a942156bfcaae3c891c94a9f2d88983e1ae1c624fbc17a9f0c548e06b144d8"},
		name: "Satoshi de cal Knots BIP-110⚡",
		npub: "npub1zfzqcey5uqkuppjd96lml52aw6fuswvf4tvhrl9dt49t8m5pgf2q98ne7k",
		nevent: "nevent1qqsp0yyh7nksyz0nxg6r2rp6fga39858pjvwecq5r4uganpaz6s9jggzyqfygrryjnszmsyxf5htl073t4mf8jpe3x4dju0u44w54vlws9p9g7ruhwx",
		displayText: "wtf\nWhy didn't I know about nostrmail.org earlier?\nI want to talk to nostr customer support to file a complaint.",
		avatar: lmqevp,
	},
	{
		event: {"kind": 1, "id": "237fa9845aeac942780751855810ff5902720e747984691821f28a044dcb17e1", "pubkey": "56e2613abec15c3f9b07ceaaa301eaa6a0af5500546a1715b83be86a20245741", "created_at": 1778523756, "tags": [["e", "0ea7d9af0b220f2279f4b6bf722a056e3ad74903a85c97d58972321923a284e9", "wss://relay.primal.net/", "root", "1e67de3754171071d3cf9b44b6e546bd94fd0a2ca3fb4dbbb1b054685c9116e4"], ["e", "6f21d1f41e61a11713ac774637a144a7f395d4b30b90e6e1363cae6e52f50984", "wss://relay.ditto.pub/", "reply", "21317a0b4045a4ce330c9463ccbd6c63b5df5a67718e05adc1270853b2e47f0e"], ["p", "21317a0b4045a4ce330c9463ccbd6c63b5df5a67718e05adc1270853b2e47f0e"], ["p", "1e67de3754171071d3cf9b44b6e546bd94fd0a2ca3fb4dbbb1b054685c9116e4"], ["client", "Ditto", "31990:781a1527055f74c1f70230f10384609b34548f8ab6a0a6caa74025827f9fdae5:ditto"]], "content": "The point is that there's no single point of failure, no centralized control, and your emails are guaranteed to sit encrypted at rest. Seems pretty cool to me. If it becomes production ready, I could potentially switch from Proton. You're right that using an npub for it is a bad idea though. You could implement it with a username/password too. There might be some multi-hash encryption algo that allows you to have a recovery key to change your password.", "sig": "fbd5abeaca552524a77f7d956719c495766aead0b31e83dbb5ff2c48d7dbab66caa53ad72655c4f5b792cc43459cee3ab841e2194ca73d780313abd3a1c89308"},
		name: "Soda",
		npub: "npub12m3xzw47c9wrlxc8e642xq0256s274gq234pw9dc805x5gpy2aqs3shusv",
		nevent: "nevent1qqszxlafs3dw4j2z0qr4rp2czrl4jqnjpe68nprfrqsl9zsyfh930cgzyptwycf6hmq4c0umql824gcpa2n2pt64qp2x59c4hqa7s63qy3t5z4e5zp0",
		displayText: "The point is that there's no single point of failure, no centralized control, and your emails are guaranteed to sit encrypted at rest. Seems pretty cool to me. If it becomes production ready, I could potentially switch from Proton. …",
		avatar: soda,
	},
	{
		event: {"kind": 1, "id": "81e4044bc59ce6dd758788175be6c39aa7e084f2fc474908cc204ce3a8137bf3", "pubkey": "a16fa4b098712d37d9855c9a9a75c4388d5812b84dc678a1ebc46f48fed4deac", "created_at": 1778456212, "tags": [["e", "0ea7d9af0b220f2279f4b6bf722a056e3ad74903a85c97d58972321923a284e9", "wss://relay.primal.net/v1/zulu-papa-kilo", "mention", "1e67de3754171071d3cf9b44b6e546bd94fd0a2ca3fb4dbbb1b054685c9116e4"], ["client", "Primal Android"]], "content": "Decentralized  'email'.   Great leap towards exiting the system \n\nnostr:nevent1qqsqaf7e4u9jyrez086td0mj9gzkuwkhfyp6shyh6kyhyvseyw3gf6gp9pmhxue69uhhyetvv9ujuurjd9kkzmpwdejhgtmkxyhh5atvw5khqctsvykkk6tvdupzq8n8mcm4g9csw8fulx6ykmj5d0v5l59zeglmfkamrvz5dpwfz9hyqvzqqqqqqy2engw4", "sig": "b64f513653320650a9d87688f6acfca863e785493dc8e9a1cb10f2d7b38b0e488749d6d28df39c40788dbd28ddeb06175ab2a406d35ced61b242663ec42ea4b8"},
		name: "ppatel",
		npub: "npub159h6fvycwykn0kv9tjdf5awy8zx4sy4cfhr83g0tc3h53lk5m6kqr5sjns",
		nevent: "nevent1qqsgreqyf0zeeekawkrcs96mumpe4flqsne0c36fprxzqn8r4qfhhuczyzsklf9snpcj6d7es4wf4xn4csug6kqjhpxuv79pa0zx7j876n02csqf6w5",
		displayText: "Decentralized 'email'. Great leap towards exiting the system.",
		avatar: ppatel,
	},
	{
		event: {"kind": 1, "id": "ac16445af764f81016255ea205cd61d8076f0fd047b1f10303e4b44870b992a4", "pubkey": "c8e5dc3d094ba1b7ddaf24338df3d73b7f291b861ca0229d82622b9deabbc89f", "created_at": 1778621038, "tags": [["e", "0ea7d9af0b220f2279f4b6bf722a056e3ad74903a85c97d58972321923a284e9", "wss://relay.primal.net/v1/zulu-papa-kilo", "root"], ["e", "e9d6c505fde66e0d886f0edf63ef133d34352858919acb1d6ea244ad67e1bf33", "wss://nostr.mom/beacon-yonder-november", "reply"], ["p", "b22b06b051fd5232966a9344a634d956c3dc33a7f5ecdcad9ed11ddc4120a7f2", "", "mention"], ["p", "1e67de3754171071d3cf9b44b6e546bd94fd0a2ca3fb4dbbb1b054685c9116e4", "", "mention"]], "content": "Did it. Only worked once :/ Proton received one email. Gmail zero. Tried again with an image. None. Love the idea though 🫶", "sig": "438b1e27b6a58484b69366d5bee2a312c885d55e7295963738bcc78770ebc5936b82d50e591e5378faf6014dd6928f2e39c766d99d4545df1cac2af0a3cbf312"},
		name: "Niko Nakamoto",
		npub: "npub1erjac0gffwsm0hd0ysecmu7h8dljjxuxrjsz98vzvg4em64mez0sf387m4",
		nevent: "nevent1qqs2c9jyttmkf7qszcj4ags9e4saspm0plgy0v03qvp7fdzgwzue9fqzyrywthpap996rd7a4ujr8r0n6uah72gmscw2qg5asf3zh802h0yf789aznw",
		displayText: "Did it. Only worked once :/ Proton received one email. Gmail zero. Tried again with an image. None. Love the idea though 🫶",
		avatar: niko,
	},
	{
		event: {"kind": 1111, "id": "89e16d8792284d2fd1c8cb10a12c24b6e926431564509e61aea23db45549cca8", "pubkey": "3e4a9d385ff2db9b79dbbf888a9c6b6097bf8852e8263fc183458ac07880df9a", "created_at": 1774868486, "tags": [["A", "32267:b22b06b051fd5232966a9344a634d956c3dc33a7f5ecdcad9ed11ddc4120a7f2:app.nostrmail.client"], ["K", "32267"], ["P", "b22b06b051fd5232966a9344a634d956c3dc33a7f5ecdcad9ed11ddc4120a7f2"], ["a", "32267:b22b06b051fd5232966a9344a634d956c3dc33a7f5ecdcad9ed11ddc4120a7f2:app.nostrmail.client"], ["k", "32267"], ["p", "b22b06b051fd5232966a9344a634d956c3dc33a7f5ecdcad9ed11ddc4120a7f2"], ["v", "0.7.2"]], "content": "This is awesome. One question. Can I send to NIP-05 from legacy email? Should I register NIP05 to uid.ovh somehow or how does this work?", "sig": "1c992c053f2afe2026333db670b0b1f1d14d98c1e1126702ce7d9f91ccc27f1d220bf0d8e88409a07b7dd838a2fd777b86f0f1226d3c98bc6a3fa2694eed74f2"},
		name: "Dadel",
		npub: "npub18e9f6wzl7tdek7wmh7yg48rtvztmlzzjaqnrlsvrgk9vq7yqm7dqfkrtna",
		nevent: "nevent1qqsgnctds7fzsnf068yvky9p9sjtd6fxgv2kg5y7vxh2y0d524yue2qzyqly48fctledhxmemwlc3z5uddsf00ug2t5zv07psdzc4srcsr0e5r2dk0a",
		displayText: "This is awesome. One question. Can I send to NIP-05 from legacy email? Should I register NIP05 to uid.ovh somehow or how does this work?",
		avatar: dadel,
	},
	{
		event: {"kind": 1111, "id": "f2c40d9fb4726800c77fddc78705afd2ae691c7868e8ed3d19bc250af89bdf87", "pubkey": "ea31d98abfebd2966b603b36c66b259c7210dadfbd9c5ab51abecdcd79d66427", "created_at": 1775094893, "tags": [["A", "32267:b22b06b051fd5232966a9344a634d956c3dc33a7f5ecdcad9ed11ddc4120a7f2:app.nostrmail.client"], ["K", "32267"], ["P", "b22b06b051fd5232966a9344a634d956c3dc33a7f5ecdcad9ed11ddc4120a7f2"], ["a", "32267:b22b06b051fd5232966a9344a634d956c3dc33a7f5ecdcad9ed11ddc4120a7f2:app.nostrmail.client"], ["k", "32267"], ["p", "b22b06b051fd5232966a9344a634d956c3dc33a7f5ecdcad9ed11ddc4120a7f2"], ["v", "0.7.2"]], "content": "Great app i love the Simplicity and User control you get in Nmail", "sig": "09100ca158acda43d03f82666dceb1a8b3898b499e92e3d77751b8e47342a647c185a8578c487f2e6572faa93aa1b58c8c1c16745e03bca940b9caa3fca7a8c9"},
		name: "Anonymous Nostr user",
		npub: "npub1agcanz4la0ffv6mq8vmvv6e9n3eppkklhkw94dg6hmxu67wkvsns50eywu",
		nevent: "nevent1qqs093qdn768y6qqcalam3u8qkha9tnfr3ux368d85vmcfg2lzdalpczyr4rrkv2hl4a99ntvqand3ntykw8yyx6m77eck44r2lvmnte6ejzwm6fy36",
		displayText: "Great app i love the Simplicity and User control you get in Nmail.",
	}
];
