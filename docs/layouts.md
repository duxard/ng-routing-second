## Container that spans vertically all the available space 1

```
/* You can add global styles to this file, and also import other style files */
html, body {
  //min-height: 100vh;
  height: 100vh;
  margin: 0;
}

----------------------------------
:host {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background: green;
}

.content {
  flex-grow: 1;
  overflow-y: auto;
}

<div class="header">Header</div>
<div class="content"></div>

```

## Container that spans vertically all the available space 2
```
:host {
  display: flex;
  flex-direction: column;

  border: 1px solid green;
  // height: 100%;
  box-sizing: border-box;
}

.header {
  background: cadetblue;
}

.body {
  background: #f59d34;
  flex: 1 1 auto; // === flex-grow: 1
  overflow: auto;
}

<div class="header">Panel title</div>
<div class="body">
  <ng-content></ng-content>
</div>

```
