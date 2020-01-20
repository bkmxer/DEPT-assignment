# [frontend-assignment](https://bitbucket.org/tamtam-nl/dtnl-dept-frontend-setup-assignment/)

------

# Table of Contents
1.  [Intro](#markdown-header-intro)
2.  [Install](#markdown-header-install)
3.  [Assignment](#markdown-header-assignment)
4.  [Design](#markdown-header-design)
5.  [Screencast](#markdown-header-screencast)
------

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
_We have formulated an assignment to test your technical knowledge. The assignment is specifically made to see how you would integrate a new feature into an existing setup. This means you do not need to setup the project from scratch and it already consists of a builder (if you feel like improving it - add webpack for example - we encourage that of course)._

You have 8 to 16 hours to complete the assignment. If no completion date has been agreed on with you, try to complete the assignment within a week. Put your code on a __public git repository__ and send us the link to your repository where we can find both the source code and the compiled version. That means __no ZIP files__. And please make sure that we can run the code on our computers by including a readme.

__Let's get started!__

When you have the project running you will see a homepage with a video and a header.

We like you to extend this basic page with a new feature: a newsletter subscribe form!
The feature has the following requirements:

1. The newsletter form can to be opened by clicking on the 'Subscribe to newsletter'-button in the hero
2. The newsletter form will be displayed inside a modal component overlaying the page.
3. The newsletter form is a reusable component (because we want to easily reuse the form on another page)
4. The video has to stop playing when you open the modal 
5. The video has to continue playing again when you close the modal
6. The newsletter form should have form validation: (preferably create a reusable form validation mechanism)
    - all fields are required
    - email validation
    - input fields show visual indication of validated state (success/error/neutral)
7. On submit the form should make an API call (can be to a fake endpoint)
8. If the API response returns an error it should show an error message 
9. If the API response was successful the modal should be closed and a success toast should be shown to the user saying: `Bedankt voor uw aanmelding!🎉`
10. The toast should be a reusable component (we want to be able to use it anywhere we have success, warning or error messages)
11. Everything should be responsive
12. Preferably everything is accessible aswell
13. BONUS: Make it look nicer with animations, transitions or your own design 🎨
14. BONUS: Add some sort of state management, or a mechanism for translations; you choose what you think will be an added value! 🛠
15. BONUS: Create a 100% Progressive Web App (check it with lighthouse)

![Gif of flow](https://media.giphy.com/media/ehPAyJ9h7OeXxbO0q6/giphy.gif)


# Design #

![Design-1](https://bitbucket.org/tamtam-nl/dtnl-dept-frontend-setup-assignment/raw/ff16604566f5e61c555e1ea0d91fa1c35ddf0585/_design/1-modal-open.png)

![Design-2](https://bitbucket.org/tamtam-nl/dtnl-dept-frontend-setup-assignment/raw/ff16604566f5e61c555e1ea0d91fa1c35ddf0585/_design/2-form.png)

![Design-3](https://bitbucket.org/tamtam-nl/dtnl-dept-frontend-setup-assignment/raw/ff16604566f5e61c555e1ea0d91fa1c35ddf0585/_design/3-error-message.png)

![Design-4](https://bitbucket.org/tamtam-nl/dtnl-dept-frontend-setup-assignment/raw/ff16604566f5e61c555e1ea0d91fa1c35ddf0585/_design/4-success-toast.png)


# Screencast #
- [Screencast of finished assignment: Happy flow](https://bitbucket.org/tamtam-nl/dtnl-dept-frontend-setup-assignment/raw/ff16604566f5e61c555e1ea0d91fa1c35ddf0585/_design/newsletter-form-success-final.mov)
- [Screencast of finished assignment: Error flow](https://bitbucket.org/tamtam-nl/dtnl-dept-frontend-setup-assignment/raw/ff16604566f5e61c555e1ea0d91fa1c35ddf0585/_design/newsletter-form-error-final.mov)
------
