# To-Do List Application
This is a simple to-do list application that allows a user to perform various actions like adding a new entry and updating existing entries. The application supports the following features:

# Timestamp created: Timestamp at which a task was created. Should be auto set when creating a new entry. A user should not be able to edit this.

# Title: Title of the task to be done.

A user can set this while creating a new entry. A user can also change this updating an existing entry.
Max length: 100 characters.
Mandatory field
Description: Description of the task to be done.

A user can add details about this task.
Max length: 1000 characters.
Mandatory field.

# Due Date: Expected due date to finish the task.

A user can set this while creating a new entry. A user can also change this updating an existing entry.
Optional field.

#Tag: One or more tags which user can add to the entry.

A user can set this while creating a new entry. A user can also change this updating an existing entry.
Multiple tags can be added to the same entry.
Optional field.
Multiple tags with the same value should be saved only once.

# Status: Shows status of a task.

Should be one of these values:
OPEN (Default value)
WORKING
DONE
OVERDUE
Mandatory field.
The table should support pagination.

User should be able to perform the following operations:

ADD a new to-do entry.
SEARCH for entries by title or description.
Also search column by column

Getting Started
To get started, follow these steps:

Clone the repository to your local machine.
Install the dependencies by running npm install in the project directory.
Start the application by running npm start.
Open your browser and navigate to http://localhost:3000.
Usage

Once the application is running, you can perform the following actions:

To add a new to-do entry, click the "Add New Entry" button at the top of the page. Fill in the required fields (Title, Description, and Status) and click "Add" to create a new entry.

To update an existing entry, click the "Edit" button on the row for the entry you wish to update. Update the fields you wish to change and click "Save" to save the changes.

To delete an entry, click the "Delete" button on the row for the entry you wish to delete.

To filter entries by status, use the "Status" dropdown at the top of the page.

To search entries by title or tag, use the search bar at the top of the page.

To navigate through pages of entries, use the pagination controls at the bottom of the page.

# Technologies Used
This application was built using the following technologies:

React
Ant Design
moment.js
Contributing

If you would like to contribute to this project, please open an issue or submit a pull request. All contributions are welcome!



=======
# Todo-List
"Todo List - A simple task management app that allows users to create and manage tasks. Includes features such as timestamp creation, title, description, due date, tags, and status updates. Built with Ant Design, supports pagination and search. Ideal for personal or team use."

https://shivam-to-do-app.netlify.app/
