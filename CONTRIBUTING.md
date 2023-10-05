# How to develop

## Setup

### Nix

1. Install [Nix](https://nixos.org/) package manager
2. Run `nix develop` or `direnv allow`
3. You can use development tasks

```console
> nix develop
(prepared shell)
```

### Tasks

```console
> makers check
[cargo-make] INFO - Build Done in 2.14 seconds.
```

See also [scripts](package.json) and [Makefile](Makefile.toml) for tasks details.

## REPL

```typescript
> npm run repl

> my-new-action@1.0.0 repl
> tsx

Welcome to Node.js v20.8.0.
Type ".help" for more information.

>
> const { info, isDebug, debug } = await import('@actions/core');
undefined
> isDebug()
false
> const { wait } = await import('./src/wait.ts');
undefined
Uncaught SyntaxError: Unexpected identifier 'wait'
> await wait(42)
'done!'
```
