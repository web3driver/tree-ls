
`tree-ls` is a nodejs tool to generate 'tree-like' folder structer, just like what the linux's 'tree' command does. But `tree-ls` has more fantasy functions.

### Installation

``` bash
$ npm install -g tree-ls
```

### Usage

``` bash
$ treels
```

A 'tree-like' folder structer will be published to your trminal.

|Default Ignore Lists|
|:-:|
|/node_modules|
|.DS_Store|

``` bash
.
├── hahha
│   ├── hehe.js
│   └── yeye
│       └── io.js
├── index.js
├── package.json
└── test
    ├── 1
    │   ├── 1.js
    │   ├── 2.js
    │   ├── dsadsa
    │   │   ├── asds.js
    │   │   └── qwewqe.js
    │   ├── fsadas
    │   │   └── 3.js
    │   └── ijiji
    ├── a
    │   ├── aa
    │   │   └── 1.js
    │   └── ab
    │       └── 2.js
    ├── b
    │   ├── ba
    │   │   └── 3.js
    │   └── bb
    │       └── 4.js
    ├── empty
    ├── hahahaha.js
    └── heheh
        └── 4.js
```

### Help

TODO

### License

[MIT](http://opensource.org/licenses/MIT)
