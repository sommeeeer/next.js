# Items

Count: 4

## Item 1: Stmt 0, `ImportOfModule`

```js
export { cat as fakeCat } from "./lib";

```

- Hoisted
- Side effects

## Item 2: Stmt 0, `ImportBinding(0)`

```js
export { cat as fakeCat } from "./lib";

```

- Hoisted
- Declares: `cat`

# Phase 1
```mermaid
graph TD
    Item1;
    Item2;
    Item3;
    Item3["ModuleEvaluation"];
    Item4;
    Item4["export fakeCat"];
```
# Phase 2
```mermaid
graph TD
    Item1;
    Item2;
    Item3;
    Item3["ModuleEvaluation"];
    Item4;
    Item4["export fakeCat"];
    Item4 --> Item2;
```
# Phase 3
```mermaid
graph TD
    Item1;
    Item2;
    Item3;
    Item3["ModuleEvaluation"];
    Item4;
    Item4["export fakeCat"];
    Item4 --> Item2;
```
# Phase 4
```mermaid
graph TD
    Item1;
    Item2;
    Item3;
    Item3["ModuleEvaluation"];
    Item4;
    Item4["export fakeCat"];
    Item4 --> Item2;
    Item3 --> Item1;
```
# Final
```mermaid
graph TD
    N0["Items: [ItemId(0, ImportOfModule)]"];
    N1["Items: [ItemId(ModuleEvaluation)]"];
    N2["Items: [ItemId(0, ImportBinding(0))]"];
    N3["Items: [ItemId(Export((&quot;cat&quot;, #0), &quot;fakeCat&quot;))]"];
    N3 --> N2;
    N1 --> N0;
```
# Entrypoints

```
{
    ModuleEvaluation: 1,
    Export(
        "fakeCat",
    ): 3,
    Exports: 4,
}
```


# Modules (dev)
## Part 0
```js
import "./lib";

```
## Part 1
```js
import "__TURBOPACK_PART__" assert {
    __turbopack_part__: 0
};

```
## Part 2
```js
import { cat as cat } from "./lib";
export { cat as a } from "__TURBOPACK_VAR__" assert {
    __turbopack_var__: true
};

```
## Part 3
```js
import "__TURBOPACK_PART__" assert {
    __turbopack_part__: 2
};
import { a as cat } from "__TURBOPACK_PART__" assert {
    __turbopack_part__: 2
};
export { cat as fakeCat };

```
## Part 4
```js
export { cat as fakeCat } from "__TURBOPACK_PART__" assert {
    __turbopack_part__: "export fakeCat"
};

```
## Merged (module eval)
```js
import "__TURBOPACK_PART__" assert {
    __turbopack_part__: 0
};

```
# Entrypoints

```
{
    ModuleEvaluation: 1,
    Export(
        "fakeCat",
    ): 3,
    Exports: 4,
}
```


# Modules (prod)
## Part 0
```js
import "./lib";

```
## Part 1
```js
import "__TURBOPACK_PART__" assert {
    __turbopack_part__: 0
};

```
## Part 2
```js
import { cat as cat } from "./lib";
export { cat as a } from "__TURBOPACK_VAR__" assert {
    __turbopack_var__: true
};

```
## Part 3
```js
import "__TURBOPACK_PART__" assert {
    __turbopack_part__: 2
};
import { a as cat } from "__TURBOPACK_PART__" assert {
    __turbopack_part__: 2
};
export { cat as fakeCat };

```
## Part 4
```js
export { cat as fakeCat } from "__TURBOPACK_PART__" assert {
    __turbopack_part__: "export fakeCat"
};

```
## Merged (module eval)
```js
import "__TURBOPACK_PART__" assert {
    __turbopack_part__: 0
};

```
