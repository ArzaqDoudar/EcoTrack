# Eco Track API
#### Arzaq Ziad Doudar.
#### Farah Ammar Touqan.
#### Hala Isam Okal.

#### <strong>MVC architecture.</strong>
We chose the Model-View-Controller (MVC) architecture for our project because it makes testing and maintaining the code much easier. 
With MVC, We can test each part of the project separately, which simplifies both unit testing and automated testing. 
The organized structure of MVC also makes it easier to identify and fix issues, improving the overall maintainability of the code. 
Plus, working on different parts of the project simultaneously is smooth, fostering a collaborative and efficient coding experience.

### USER API:
* <strong>GET: /users/</strong> for get all users in system [no parameter].
* <strong>POST: /users/ </strong> to insert new user (this api do not need authorization) [name , username , password , location , role] (password encrypted to hash).
* <strong>PUT: /users/</strong> to update the name or the location.
* <strong> POST: /users/login </strong> to login => this api will return a valid token that user can use it only one day [username , password]
* <strong>GET: /users/user/{username} </strong> this api is to get the spasific user by user name [username].
* <strong>PUT: /users/changepassword </strong> - to change user password [password, newpassword].
* <strong>GET: /users/concern </strong> return the user with his concerns [no parameter].
* <strong>POST: /users/concern </strong> add the concern to the user who loged in, if this concern not exist in the concerns tabel this api create new one then added it to user concern.

### Data Collection API:
* <strong>GET: /data-collection </strong> to get all data collected in the  system, this API allowed for the users who are not normal users (like researchers, scientists, and organizations) [no parameter].
* <strong>POST: /data-collection </strong> add new data [data-type, value, location].
* <strong>DELETE: /data-collection/{id} </strong> delete the data using id [id].
* <strong>GET: /data-collection/user/{username} </strong> get all data that the user entered [no parameter].
* <strong>GET: /data-collection/location/{location}</strong> to get data from a specific location [location as "latitude,longitude"].
* <strong>GET: /data-collection/type/{type}</strong> to get data has the same type [type].

### Concerns API:
* <strong>GET: /concerns </strong> get all concerns in the system.
* <strong>POST: /concerns </strong> add new concern [concern-name].
* <strong>PUT: /concerns </strong> edit concern name [old-name, new-name].
* <strong>GET: /concerns/users/{concern-name} </strong> get all users that have same concern [concern-name].
* <strong>DELETE: /concerns/{name} </strong> delete concern with this name [name].


### Educational Resources API:
* <strong>GET: /educational-resources/</strong> - to get all educational resources in the system, so the user can see them [no parameter].
* <strong>POST: /educational-resources/type </strong> - to get all educational resources based on the type of the resource [report_type].


### Forcast API:
* <strong>GET: /forcast/{location}/{time}</strong> - It is a ready-to-use API. We enter the location and time step and it gives me a lot of information about the weather, such as temperature, humidity, rain rate,and cloudiness. [location as "latitude,longitude" , timesteps]


### Report API:
* <strong>GET: /report/</strong> - to get all reports in the system [no parameter].
* <strong>POST: /users/ </strong> - to insert new report [ report_type, description, location, time_stamp].
* <strong>GET: /report/user/{username}</strong> - to get all reports for a specific person based on the username. [username]
* <strong>GET: /report/type/{report_type}</strong> - to get all reports based on the type of the report like if it's pollution or anything else. [report_type]
