# reppo-dashboard

This service host `/dashboard` route for `reppo` monorepo.

---

## Commands

```
make reppo-dashboard-local-secrets
make reppo-dashboard-local-restart
```

---

## General

### Install

To install `node` packages:

* Update `package.json` file.
* Run `make reppo-dashboard-local-install` command.
* Refresh IDE (via `File` -> `Reload All from Disk` on Intellij IDEA).

### Tailwind CSS w/ JetBrains

https://github.com/tailwindlabs/tailwindcss-intellisense?tab=readme-ov-file#tailwindcssclassfunctions

To get IDE support in non-standard fields (ie: NOT `classNames` attribute) you can update settings. Specifically, to go:

* `Settings` > `Languages & Frameworks` > `Style Sheets` > `Tailwind CSS`

Right after `classAttributes` key, add the following, as needed:

```json
{
	"classFunctions": [
		"tw",
		"clsx",
		"cn",
		"cva",
		"tw\\.[a-z-]+"
	]
}
```
