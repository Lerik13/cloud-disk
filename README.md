# Cloud Storage/Disk
Client-Server app like google or yandex drive for storing user's files in some cloud-server with posibility to create tree-structure of files with folders for organizing files
```
test user: john@gmail.com, password: john123
```
using stack of technologies:  MERN = MongoDB + ExpressJS + React + NodeJS;

State-management: Redux

MongoDB models:

![DB Schema](https://github.com/Lerik13/house-marketplace/blob/master/schema_firebase_db.jpg?raw=true "DB Schema")

### Client Functionality
1. Register User (default diskSpace for user=10Gb)
2. Login/Logout (Saving JWT-token in user's Local Storage)
```
test user: john@gmail.com, password: john123
```
3. Create new folder
4. Folder Navigation
5. Upload files (check if (usedSpace + size of new file) < diskSpace for user)
6. Drag and drop for uploading files
7. Display progress bar of downloading files
8. Delete file/folder (physical file removal + delete note from DB in File-model)
9. Sort files by name, type or date
10. Search file by name (not an exact match)
11. Profile page: change avatar picture
                                                                    
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
