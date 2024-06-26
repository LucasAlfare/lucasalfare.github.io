# lucasalfare.github.io

[Go to the page 🚀](https://lucasalfare.github.io/).

### Structure

We have a basic project built using Vite and React. All the source files are in the directory `root-sources`.

We also defined this repository root as the main dist/build output in the [vite configurations](root-sources/vite.config.ts). This means that, after running build command in the `root-sources` the resulting generated files will be placed in the main root, making possible to have an [index.html](index.html) right there.

By its time, the [index.html](index.html) points to the `assets` folder, that contains the generated main script.