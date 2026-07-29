A date / datetime / time field that matches `Input`.

```jsx
<Field label="Deadline" hint="Predictions close at this time.">
  <DateField type="datetime-local" value={deadline} onChange={…} />
</Field>
```

`type` accepts `date` (default), `datetime-local`, `time`, `month`, `week`.

**Why native, not a calendar popover.** The platform gives locale-aware
formatting, keyboard navigation, screen-reader semantics and the OS picker
on mobile — all of it correct, for free. A hand-rolled calendar has to
re-earn each of those and usually gets at least one wrong. The thing
actually missing was consistent styling: an unstyled date input renders
shorter and squarer than the fields beside it, which is what makes a form
look unfinished.

**When this is the wrong component:** a date *range* with presets ("last
7 days"). That needs a real calendar surface and deserves a proper
dependency — see the operator console's range picker — not a thin
reimplementation here.
