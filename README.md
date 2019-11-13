#[frontend-assignment](https://bitbucket.org/tamtam-nl/dtnl-dept-frontend-setup-assignment/)

------

# Table of Contents
1.  [Intro](#markdown-header-intro)
2.  [Install](#markdown-header-install)
2.  [Assignment](#markdown-header-assignment)
------

![Design](https://bitbucket.org/tamtam-nl/dtnl-dept-frontend-setup-assignment/raw/ff16604566f5e61c555e1ea0d91fa1c35ddf0585/_design/2-form.png)

# Intro #
Welcome to the readme of the Dept Frontend Setup Assignment.

This is a basic setup for creating (static) html templates.
Filled with automated tasks and configuration options.
It enables you to quickly & easily setup your project and get it running in no time.
Many things are already predefined, added and sorted out for you to take away some hassle.
The pro users can dive into settings an tasks, but that's not required to work with it.



# Install #
Use the setup following these commands.

**When using nvm make sure this is not installed through brew, because this can result in errors when running npm scripts.**

__1. Install all the npm modules__

`npm install`

__2. Start the project__

`npm run gulp` or  `npm run start`

# Assignment #
When you have the project running you will see a homepage with a video and a header.

We like you to extend this basic page with a new feature: a newsletter subscribe form!
The feature has the following requirements:

1. The newsletter form can to be opened by clicking on the 'Subscribe to newsletter'-button in the hero
2. The newsletter form will be displayed inside a modal component overlaying the page.
3. The newsletter form is a modular component (because we want to easily reuse the form on another page)
4. The video has to stop playing when you open the modal 
5. The video has to continue playing again when you close the modal
6. The newletter form should have form validation:
    - all fields are required
    - email validation
    - inputs show visual indication of validated state
7. On submit the form should make an api call (can be to a fake endpoint)
8. If the API response has an error it should show an error message 
9. If the API response was successful the modal should be closed and a success toast should be shown to the user saying: `Bedankt voor uw aanmelding!🎉`
10. The toast should be a reusable component (we want to be able to use it anywhere we have success or error messages)
11. Everything should be responsive

![Gif of flow](https://media.giphy.com/media/ehPAyJ9h7OeXxbO0q6/giphy.gif)


# Design (Screencast) #

- [Screencast of finished assignment: Happy flow](https://bitbucket.org/tamtam-nl/dtnl-dept-frontend-setup-assignment/raw/ff16604566f5e61c555e1ea0d91fa1c35ddf0585/_design/newsletter-form-success-final.mov)
- [Screencast of finished assignment: Error flow](https://bitbucket.org/tamtam-nl/dtnl-dept-frontend-setup-assignment/raw/ff16604566f5e61c555e1ea0d91fa1c35ddf0585/_design/newsletter-form-error-final.mov)
------
