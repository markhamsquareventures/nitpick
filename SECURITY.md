# Security Policy

Nitpick can reset the database and log in as any user. It works only when `APP_ENV=local` and the
request host is the `APP_URL` host. The README describes this gate in its Security section.

## Report a vulnerability

Do not open a public issue for a security problem. Send an email to hello@markhamsq.com, or use a
[private vulnerability report](https://github.com/markhamsquareventures/nitpick/security/advisories/new)
on GitHub. Include the steps to reproduce the problem and the package version.
