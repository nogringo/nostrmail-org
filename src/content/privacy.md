# Nmail Privacy Policy

Last updated: October 8, 2026

This policy explains how your information is handled when you use:

- the Nmail app, in all its versions: App Store, Google Play, ZapStore, the web app at [app.nostrmail.org](https://app.nostrmail.org), and the Android and desktop packages published on GitHub;
- the servers Nmail operates and that the app uses by default;
- this website, nostrmail.org.

**Controller:** Luc Torres

**Privacy contact:** [privacy@nmail.li](mailto:privacy@nmail.li)

## How Nmail works

Nmail is an email client built on the Nostr protocol. There is no central mailbox: your mail lives on your device and on Nostr relays, which are servers that store and forward signed events. Messages between Nostr users are end-to-end encrypted. To exchange mail with ordinary email addresses, Nmail uses an email bridge.

Nmail runs some of these servers and suggests them by default. Others are run by third parties. You can replace every one of them in the app settings.

## Summary

- We do not sell your data, show ads, or use advertising, analytics, tracking or crash-reporting SDKs.
- Your private key stays on your device, or in your signer app if you use one. It is never sent to us.
- Messages between Nostr users are end-to-end encrypted. Relays see technical metadata, not content.
- Mail exchanged with ordinary email addresses passes through the email bridge in readable form, as all email does.
- Push notifications are optional. For mail from ordinary addresses, they show the sender and the subject.
- You can delete your account from the app.

## Servers operated by Nmail

| Server | Role |
| --- | --- |
| `relay.nmail.li` | Default Nostr relay for your inbox, outbox and messages |
| `private.nmail.li` | Default relay for private, encrypted content such as drafts |
| `blossom.nmail.li` | Default file server for encrypted email bodies and attachments |
| `api.nmail.li` | Push notification service |
| `uid.ovh` | Email bridge between Nostr and ordinary email |
| Scheduling service | Nostr service (DVM) that sends your scheduled emails at the chosen time |

These servers are rented from OVH and located in France.

## Information stored on your device

Nmail keeps data locally so it works offline and loads quickly:

- Your account. Your private key is kept in your system's secure storage: the Keychain on Apple devices, the Android Keystore, the system keyring on Linux, Windows data protection, and your browser's storage for the web app. If you sign in with a signer app or browser extension, Nmail never holds your private key.
- Your mailbox: the messages you sent and received, drafts, read and trash state, scheduled messages and sync state.
- Your address book and cached public profiles of other users (names, avatars, Nostr addresses).
- Your settings: relays, file servers, bridges, theme, language and notification preferences.
- Files you attach, open, save, import or export.

This data stays on your device until you delete it, sign out, delete your account or uninstall the app.

## Information sent through Nostr relays

### What everyone can see

Some Nostr data is public by design:

- your public key and public profile (name, picture, description);
- your relay lists and file server list, which other apps need to reach you;
- anything you choose to publish openly: an email sent in Public mode (not encrypted, readable by anyone), a repost, or a theme you share.

### What only you can read

These are encrypted so that only your key can open them: your address book, your synced settings, your drafts, your private relay list, and the labels that mark mail as read or deleted.

### Your messages

Messages between Nostr users are end-to-end encrypted and wrapped so that relays cannot see the content or the sender. A relay storing a message still sees the recipient's public key, an approximate date, and the size. Relays also see the IP address of every device that connects to them, and relays that require sign-in learn which public key is reading.

Recipients can keep, forward or disclose messages they receive.

### Third-party relays

By default Nmail also uses relays run by others, such as `nos.lol`, `relay.primal.net`, `nostr-01.yakihonne.com`, `purplepag.es`, `user.kindpag.es`, `auth.nostr1.com` and `relay.ditto.pub`. They apply their own policies.

## Email with ordinary addresses

When you write to or receive mail from an ordinary email address, the message goes through an email bridge, `uid.ovh` by default:

- **Sending:** the app encrypts the message for the bridge. The bridge decrypts it and delivers it by standard email, so it sees the sender and recipient addresses, the subject, the content and the attachments.
- **Receiving:** the bridge receives the email in readable form, encrypts it for you, and publishes it to your relays.
- **Your address:** an address like `name@uid.ovh` is linked to your public key (NIP-05). You choose whether anyone can look it up or not. Deleting the address removes the link immediately.

How the `uid.ovh` bridge handles mail:

- Before accepting an incoming email, it checks the sender, the recipients, the subject and the sending server's IP address against the recipient's settings. This check is not stored.
- Incoming mail is kept on disk only until it has been encrypted and published, then deleted. Mail that still cannot be delivered after repeated attempts is kept for manual review.
- Outgoing mail is decrypted and kept until it is delivered or definitively fails, then deleted. The bridge keeps the identifiers of messages it already handled, so it never sends one twice.
- It delivers through its own mail server, `mail.uid.ovh`, directly to the recipient's mail server. No third-party email provider is involved.
- It records each message sent through it (your public key, the message identifier and the date).
- Mail sent to the bridge's service addresses, such as `abuse@` or `postmaster@`, is kept in full until an administrator handles it.

To check that an address can receive email, the app looks up the recipient's domain (MX records) through DNS-over-HTTPS, using Cloudflare by default (`cloudflare-dns.com`). Cloudflare sees the domain and your IP address. You can change this server in the settings.

When you write to an address such as `name@example.com`, the app asks the server of `example.com` for the matching public key. That server sees the name and your IP address.

If you use a bridge run by someone else, its operator's policy applies.

## Attachments and files

Large emails and attachments are encrypted on your device before being uploaded to a Blossom file server (`blossom.nmail.li` by default, plus `blossom.ditto.pub`, `blossom.yakihonne.com` and `blossom.primal.net`). The server stores the encrypted file, its hash and size, and the public key that uploaded it. The decryption key travels only inside the encrypted message.

Public images, such as your profile picture or the background of a theme you share, are uploaded unencrypted.

## Scheduled sending

When you schedule an email, the app hands the already encrypted message to the scheduling service, which publishes it to the recipient's relays at the chosen time. The service stores your public key, the scheduled time, the encrypted message and the target relays. It cannot read the message. These records are currently kept after the email is sent.

## Push notifications

Push notifications are optional. When you turn them on, the app registers with the Nmail push service at `api.nmail.li`, which stores:

- your public key;
- a push token (Firebase Cloud Messaging) or a push endpoint (UnifiedPush);
- your notification language.

What a notification contains depends on where the message comes from:

- **From a Nostr user:** `relay.nmail.li` tells the push service that a new encrypted message arrived for your public key. The notification only says that you have a new message.
- **From an ordinary email address:** the bridge passes the sender's name and address, the subject and the first 160 characters of the text to the push service, so the notification can show who wrote and about what. The push service does not store them.

The push service keeps a record of each notification it sent (your public key, the message identifier and the date).

Delivery depends on your version of the app:

- **Standard builds (App Store, Google Play, the web app, macOS and the standard Android packages):** through Firebase Cloud Messaging, run by Google, and Apple Push Notification service on Apple devices. Google receives the notification's title and text, which for mail from ordinary addresses include the sender and the subject.
- **FOSS build (ZapStore and the FOSS Android packages):** through the UnifiedPush distributor you choose. Google is not involved. When your distributor supports it, the notification is encrypted for your device (RFC 8291) and the distributor cannot read it.
- **Linux and Windows:** no push notifications.

A notification that cannot be delivered within an hour is dropped. Turning notifications off, signing out or deleting your account removes the subscription, and subscriptions that stop working are removed automatically.

## Remote content

Images hosted on other servers can reveal when and where an email is opened. Nmail blocks them by default; if you choose to load them, the sender's servers see your IP address. Profile pictures and theme backgrounds are loaded from the addresses their owners published, and those servers also see your IP address.

## Signing in with a signer

If you sign in with a remote signer (NIP-46), encrypted signing requests travel through Nostr relays (`relay.nmail.li` and `relay.primal.net` by default) to your signer app. With a browser extension (NIP-07) or an Android signer app (NIP-55), signing stays on your device.

## Device permissions

Nmail asks for these only when a feature needs them:

- **Notifications**, to alert you about new mail.
- **Files**, to attach, open, import, export or save files.
- **Face ID, Touch ID, fingerprint or device passcode**, to confirm it is you before copying your sync code. Your system performs the check; Nmail only learns whether it succeeded.

## Differences between versions

- **Update check:** every version except the App Store one asks GitHub (`api.github.com`) for the latest release at launch and every 6 hours. GitHub sees your IP address.
- **Web app:** `app.nostrmail.org` is hosted on Firebase Hosting (Google), which receives the usual connection data. The app downloads its rendering engine and some fonts from Google servers (`gstatic.com`), and keeps your data in your browser's storage.
- **App stores:** Apple, Google and ZapStore process data about your download and use of their store under their own policies. We do not receive it.

## This website

nostrmail.org is hosted on GitHub Pages, which receives your IP address and request details. Its fonts are loaded from Google Fonts, which also receives your IP address. The site sets no cookies and uses no analytics.

## Legal bases

Where the GDPR applies, we rely on:

- **performance of the service you asked for** for relays, the email bridge, file hosting and scheduled sending;
- **your consent** for push notifications and for loading remote images, which you can withdraw at any time in the settings;
- **our legitimate interest** in keeping our servers secure and running, in checking for updates, and in serving this website.

## Transfers outside the European Union

The servers operated by Nmail are in France. Google (Firebase Cloud Messaging, Firebase Hosting, `gstatic.com`, Google Fonts), Cloudflare and GitHub are based in the United States and certified under the EU-U.S. Data Privacy Framework. Third-party relays and file servers may be located anywhere in the world.

## Retention and deletion

- **On your device:** until you delete it, sign out, delete your account or uninstall the app.
- **`relay.nmail.li`:** your events stay until you delete them or delete your account. You can also delete the messages addressed to you. Events with an expiry date are removed when it passes. The identifiers of deleted events are kept so they cannot be published again.
- **`private.nmail.li`:** until you delete them or delete your account.
- **`blossom.nmail.li`:** a file stays until every account that uploaded it deletes it.
- **Push subscription:** while notifications are on, as described above.
- **Records of sent messages and of notifications:** until you delete your account.
- **Your bridge address:** until you delete it.
- **Mail passing through the bridge:** until it is delivered, as described above.
- **Scheduled emails:** kept after sending, as described above.
- **Server logs:** our servers keep no logs.

**Deleting your account.** In Settings, Delete account sends a NIP-62 request to vanish to every relay your account may have used: the default relays, your own relay lists and your messaging relays. It asks them to erase all your events, including the messages addressed to you. On `relay.nmail.li`, this erases them and also deletes your push subscriptions and the records of your sent messages and notifications. The app then erases your local data. Relays run by others apply their own policies.

## Your rights

You can ask us to access, correct, erase, restrict or export your data, object to its processing, or withdraw your consent. Write to [privacy@nmail.li](mailto:privacy@nmail.li) and include your public key (npub), since it is the only way we can find your data.

You can also lodge a complaint with the French data protection authority, the [CNIL](https://www.cnil.fr/en).

## Security

Nmail is designed to keep central data collection to a minimum. Private keys are kept in your system's secure storage, and messages between Nostr users are end-to-end encrypted. No system is perfectly secure: protect access to your device, your backups and your sync code.

## Children

Nmail is not directed to children. We do not knowingly collect personal information from children. If you believe a child has given us personal information, contact us and we will remove it.

## Changes to this policy

When this policy changes, we update the date at the top. Significant changes are announced in the app or in the release notes. Previous versions are available in the [history of this page](https://github.com/nogringo/nostrmail-org/commits/main/src/content/privacy.md).

## Contact

For any privacy question or request: [privacy@nmail.li](mailto:privacy@nmail.li)
