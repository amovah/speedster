# Speedster

A graphical UI for aria2, powered by Electron, React, Ant Design.

# How to use?

You can download from [release](https://github.com/amovah/speedster/releases) page. for now I only publish for linux.

# Build from source

first, you need install dependencies:
```bash
yarn install
```

then you need to only need to command to run the speedster:
```bash
yarn prod; yarn prod:start
```

if you wanna create executable file for linux:
```bash
yarn build:linux64
# if you are using 32 bit
yarn build:linux32
```

then if you wanna build a deb file:

```bash
yarn deb:64
# 32 bit systems
yarn deb:32
```

# Thanks giving

* appreciate [Mahdi Najafi](https://github.com/Mtt6300) for his idea.
* appreciate [Sogol Zargar](google.com) for creating a beautiful icon for the application.

# license
MIT
