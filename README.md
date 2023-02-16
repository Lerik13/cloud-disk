# Cloud Storage/Disk

Client-Server app, like google or yandex drive for storing user's files in some cloud-server.
There is the possibility to create tree-structure of files with folders for organizing files (navigation with button 'back').
User can upload multiple files also by useful feature 'drag-and-drop' with opening progressbar window, where user can see the uploading progresses in % for each file.
```
test user: user@gmail.com, password: user123
```
using stack of technologies:  MERN = MongoDB + ExpressJS + React + NodeJS;

State-management: Redux

!Todo: upload static files (avatars) to S9

MongoDB models:<br>
![DB Schema](https://github.com/Lerik13/cloud-disk/blob/main/DB_schema.jpg?raw=true "DB Schema")

### Client Functionality
1. Register User (default diskSpace for user=10Gb)
2. Login/Logout (Saving JWT-token in user's Local Storage)
```
test user: user@gmail.com, password: user123
```
![Login-Register-User](https://github.com/Lerik13/cloud-disk/blob/main/screenshots/0.jpg?raw=true "Login/Register User")

3. Create new folder

![Create-Folder](https://github.com/Lerik13/cloud-disk/blob/main/screenshots/1.jpg?raw=true "Create Folder")

4. Folder Navigation

5. Upload files (check if (usedSpace + size of new file) < diskSpace for user)

6. Drag and drop for uploading files

![Upload-files](https://github.com/Lerik13/cloud-disk/blob/main/screenshots/2.jpg?raw=true "Upload files")

7. Display progress bar of downloading files

![Progressbar](https://github.com/Lerik13/cloud-disk/blob/main/screenshots/3.jpg?raw=true "Progressbar for uploading files")

8. Delete file/folder (physical file removal + delete node from DB in File-model)

9. Search file by name (not an exact match)

![Search](https://github.com/Lerik13/cloud-disk/blob/main/screenshots/7.jpg?raw=true "Search")

10. Sort files by name, type or date (by default = by type)

![Sort](https://github.com/Lerik13/cloud-disk/blob/main/screenshots/4.jpg?raw=true "Sort by type")

11. Table view or list of files and folders

![View](https://github.com/Lerik13/cloud-disk/blob/main/screenshots/6.jpg?raw=true "List or table view")

12. Profile page: change name and avatar picture

![Profile](https://github.com/Lerik13/cloud-disk/blob/main/screenshots/5.jpg?raw=true "Profile")

### Developing details
#### Backend libs:
- express -- Express-framework for creating web-apps using NodeJS
- mongoose -- library for managing MongoDB
- bcryptjs -- create hash passwords
- express-validator -- validate data(user, password)
- jsonwebtoken -- generate web-token for autontification in client-side
- uuid -- get uniq id
- express-fileupload -- upload files to Server
- nodemon (dependency) -- constantly watch server.js, so we don't need to restart server

#### Frontend libs:
  - react, react-dom
  - react-router-dom -- page navigation
  - redux -- State Manager
  - redux-thunk -- for async queries
  - react- transition-group -- animation
  - axios -- for async http-queries

### Deploying
#### set Environment Variables:
1. MongoDB database URI (DB_URL)
2. JWT secret (JWT_SECRET)
3. path in server for uploading user's files (FILE_PATH)
4. path in server for static files, like avatars (STATIC_PATH)
