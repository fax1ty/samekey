![head](./header.png)

# Samekey

## Why I did this?
I needed a simple application that could synchronize the keyboards of several devices remotely.

## How to use this one?
Just open the [app](https://github.com/fax1ty/samekey/releases) on multiple devices on the same Wi-Fi network. Start typing on any device

## What this app can
* Automatically synchronize keyboard clicks over the air. Relays on [iohook](https://github.com/wilix-team/iohook) and [robotjs](https://github.com/octalmage/robotjs)
> If a specific key does not sync, check the [list of application keys](./src/keys.ts) and the [supported robotjs keys](https://github.com/octalmage/robotjs/blob/master/src/robotjs.cc#L289)

## What this app can't do (yet)
* Text in different languages
> I wrote this program at night for a couple of hours in my native language, did you really think that I would want to do internalization?
* Synchronize mouse events
> Please open the issue if you really need it. It is very simple to implement this function and in fact the code base already has everything necessary for implementation
* Work with mobile devices
> As soon as I have a free minute and inspiration again, I will definitely write a mobile client
* Save the environment from pollution 🏭 (`#wont-fix`)

## How can you help
* Thoroughly test the application. Most likely, there are a lot of bugs here 🐛
* [Create a pull request](https://github.com/fax1ty/samekey/pulls) with your own language. I will definitely add it to the application
* [Create an issue](https://github.com/fax1ty/samekey/issues) with any feature request