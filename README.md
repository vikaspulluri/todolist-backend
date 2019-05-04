# [Realtime Todolists Application](http://todolists.meanpro.com/) by [Meanpro](http://www.meanpro.com/)

## Problem Statement

This project is aimed to create a ready to deploy Live TODO List management system. 
It must have all the features mentioned below and it must be deployed on a server before submission. 
There should be two separate parts of the application. A Frontend developed and deployed using the technologies mentioned below
and a REST API (with realtime functionalities) created using the technologies mentioned below.

### Features
  #### User Management
    * Sign In user
    * Register User
    * Recovery Forgot Password
  #### Todolists Management (Single User)
    * Once user logs into the system, he should see an option to create a ToDo List
    * User should be able to create, a new empty list, by clicking on a create button
    * User should be able to add, delete and edit items to the list
    * User should also be able to add sub-todo-items, as child of any item node. Such that, complete list should take a tree shape,
      with items and their child items.
    * User should be able to mark an item as "done" or "open".
    * User should be able to see his old ToDo Lists, once logged in.

  #### Friends Management
    * User should also be able to send friend requests, to the users on the system. Once requests are accepted, the friend should
      be added in user's friend list. Friends should be Notified, in real time using notifications.
    * User can see all his friends in screen with online/offline status
    
  #### Todolists Management (Multi User)
    * Friends should be able to edit, delete, update the list of the user.
    * On every action, all friends should be notified, in real time, of what specific change is done by which friend. 
      Also the list should be in sync with all friends, at any time, i.e. all actions should be reflected in real time.
    * Any friend should be able to undo, any number of actions, done in past. Each undo action, should remove the last change, 
      done by any user. So, history of all actions should be persisted in database, so as, not to lose actions done in past.
    * Undo action should happen by a button on screen, as well as, through keyboard commands, which are "ctrl+z" for windows 
      and "cmd+z" for mac.
    
  #### Notification Management
    * User can see realtime updates regarding the todolist
    
  #### Error Handling
    * You have to handle each major error response (like 404 or 500) with a different page. Also, all kind of errors, 
      exceptions and messages should be handled properly on frontend. The user should be aware all the time on frontend about
      what is happening in the system.
    
## Solution
  ### http://todolists.meanpro.com/
  REST API Documentation: https://vikaspulluri.github.io/todolist-backend/  
  Events Documentation: https://vikaspulluri.github.io/todolist-frontend/
