# billing-portal

clone repo

run 'npm i' to install dependencies, 

run 'npm start' 

navigate in browser to 'http://localhost:3000/home'

login with username: 'testUser123' and password: 'Password1'

# functional overview:

i implemented mock login/logout functionality so it should immediately redirect you to login when it sees you haven't logged in.

there is a 3 second login delay (to simulate an api call) then it will take you to the home page. 

if you refresh the page it will keep you logged in for the session. 

if you click logout a modal will come up. 

click 'logout' and there will be a 2 second delay (again to simulate a request delay) before it logs you out and sends you back to login. 

after logging out if you try to go to home it will redirect back to login since you are no longer logged in. 

if you leave the username/password blank or input the incorrect credentials it will spit out an error message in a popup.

note: 'ForgotPassword' Page is there but currently only an empty page.
