# Heading

Use the `<Heading />` component to use HTML heading h1-h6 element, with all the
`<Text>` props.

Heading with default `h3` element and style

```jsx
<Heading>Hello</Heading>
```

Heading with `h1` element

```jsx
<Heading.h1>Hello</Heading.h1>
```

Heading with `<Text>` props

```jsx
<Heading.h5 m={3} bold>
  Hello
</Heading.h5>
```

| Prop     | Type             | Description                                           |
| -------- | ---------------- | ----------------------------------------------------- |
| fontSize | number or string | Sets heading font size based on the typographic scale |

By default, the `<Heading />` component renders a `<h3>` element with default
font size 24px. To use h1-h6 element, use the following:

```jsx
<>
  <Heading.h1>This is a h1 element</Heading.h1>
  <Heading.h2>This is a h2 element</Heading.h2>
  <Heading.h3>This is a h3 element</Heading.h3>
  <Heading.h4>This is a h4 element</Heading.h4>
  <Heading.h5>This is a h5 element</Heading.h5>
  <Heading.h6>This is a h6 element</Heading.h6>
</>
```

All the `<Text>` component props are supported. For example:

```jsx
<Heading.h2 color="neonRed">Neon Red</Heading.h2>
```
