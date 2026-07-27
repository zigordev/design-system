Brand mark used as `Sidebar`'s `brand` slot and standalone in `Topbar`/login screens. No product here ships a real logo asset — pass either `initials` (a letter or pair) or an arbitrary `mark` icon node; never fabricate new artwork. `tagline` only renders at `size="lg"`.

```jsx
<Logo initials="GP" wordmark="GPool" tagline="Football pools, with friends" size="lg" href="/" />
<Logo mark={<LineChart size={16} />} wordmark="Trading Bot" shape="square" href="/" />
```
