# mofron-comp-appbase
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

common application component for mofron

it makes easy to build page.


# Install
```
npm install mofron mofron-comp-appbase
```

# Sample
```html
<setting>
    <tag module="mofron-comp-image">Image</tag>
    <tag module="mofron-comp-appbase">AppBase</tag>
</setting>

<AppBase title=AppBase,"./img/logo.png">
    <background>
        <Image>./img/mofron.png</Image>
    </background>
</AppBase>
```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| ◯  | title | mixed | string/mofron-comp-text: app title |
| | | mixed | string: path to app logo image |
| | | | mofron-comp-image: logo image |
| | header | mofron-comp-header | header component |
| | background | component | background component |
| | height | string (size) | height size |
| | | dict | style option |
| | mainColor | mixed (color) | string: color name, #hex |
| | | | array: [red, green, blue, alpha] |
| | | option | style option |

