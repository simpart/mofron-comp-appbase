# mofron-comp-appbase
this is application base component for mofron.<br>
please see [here](https://github.com/mofron/mofron) about an overview of mofron

# Install

```bash
npm install mofron-comp-appbase
```

# Quick Start

```javascript
require('mofron');
let App = require('mofron-comp-appbase');
new App({
    title : 'Test App Title',
    visible : true
});
```

# Class Specification
| Method          | Parameter                                                                    |    Description                  |
|:------------------|:-----------------------------------------------------------------|:-------------------------------|
| title | string,<br>text component     |application title.<br> this parameter is displayed in the page header. |
| header | header component | replace header component.<br>default header component is [mofron-comp-apphdr](https://github.com/simpart/mofron-comp-apphdr).|
| color | color object | color setter/getter.<br> it change header color if you called this as setter.<br>you must not specify any parameter if you call this as getter.  |
