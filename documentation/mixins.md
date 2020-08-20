# Mixins

- [btn](#btn)
- [justify content](mixins/justify-content.md)



* [Variables](#variables)
* [Drop Shadow](#drop-shadow)




#### Variables
Propel comes pre-packaged with a host of SASS variables. They are all listed below.

Variable | Default
---- | ----
`$columnLimit` | 12
`$fontFamily` | 'Open Sans', Helvetica, Arial, sans-serif
`$limitWidth` | 68.750em

##### Breakpoints
Variable | Value | Evaluates To
---- | ---- | ----
`$bpSmall` | 21.875em | 350px
`$bpMedium` | 46.875em | 700px
`$bpLarge` | 68.750em | 1100px

##### Colours
Type | Variables
---- | ----
Mono | `$black` `$blackBase` `$greyX2Light` `$greyXLight` `$greyLight` `$grey` `$greyDark` `$greyXDark` `$greyX2Dark`
Primary | `$aqua` `$blue` `$green` `$orange` `$pink` `$purple` `$red` `$yellow`
Secondary | `$asbestos` `$asphalt` `$bondiBlue` `$cloud` `$concrete` `$greyBlueXLight` `$greyBlueLight` `$greyBlue` `$greyBlueDark` `$greyBlueXDark` `$midnight` `$offWhite` `$offWhiteDark` `$riverBed` `$silver`

##### Spacing
Variable | Value
---- | ----
`$spaceBase` | 24px
`$spaceSmall` | 12px
`$spaceMedium` | 48px
`$spaceLarge` | 72px

##### Text
Variable | Value
---- | ----
`$georgia` | Georgia, Cambria, "Times New Roman", Times, serif
`$helvetica` | "Helvetica Neue", Helvetica, Arial, sans-serif
`$impact` | Impact, Charcoal, sans-serif
`$lato` | 'Lato', sans-serif
`$lucindaGrande` | "Lucida Grande", Tahoma, Verdana, Arial, sans-serif
`$monospace` | Menlo, "Bitstream Vera Sans Mono", "DejaVu Sans Mono", Monaco, Consolas, monospace
`$openSans` | 'Open Sans', Helvetica, Arial, sans-serif
`$roboto` | 'Roboto', 'Helvetic Neue', Helvetica, Arial
`$tahoma` | Tahoma, Geneva, sans-serif
`$timesNewRoman` | "Times New Roman", Times, serif
`$trebuchet` | "Trebuchet MS", Helvetica, sans-serif
`$verdana` | Verdana, Geneva, sans-serif

##### Text Size
The size evaluates to an em value and then down to a pixel value.

Variable | Evaluates To
---- | ----
`$sizeSmall` | 14px
`$sizeBase` | 16px
`$sizeMedium` | 18px
`$sizeLarge` | 24px

##### Text Weight
Variable | Value
---- | ----
`$weightThin` | 100
`$weightLight` | 300
`$weightBase` | 400
`$weightBold` | 700
`$weightHeavy` | 900


#### Drop Shadow
Mixin | Defaults | Description
---- | ---- | ----
`drop-shadow(clr, size, v, h)` | `clr`: `fade-out(#000, 0.6)`<br>`size`: `3px`<br>`v`: `0px`<br>`h`: `0px` | Set the drop shadow of an element.<br>`v` is the vertical offset.<br>`h` is the horizontal offset.
`drop-shadow-inset(clr, size, v, h)` | `clr`: `fade-out(#000, 0.6)`<br>`size`: `3px`<br>`v`: `0px`<br>`h`: `0px` | Set an inset drop shadow of an element.<br>`v` is the vertical offset.<br>`h` is the horizontal offset.
`drop-shadow-none()` | | Remove any drop shadow.

```scss
.my-element {
   @include drop-shadow($green);
}
```