#   mofron-comp-appbase
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

 common application component for mofron

 it makes easy to build page.


# Install
```
npm install mofron mofron-comp-appbase
```

# Sample
```html
<require>
    <tag module="mofron-comp-image">Image</tag>
    <tag module="mofron-comp-appbase">AppBase</tag>
</require>

<AppBase mainColor=#f0e6fa title=mofron>
    <background>
        <Image>./img/mofron.png</Image>
    </background>
</AppBase>
```
# Parameter

|Simple<br>Param | Parameter Name | Type | Description |
|:--------------:|:---------------|:-----|:------------|
|◯ | title | string/Text | app title |
| | | string/Image | string: path to app logo image |
| | | | Image: logo image |
| | header | Header | header component |
| | background | Component | background component |
| | height | string | height size |
| | mainColor | string/Array | string: color,#hex |
| | | | Array: r,g,b |
| | baseColor | string/Array | string: color,#hex |
| | | | Array: r,g,b |

