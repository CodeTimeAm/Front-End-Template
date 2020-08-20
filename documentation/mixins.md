# Mixins

- [btn](#btn)






#### **btn**

Mixin | Defaults | Description
---- | ---- | ----
`btn(background-color, border-radius, color, padding , line-height)` | `background-color`: #fff <br>`$border-radius`: `0`<br>`color`: `#000`<br>`font-size`: `16px`<br>`padding`: `0`<br>`line-height`: `18` | Create button  <br> <br>Also if font-size: write other property and <br>line-height leave defaults then<br> line-height will be +2px of font-size: size


```scss
.my-element {
   @include btn();
}
```

