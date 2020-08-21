#Icon mixin


Mixin | Defaults | Description
---|---|---
`icon($width-icon, $height-icon, )` | width: $width-icon;<br>height: $height-icon; <br>background: url("../../img/sprite/png");<br>display: inline-block; | Create icon



```
//scss
.our__element {
   @include icon( )
}
```


```
// css 
.our__element {
   width: 100%;
   height: 100%;
   background: url("../img/sprite/png");
   display: inline-block;
}

```

```
//sass
.our__element {
    @include icon (25px, 26px)
}
```

```
// css 
.our__element {
   width: 25px;
   height: 26px;
   background: url("../img/sprite/png");
   display: inline-block;
}

```