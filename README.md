![head](./header.png)

# Samekey

## Why I did this?
I needed a simple application that could synchronize the keyboards of several devices remotely.

## How to use this one?
Just open the [app](./releases) on multiple devices on the same Wi-Fi network. Start typing on any device

## What this app can't do (yet)
* Text in different languages
> I wrote this program at night for a couple of hours in my native language, did you really think that I would want to do internalization?
* Synchronize mouse events
> Please open the issue if you really need it. It is very simple to implement this function and in fact the code base already has everything necessary for implementation
* Handle events in the background (you need to keep the app open)
* Save the environment from pollution 🏭 (`#wont-fix`)

## How can you help
* Give any advice on building this application together with [iohook](https://github.com/wilix-team/iohook) / Suggest another native keyboard click handler
* Thoroughly test the application. Most likely, there are a lot of bugs here 🐛
* [Create a pull request](./pulls) with your own language. I will definitely add it to the application
* [Create an issue](./issues) with any feature request