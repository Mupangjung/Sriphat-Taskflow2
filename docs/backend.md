# Backend architecture

## Storage

Prisma 6.19 is pinned together with its client for stable SQLite migrations. SQLite uses normalized clinical tables: Disease, DiseaseTerm, DiseaseCode, DiseaseConsideration, AssessmentFilter, FocusDiagnosis, DiseaseFocus, FocusAssessmentFilter, FocusContentItem, FocusDifferential, FocusEducationalExample, FocusCompareSummary, FocusIcnpNote, FocusReference, FocusNicIntervention, FocusNocOutcome and NocIndicator. CodeSystemReference, AbbreviationGroup/Option and UnverifiedCode cover search metadata. `schema.prisma` defines every column, FK, unique key and index. Migration SQL additionally enforces enum/check constraints.

Clinical records are archived rather than deleted during content maintenance. Shared NANDA codes are not unique Focus identifiers. DiseaseFocus owns expert order; FocusFavorite uses its composite FK to enforce disease context. Disease and Focus dates are nullable for unreviewed document material. Seed uses transactions and validates source references before writing; it never replaces the database or accounts.

## Authentication

Access JWTs use HS256 with a fixed issuer/audience and 15-minute lifetime. Every authenticated request checks the referenced session and current account state/role. Access tokens are held in browser memory. Refresh tokens are random 48-byte values; only SHA-256 hashes are stored. Refresh rotates in a transaction; reuse revokes the entire family. Logout, password changes and account deactivation revoke sessions. Passwords use bcrypt cost 12 and reject inputs over 72 UTF-8 bytes.

Refresh cookies are HttpOnly, SameSite=Lax and Secure in production. Cookie-authenticated mutations require the configured Origin. Bearer-protected routes derive user identity from the JWT, not request payloads. No public signup or hard-coded admin credentials are provided. Login errors do not disclose account existence. Rate limits protect login, API and event ingestion.

## APIs and state

Routers delegate content assembly and persistence to services in `server/src`. Zod validates inputs. Errors have `{error:{code,message,requestId}}`; responses have `{data}` plus pagination metadata where relevant. JSON payloads are capped at 64 KB. Prisma handles parameterization; the only raw SQL statements are fixed startup pragmas and health checks.

ContentProvider caches one database snapshot. It blocks clinical rendering until loaded and offers retry. Dedicated APIs handle search/suggestions, filtered Focus lists, Focus details and comparison. Account favorites are loaded separately and cleared on account transitions; mutations update the display only after the server succeeds. Guest favorites stay local until the user explicitly imports them. Import is additive/idempotent and rejects invalid targets as a whole.

## Statistics

Search events are recorded after debounced results, not per keystroke. Suggestions themselves do not count. Disease popularity means clicks from search results, Focus popularity means detail opens, comparison means a validated pair was displayed, and copy success is emitted only after Clipboard API success. A caller-generated UUID makes event retries idempotent. Server timestamps define aggregation windows. `from` is inclusive and `to` exclusive, both interpreted at midnight Asia/Bangkok when supplied as dates; defaults cover the preceding 30 days.

Only exact existing catalog terms can be retained as search labels. Other text is not persisted or logged. Event target IDs are validated. No patient, clipboard, token or password content is stored in events. Client events remain best-effort and can be lost or fabricated; they are not an audit or quality-of-care measure. The mock analytics totals are not seeded. The governance checklist is seeded separately.

## Testing and operations

Vitest/Supertest create a new temporary SQLite database and apply real migrations. Tests cover repeatable seed, database constraints, search/filters, comparison validation, auth expiry/rotation/reuse/logout, account isolation, import/clear, roles, bcrypt byte limits, timezone boundaries, event deduplication and query privacy. Tests remove only their own temporary directory.

SQLite requires persistent disk and a single write-serving instance for this MVP. Use online backup and rehearse restoration. Keep refresh/JWT secrets out of frontend environment variables. No deployment or external publishing is performed by repository scripts.
