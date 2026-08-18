# Shadcn

Use `shadcn` components where possible.

* https://ui.shadcn.com/docs/components/

---

# Import

To import `shadcn` components...

## Copy code

Use the `Manual` option to copy/pasted into new file.

> Do NOT use the `CLI` method.

## Install dependencies

Update `package.json` with dependencies then run command to install:

```shell
make reppo-database-local-install
```

### Update component file

#### Remove Next.js headers

Remove this line:

```typescript jsx
"use client"
```

#### Update utility imports

Change this:

```typescript jsx
import {cn} from "@lib/utils"
import {useIsMobile} from "@hooks/use-mobile"
```

...to this:

```typescript jsx
import {cn} from "@/src/common/components/shadcn/_/cn.ts"
import {useIsMobile} from "@/src/common/components/shadcn/_/useIsMobile.ts"
```
