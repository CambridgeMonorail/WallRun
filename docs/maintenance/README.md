# Maintenance

Documentation for maintaining, upgrading, and securing WallRun codebase over time.

This section should contain active maintenance guidance and durable records. Time-bound status snapshots belong in `docs/maintenance/archive/`.

## Documents in this Section

### [Modernization](./modernization.md)

Strategies and guidelines for keeping the project modern, including dependency updates, framework migrations, and adopting new best practices.

**Key Topics**: Dependency management, framework updates, modernization strategies, technical debt

---

### [Upgrade Notes](./UPGRADE_NOTES.md)

Detailed notes on major version upgrades, breaking changes, and migration guides. Chronicles the project's evolution and provides upgrade paths.

**Key Topics**: Version migrations, breaking changes, upgrade procedures, compatibility notes

---

### [Security Audit](./SECURITY_AUDIT.md)

Security audit findings, vulnerability tracking, and remediation plans. Documents security considerations and hardening recommendations.

**Key Topics**: Vulnerability assessment, security best practices, dependency security, remediation

Note: refresh this document before using it for current release decisions.

---

### [Maintenance Archive](./archive/README.md)

Historical maintenance records that no longer reflect the current branch state or operational status.

**Key Topics**: Historical branch tracking, past maintenance audits, archived coordination notes

---

## Maintenance Schedule

- **Weekly**: Dependabot PR review
- **Monthly**: Dependency audit with `pnpm audit`
- **Quarterly**: Major version upgrade consideration
- **As Needed**: Security vulnerability response

## Related Documentation

- **[Tooling](../tooling/)** - Automation tools for maintenance
- **[Contributing](../contributing/)** - Contribution process for maintenance PRs

---

[← Back to Documentation Index](../README.md)
