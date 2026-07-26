Segmented pill navigation for switching between views within a page (not for primary app navigation — use Sidebar for that).

```jsx
<Tabs
  tabs={[{ value: 'overview', label: 'Overview' }, { value: 'players', label: 'Players' }]}
  value={activeTab}
  onChange={setActiveTab}
/>
```
