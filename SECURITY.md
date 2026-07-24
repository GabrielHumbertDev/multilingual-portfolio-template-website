# Security and Publication Policy

## Never commit

- Passwords, one-time codes, API tokens, or deployment credentials
- `.env.local` or Studio environment files
- Cloudflare or hosting validation credentials copied from another project
- Private CV variants or identity documents
- Internal employer documents, screenshots, employee data, or payroll data
- Private certificate identifiers
- Browser profiles, cookies, login exports, or terminal authentication logs

## Dataset rule

The default Sanity integration uses a public dataset so the public website can
read content without a secret token. Treat every published document and asset
as internet-visible.

Studio access remains authenticated, but that does not make published dataset
content private.

## Reporting

If you discover a vulnerability in your own deployment:

1. Remove exposed secrets from the active service.
2. Rotate the affected credential.
3. Remove the value from repository history if it was committed.
4. Redeploy.
5. Document the cause and prevention.

Do not open a public issue containing an active secret or personal data.
