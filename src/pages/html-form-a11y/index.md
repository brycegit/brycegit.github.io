---
title: 5 ways to make HTML forms more accessible
date: "2020-03-21T20:38:35.388Z"
---

In this post I'll outline 5 easy ways to make HTML forms more accessible for visually impaired users and those using assistive technologies.

## Make inputs focusable by clicking its label

Labels and inputs can be linked, so that when a user clicks the label the input will become focused; which helps visually impaired users navigate a form.


```html
<!-- This is the best approach: -->
<label for="someinput">A label</label>
<input id="someinput" />

<!-- This is good, but it may cause the label 
text to be repeated twice by screen readers -->
<label>
  A label
  <input />
</label>

<!-- This is not so good. The label is announced 
by the screen reader but the input is not focusable 
by clicking the label  -->
<label>A label</label>
<input aria-label="A label" />
```

## Label a group of fields with fieldset and legend

To make it clear when several inputs belong to a certain category, use the `<fieldset>` and `<legend>` elements. 

This is especially important when a label does not include the group name, like in the example below.

Different screen readers treat `<legend>` text differently, but most will announce the text along with other details about the input.

```html
<fieldset>
  <legend>Clothes Colors</legend>
  <label for='shirtcolor'>
    Shirt:
  </label>
  <input id="shirtcolor" />
  <label for='pantscolor'>
    Pants:
  </label>
  <input id="pantscolor" />
</fieldset>
```

## Mark fields as required

To make it obvious for screen reader users that a field is required, use the `aria-required` attribute or the `required` attribute. Both are announced by the screen reader, but `required` can actually prevent the form from submitting and display an error message.

In addition, `aria-hidden="true"` can be used to hide an asterisk from a screen reader. Asterisks are helpful cues for someone looking at a webpage, but aren't as helpful when browsing via screen reader.

```html
<label for="requiredinput">
  A label<span aria-hidden="true">*</span>
</label>
<input aria-required="true" id="requiredinput" />
```

## Announce errors as they happen

By adding `role="alert"` to the area where input errors will appear, they will be announced to the user as they are dynamically appended to the element.

In this example, we'd use JavaScript to append an error message to the `<p>` when an error occurs.

Also using `aria-describedby` ensures the user is told about the error each time they navigate to the input.


```html
<label for="firstname">First Name</label>
<input aria-describedby="firstname_error" id="firstname" />
<p id="firstname_error" role="alert"></p>
```

## Make errors apparent after unsuccessful submit

If a user submits a form unsuccessfully due to errors, they should be brought to the top of the form and all errors should be listed.

It can be very helpful if each error also links to the input field for easy navigation.

In addition, adding `aria-invalid="true"` is a helpful cue to the user that action is needed.

```html
<p id="firstname_error">
  <a href="#firstname">An error</a>
</p>
<form>
  <label for="firstname">First Name 
    <span class="required" aria-hidden="true">*</span>
  </label>
  <input required aria-describedby="firstname_error" aria-invalid="true" id="firstname" />
  <button>Submit</button>
</form>
```

That's it! If you have other form accessibility tips let me know!