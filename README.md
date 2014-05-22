##IPhone shake undo/redo


I recently ran into this issue while developing a webapp for my employer where it uses the devicemotion event to capture
movement for a web-socket game.

After researching online for a solution I stumble onto this article <http://stackoverflow.com/questions/6520125/how-to-disable-ios-shake-to-undo-in-a-webapp>

##From the Article
- Prevent your input from ever losing focus. This will require you to prevent form submission if the input is part of a form. You must also listen for "touchstart" instead of "click" on any anchors
and prevent the touchstart event from propagating. This will prevent that anchor from gaining focus and your input from losing focus. This approach has some disadvantages for sure.

- Add a "keydown" event handler to the window and prevent the event from propagating. This prevents any values from getting inserted into the input on iOS devices. I also had to create an object
that mapped the keycodes to the proper character. This is the route I ended going because all I needed in my input was a 6 character code so I only needed numbers. If you need more than just numbers this may be a pain in the ass. On key down, snag that character via the keycode and set the value of the input. This tricks iOS into thinking that no value was ever inserted into the input via the keyboard so there is nothing for it to undo.



##How it works

When the directive is applied to the input it will bind 'keydown' to the window.
This will disable all input boxes from this point not to trigger the undo/redo window.  I found that during my game I need to bind the window with 'keydown' before I bind the 'devicemotion' to
capture the axis of the device.

Once I was done capture data from the guest, where they sync their device to my socket server. I would remove the 'keydown' from the window just before the 'devicemotion',
this will allow to restore all the inputs, default events after I'm done capturing data, allowing full access to the keyboard.

This directive has keybind for most of the Iphone keyboard, it has all default keys and their code and identifier. It does not have all special unicode,
it does not support all international keys. Currently workin on capturing all unicode for internation keys.